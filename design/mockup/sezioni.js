/* MOCKUP — interazioni delle sole sezioni Beneficenza ed Eventi.
   File isolato: caricato solo da index, beneficenza, beneficenza-articolo, eventi, evento.
   Non tocca navbar, intro, galleria fotografica né le altre sezioni. */
window.Sezioni = (() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = n => String(n).padStart(2, '0');

  /* ---------- CAROSELLO BENEFICENZA ----------
     Scroll nativo con snap (swipe su touch) + frecce, puntini cliccabili, contatore,
     tastiera (← → Home Fine), trascinamento col mouse, scheda attiva in evidenza. */
  function carousel(section) {
    const track = section.querySelector('.carousel');
    const slides = [...track.querySelectorAll('.ccard')];
    const n = slides.length;
    const [prev, next] = section.querySelectorAll('.carousel-ctrl .icon-btn');
    const dotsList = section.querySelector('.dots');
    section.classList.toggle('charity--single', n < 2);
    if (n < 2) { slides[0]?.classList.add('is-active'); return; }

    dotsList.removeAttribute('aria-hidden');
    dotsList.setAttribute('aria-label', 'Scegli la scheda');
    dotsList.innerHTML = slides.map((_, i) => `<li><button type="button" class="dots__btn" aria-label="Vai alla scheda ${i + 1} di ${n}"></button></li>`).join('');
    const dots = [...dotsList.querySelectorAll('button')];
    dotsList.insertAdjacentHTML('afterend', `<p class="carousel-count" aria-live="polite"><span class="carousel-count__now">01</span> / ${pad(n)}</p>`);
    const count = section.querySelector('.carousel-count__now');
    track.insertAdjacentHTML('afterend', '<p class="carousel-hint" aria-hidden="true">Scorri per vedere le altre schede <span>→</span></p>');

    const offset = i => slides[i].offsetLeft - slides[0].offsetLeft;
    const current = () => {
      let best = 0, d = Infinity;
      slides.forEach((_, i) => { const dd = Math.abs(offset(i) - track.scrollLeft); if (dd < d) { d = dd; best = i; } });
      return best;
    };
    const go = i => {
      i = Math.max(0, Math.min(n - 1, i));
      track.scrollTo({ left: offset(i), behavior: reduce ? 'auto' : 'smooth' });
    };
    let last = -1;
    const sync = () => {
      const i = current();
      if (i === last) return; last = i;
      slides.forEach((s, j) => s.classList.toggle('is-active', j === i));
      dots.forEach((d, j) => d.setAttribute('aria-current', String(j === i)));
      count.textContent = pad(i + 1);
      prev.disabled = i === 0; next.disabled = i === n - 1;
    };
    prev.addEventListener('click', () => go(current() - 1));
    next.addEventListener('click', () => go(current() + 1));
    dots.forEach((d, j) => d.addEventListener('click', () => go(j)));
    track.addEventListener('keydown', e => {
      const map = { ArrowLeft: current() - 1, ArrowRight: current() + 1, Home: 0, End: n - 1 };
      if (e.key in map && e.target === track) { e.preventDefault(); go(map[e.key]); }
    });
    let raf = 0;
    track.addEventListener('scroll', () => { cancelAnimationFrame(raf); raf = requestAnimationFrame(sync); }, { passive: true });

    // Clic su una scheda laterale (parzialmente visibile): la porta al centro
    slides.forEach((s, j) => s.addEventListener('click', e => {
      if (!s.classList.contains('is-active')) { e.preventDefault(); go(j); }
    }, true));
    // Tab su un link di una scheda laterale: la scheda scorre al centro
    slides.forEach((s, j) => s.addEventListener('focusin', () => { if (!s.classList.contains('is-active')) go(j); }));

    // Trascinamento col mouse (su touch c'è già lo swipe nativo)
    let drag = null;
    track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft, moved: false, from: current() };
    });
    addEventListener('pointermove', e => {
      if (!drag) return;
      const dx = e.clientX - drag.x;
      if (!drag.moved && Math.abs(dx) > 6) { drag.moved = true; track.classList.add('is-dragging'); }
      if (drag.moved) track.scrollLeft = drag.left - dx;
    });
    addEventListener('pointerup', e => {
      if (!drag) return;
      const d = drag; drag = null;
      if (!d.moved) return;
      track.classList.remove('is-dragging');
      const dx = e.clientX - d.x;
      go(Math.abs(dx) > 60 ? d.from + (dx < 0 ? 1 : -1) : d.from);
      // il clic che chiude un trascinamento non deve aprire link
      track.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); }, { capture: true, once: true });
    });

    sync();
    addEventListener('resize', () => { last = -1; go(current()); });
  }

  /* ---------- INGRANDIMENTO LOCANDINE / IMMAGINI ----------
     Un dialog dedicato, separato dal visualizzatore della galleria fotografica. */
  function posterZoom(root = document) {
    let dlg = document.querySelector('.zoom-dialog');
    if (!dlg) {
      document.body.insertAdjacentHTML('beforeend', `
        <dialog class="zoom-dialog" aria-label="Immagine ingrandita">
          <form method="dialog" class="zoom-dialog__bar"><button class="icon-btn zoom-dialog__close" aria-label="Chiudi"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button></form>
          <p class="zoom-dialog__cap"></p>
        </dialog>`);
      dlg = document.querySelector('.zoom-dialog');
      dlg.addEventListener('click', e => { if (e.target === dlg) dlg.close(); }); // clic sullo sfondo
    }
    root.querySelectorAll('[data-zoom]').forEach(b => b.addEventListener('click', () => {
      let img = dlg.querySelector('img');
      if (!img) { img = document.createElement('img'); img.className = 'zoom-dialog__img'; dlg.querySelector('.zoom-dialog__cap').before(img); } // creata al primo uso
      img.src = b.dataset.zoom; img.alt = b.dataset.zoomAlt || '';
      dlg.querySelector('.zoom-dialog__cap').textContent = b.dataset.zoomAlt || '';
      dlg.showModal();
    }));
  }

  return { carousel, posterZoom };
})();
