/* MOCKUP Fase A — interazioni dimostrative (vanilla JS, nessuna dipendenza).
   In Fase B la stessa logica diventerà componenti React. */
(() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];

  /* ---------- INTRO → HERO ---------- */
  const hero = $('.hero');
  if (hero) {
    const scene = $('.hero__scene', hero);
    const art = $('.hero__scene .hero__art', hero);
    const introArt = $('.hero__art--intro', hero);
    const cuts = $$('.cut', hero);
    const heroImg = $('.hero__img', hero);
    const SUN = { x: 0.254, y: 0.587 }; // posizione del sole nell'illustrazione (frazioni del quadrato)
    let anims = [];

    const placeSun = () => {
      const a = art.getBoundingClientRect(), h = hero.getBoundingClientRect();
      hero.style.setProperty('--sun-x', `${a.left - h.left + a.width * SUN.x}px`);
      hero.style.setProperty('--sun-y', `${a.top - h.top + a.height * SUN.y}px`);
    };
    const finish = () => {
      anims.forEach(an => { try { an.finish(); } catch (e) {} });
      hero.classList.add('is-done');
      document.body.classList.remove('intro-running');
      scene.style.clipPath = '';
      try { sessionStorage.setItem('intro-seen', '1'); } catch (e) {}
    };

    let seen = false;
    try { seen = sessionStorage.getItem('intro-seen') === '1'; } catch (e) {}
    const forced = new URLSearchParams(location.search).has('intro');

    if (reduce || (seen && !forced) || !('animate' in Element.prototype)) {
      finish();
    } else {
      document.body.classList.add('intro-running');
      scene.style.clipPath = 'circle(0px at var(--sun-x) var(--sun-y))';
      placeSun();
      $('.hero__skip', hero).addEventListener('click', finish);

      const run = () => {
        const diag = Math.hypot(innerWidth, innerHeight) * 1.1;
        // 1) le due figure entrano sul fondo crema
        anims.push(introArt.animate(
          [{ opacity: 0, scale: '1.06', translate: '0 4%' }, { opacity: 1, scale: '1', translate: '0 0' }],
          { duration: 520, easing: 'cubic-bezier(.22,1,.36,1)', fill: 'both' }));
        // 2) il tramonto si apre dal sole, mentre figure e scritta scivolano nella loro posizione
        anims.push(scene.animate(
          [{ clipPath: 'circle(0px at var(--sun-x) var(--sun-y))' }, { clipPath: `circle(${diag}px at var(--sun-x) var(--sun-y))` }],
          { delay: 620, duration: 1150, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' }));
        cuts.forEach(c => anims.push(c.animate(
          [{ transform: 'none' }, { transform: getComputedStyle(c).getPropertyValue('--to') }],
          { delay: 620, duration: 1150, easing: 'cubic-bezier(.65,0,.35,1)', fill: 'both' })));
        // 3) sovrapposizione esatta: lo strato intro sparisce senza stacco
        const out = introArt.animate([{ opacity: 1 }, { opacity: 0 }], { delay: 1770, duration: 260, fill: 'forwards' });
        anims.push(out);
        out.finished.then(finish).catch(() => {});
      };
      // l'intro parte solo quando l'illustrazione è pronta; altrimenti si salta
      const timeout = setTimeout(finish, 2500);
      const go = () => { clearTimeout(timeout); placeSun(); run(); };
      if (heroImg.complete && heroImg.naturalWidth) go();
      else { heroImg.addEventListener('load', go, { once: true }); heroImg.addEventListener('error', () => { clearTimeout(timeout); finish(); }, { once: true }); }
    }
    addEventListener('resize', placeSun);
    addEventListener('keydown', e => { if (e.key === 'Escape' && !hero.classList.contains('is-done')) finish(); });
  }

  /* ---------- NAVBAR: trasparente sulla hero, solida dopo ---------- */
  const nav = $('.nav');
  const setNav = () => {
    const limit = hero ? hero.offsetHeight - nav.offsetHeight - 1 : -1;
    nav.dataset.state = scrollY > limit ? 'solid' : 'over-hero';
  };
  setNav(); addEventListener('scroll', setNav, { passive: true });

  /* Menu mobile */
  const toggle = $('.nav__toggle'), menu = $('#nav-menu');
  const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); document.body.style.overflow = ''; };
  toggle.addEventListener('click', () => {
    const open = toggle.getAttribute('aria-expanded') !== 'true';
    toggle.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open);
    document.body.style.overflow = open ? 'hidden' : '';
    if (open) $('a', menu).focus();
  });
  $$('a', menu).forEach(a => a.addEventListener('click', closeMenu));
  addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('is-open')) { closeMenu(); toggle.focus(); } });

  /* Sezione attiva */
  const links = $$('.nav__menu a[data-section]');
  const ids = links.map(a => a.dataset.section);
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.dataset.section === en.target.id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  ids.forEach(id => { const el = document.getElementById(id); if (el) io.observe(el); });

  /* ---------- CAROSELLO BENEFICENZA ---------- */
  const track = $('#charity-track');
  if (track) {
    const slides = $$('.ccard', track), dots = $$('.dots li'), btns = $$('.carousel-ctrl .icon-btn');
    const idx = () => {
      const x = track.scrollLeft; let best = 0, d = Infinity;
      slides.forEach((s, i) => { const dd = Math.abs(s.offsetLeft - track.offsetLeft - x - parseFloat(getComputedStyle(track).paddingLeft)); if (dd < d) { d = dd; best = i; } });
      return best;
    };
    const sync = () => {
      const i = idx();
      dots.forEach((d, j) => d.setAttribute('aria-current', String(i === j)));
      btns[0].disabled = track.scrollLeft < 4;
      btns[1].disabled = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    };
    btns.forEach(b => b.addEventListener('click', () => {
      const i = Math.max(0, Math.min(slides.length - 1, idx() + Number(b.dataset.dir)));
      slides[i].scrollIntoView({ behavior: reduce ? 'auto' : 'smooth', block: 'nearest', inline: 'start' });
    }));
    track.addEventListener('scroll', () => requestAnimationFrame(sync), { passive: true });
    sync();
  }

  /* ---------- MARQUEE SPONSOR: pausa esplicita ---------- */
  $$('.marquee').forEach(m => {
    const b = $('.marquee__pause', m);
    b.addEventListener('click', () => {
      const p = m.dataset.paused !== 'true';
      m.dataset.paused = String(p); b.setAttribute('aria-pressed', String(p));
      b.textContent = p ? 'Riprendi' : 'Metti in pausa';
    });
  });

  /* ---------- Comparsa sezioni ---------- */
  if (!reduce) {
    const els = $$('.about__head, .about__text, .about__photo, .ecard, .photos__text, .stack, .thanks__title');
    els.forEach(el => el.classList.add('reveal'));
    const ro = new IntersectionObserver(es => es.forEach(e => { if (e.isIntersecting) { e.target.classList.add('is-in'); ro.unobserve(e.target); } }), { rootMargin: '0px 0px -10% 0px' });
    els.forEach(el => ro.observe(el));
  }
})();
