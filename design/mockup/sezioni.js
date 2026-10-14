/* MOCKUP — interazioni delle sole sezioni Beneficenza ed Eventi.
   File isolato: caricato solo da index, beneficenza, beneficenza-articolo, eventi, evento.
   Non tocca navbar, intro, galleria fotografica né le altre sezioni. */
window.Sezioni = (() => {
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const pad = n => String(n).padStart(2, '0');

  /* ---------- CAROSELLO BENEFICENZA ----------
     Funziona con qualsiasi numero di card (generate da data.js).
     Scroll orizzontale nativo con snap: animazione fluida, swipe su touch, nessuno spostamento della pagina.
     Frecce laterali con navigazione circolare (dopo l'ultima si torna alla prima), indicatori cliccabili,
     contatore, tastiera (← → Home Fine), trascinamento col mouse, clic su una card laterale.
     Con una sola card (modalità produzione) frecce e indicatori vengono nascosti. */
  function carousel(section) {
    const track = section.querySelector('.carousel');
    const slides = [...track.querySelectorAll('.ccard')];
    const n = slides.length;
    const prev = section.querySelector('.carrow--prev'), next = section.querySelector('.carrow--next');
    const dotsList = section.querySelector('.dots'), count = section.querySelector('.carousel-count');
    section.classList.toggle('charity--single', n < 2);
    if (n < 2) { slides[0]?.classList.add('is-active'); return; }

    dotsList.innerHTML = slides.map((s, i) => `<li><button type="button" class="dots__btn" aria-controls="charity-track" aria-label="Vai alla scheda ${i + 1} di ${n}${s.classList.contains('ccard--demo') ? ' (demo)' : ''}"></button></li>`).join('');
    const dots = [...dotsList.querySelectorAll('button')];
    section.querySelector('.cshell').insertAdjacentHTML('beforeend', '<p class="carousel-hint" aria-hidden="true">Scorri o usa le frecce per vedere le altre schede</p>');

    const offset = i => slides[i].offsetLeft - slides[0].offsetLeft;
    const current = () => {
      let best = 0, d = Infinity;
      slides.forEach((_, i) => { const dd = Math.abs(offset(i) - track.scrollLeft); if (dd < d) { d = dd; best = i; } });
      return best;
    };
    let target = null; // card di destinazione mentre l'animazione è in corso (clic ripetuti veloci)
    let cur = 0;       // card attualmente mostrata
    const go = i => {
      target = ((i % n) + n) % n; // circolare
      track.scrollTo({ left: offset(target), behavior: reduce ? 'auto' : 'smooth' });
      paint(target);
    };
    const paint = i => {
      cur = i;
      slides.forEach((s, j) => s.classList.toggle('is-active', j === i));
      dots.forEach((d, j) => d.setAttribute('aria-current', String(j === i)));
      count.innerHTML = `<span class="carousel-count__now">${pad(i + 1)}</span> / ${pad(n)}`;
    };
    const base = () => target ?? cur;
    prev.addEventListener('click', () => go(base() - 1));
    next.addEventListener('click', () => go(base() + 1));
    dots.forEach((d, j) => d.addEventListener('click', () => go(j)));
    track.addEventListener('keydown', e => {
      const map = { ArrowLeft: base() - 1, ArrowRight: base() + 1, Home: 0, End: n - 1 };
      if (e.key in map && e.target === track) { e.preventDefault(); go(map[e.key]); }
    });
    let raf = 0, idle = 0;
    track.addEventListener('scroll', () => {
      cancelAnimationFrame(raf); clearTimeout(idle);
      raf = requestAnimationFrame(() => { if (target === null) paint(current()); });
      idle = setTimeout(() => { target = null; paint(current()); }, 140); // fine dello scorrimento (swipe, snap, animazione)
    }, { passive: true });

    // Clic su una card laterale parzialmente visibile: la porta al centro (non apre link)
    slides.forEach((s, j) => s.addEventListener('click', e => {
      if (!s.classList.contains('is-active')) { e.preventDefault(); e.stopPropagation(); go(j); }
    }, true));
    // Tab su un link di una card laterale: la card scorre al centro
    slides.forEach((s, j) => s.addEventListener('focusin', () => { if (!s.classList.contains('is-active')) go(j); }));

    // Trascinamento col mouse (su touch c'è lo swipe nativo)
    let drag = null;
    track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse' || e.button !== 0) return;
      drag = { x: e.clientX, left: track.scrollLeft, moved: false, from: base() };
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
      go(Math.abs(dx) > 60 ? Math.max(0, Math.min(n - 1, d.from + (dx < 0 ? 1 : -1))) : d.from);
      track.addEventListener('click', ev => { ev.preventDefault(); ev.stopPropagation(); }, { capture: true, once: true });
    });

    paint(0);
    // ridimensionamento o rotazione: resta sulla stessa card, senza animazione
    addEventListener('resize', () => { const i = base(); target = i; track.scrollTo({ left: offset(i), behavior: 'auto' }); });
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
