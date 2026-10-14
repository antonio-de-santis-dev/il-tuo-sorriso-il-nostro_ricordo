/* MOCKUP — interazioni della Home (vanilla JS, nessuna dipendenza).
   Navbar e footer arrivano da site.js; i contenuti da data.js.
   In Fase B la stessa logica diventerà componenti React. */
(() => {
  const { D, $, $$, reduce, initiativeCard, eventCard, publicInitiatives, publicEvents } = window.Site;

  /* ---------- CONTENUTI DAL CATALOGO ---------- */
  // ?demo=carosello aggiunge schede “DEMO NON PUBBLICABILE” per provare il carosello con più card
  const demo = new URLSearchParams(location.search).get('demo') === 'carosello';
  const track = $('#charity-track');
  const inits = [...publicInitiatives(), ...(demo ? D.demoInitiatives : [])];
  track.innerHTML = inits.map((i, n) => initiativeCard(i, n + 1, inits.length)).join('');
  if (demo) $('.charity__head').insertAdjacentHTML('afterend', '<p class="wrap note-prov note-prov--dark">Variante DEMO NON PUBBLICABILE: le schede dimostrative servono solo a studiare il carosello con più card.</p>');

  $('#home-events').innerHTML = publicEvents().slice(0, 3).map(eventCard).join('');

  /* ---------- INTRO → HERO ---------- */
  const hero = $('.hero');
  const scene = $('.hero__scene', hero);
  const art = $('.hero__scene .hero__art', hero);
  const introArt = $('.hero__art--intro', hero);
  const cuts = $$('.cut', hero);
  const heroImg = $('.hero__img', hero);
  const skip = $('.hero__skip', hero);
  const SUN = { x: 0.254, y: 0.587 }; // posizione del sole nell'illustrazione (frazioni del quadrato)
  let anims = [];

  const placeSun = () => {
    const a = art.getBoundingClientRect(), h = hero.getBoundingClientRect();
    hero.style.setProperty('--sun-x', `${a.left - h.left + a.width * SUN.x}px`);
    hero.style.setProperty('--sun-y', `${a.top - h.top + a.height * SUN.y}px`);
  };

  /* Blocco della pagina durante l'intro: niente scroll (rotella, touch, tastiera,
     scrollbar), niente link o focus fuori dal pulsante “Salta introduzione”. */
  const NAV_KEYS = new Set([' ', 'PageDown', 'PageUp', 'ArrowDown', 'ArrowUp', 'ArrowLeft', 'ArrowRight', 'Home', 'End']);
  const stop = e => e.preventDefault();
  const pin = () => { if (scrollX || scrollY) scrollTo({ left: 0, top: 0, behavior: 'instant' }); }; // ancore o scroll via script: si torna in cima
  const onKey = e => {
    if (e.key === 'Escape') { finish(); return; }
    if (e.target === skip && (e.key === ' ' || e.key === 'Enter')) return; // attivazione del pulsante
    if (NAV_KEYS.has(e.key)) e.preventDefault();
  };
  let inerted = [], locked = false, guard;
  const lock = () => {
    locked = true;
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual';
    scrollTo(0, 0);
    document.documentElement.classList.add('intro-lock');
    inerted = [$('.skip-link'), $('.nav'), $('.footer'), ...$$('#main > :not(.hero)'), $('.hero__place'), $('.hero__cue')].filter(Boolean);
    inerted.forEach(el => el.inert = true);
    addEventListener('wheel', stop, { passive: false });
    addEventListener('touchmove', stop, { passive: false });
    addEventListener('keydown', onKey, true);
    addEventListener('scroll', pin);
    guard = setTimeout(finish, 6000); // rete di sicurezza: mai un blocco permanente
  };
  const unlock = () => {
    if (!locked) return;
    locked = false; clearTimeout(guard);
    document.documentElement.classList.remove('intro-lock');
    inerted.forEach(el => el.inert = false);
    removeEventListener('wheel', stop, { passive: false });
    removeEventListener('touchmove', stop, { passive: false });
    removeEventListener('keydown', onKey, true);
    removeEventListener('scroll', pin);
    if ('scrollRestoration' in history) history.scrollRestoration = 'auto';
  };

  let done = false;
  function finish() {
    if (done) return; done = true;
    anims.forEach(an => { try { an.finish(); } catch (e) {} });
    hero.classList.add('is-done');
    document.body.classList.remove('intro-running');
    scene.style.clipPath = '';
    const hadFocus = document.activeElement === skip;
    unlock();
    if (hadFocus) $('.hero__cue').focus(); // il focus non si perde quando il pulsante sparisce
    try { sessionStorage.setItem('intro-seen', '1'); } catch (e) {}
  }

  let seen = false;
  try { seen = sessionStorage.getItem('intro-seen') === '1'; } catch (e) {}
  const forced = new URLSearchParams(location.search).has('intro');
  const toAnchor = location.hash.length > 1; // arrivo da una pagina interna verso una sezione

  if (reduce || (seen && !forced) || (toAnchor && !forced) || !('animate' in Element.prototype)) {
    finish();
  } else {
    document.body.classList.add('intro-running');
    scene.style.clipPath = 'circle(0px at var(--sun-x) var(--sun-y))';
    lock();
    placeSun();
    skip.addEventListener('click', finish);

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
    const go = () => { clearTimeout(timeout); if (!done) { placeSun(); run(); } };
    if (heroImg.complete && heroImg.naturalWidth) go();
    else { heroImg.addEventListener('load', go, { once: true }); heroImg.addEventListener('error', () => { clearTimeout(timeout); finish(); }, { once: true }); }
  }
  addEventListener('resize', placeSun);
  // con l'ancora nell'URL, riallinea dopo il caricamento dei font (i titoli cambiano altezza)
  if (toAnchor) document.fonts?.ready.then(() => { const t = document.getElementById(location.hash.slice(1)); if (t && scrollY < 10) t.scrollIntoView(); });

  /* ---------- SEZIONE ATTIVA NELLA NAVBAR ---------- */
  const links = $$('.nav__menu a[data-section]');
  const io = new IntersectionObserver(entries => {
    entries.forEach(en => {
      if (!en.isIntersecting) return;
      links.forEach(a => a.dataset.section === en.target.id ? a.setAttribute('aria-current', 'true') : a.removeAttribute('aria-current'));
    });
  }, { rootMargin: '-45% 0px -50% 0px' });
  links.forEach(a => { const el = document.getElementById(a.dataset.section); if (el) io.observe(el); });

  /* ---------- CAROSELLO BENEFICENZA (logica in sezioni.js) ---------- */
  window.Sezioni.carousel($('.charity'));
  window.Sezioni.posterZoom($('#eventi'));

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
