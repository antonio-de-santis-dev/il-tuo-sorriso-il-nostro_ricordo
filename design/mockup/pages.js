/* MOCKUP Fase A.2 — pagine interne generate dal catalogo (data.js).
   ?slug=… nei file statici equivale ai parametri delle rotte future:
   beneficenza-articolo.html?slug=x → /beneficenza/x · evento.html?slug=x → /eventi/x · album.html?slug=x → /foto/x */
(() => {
  const S = window.Site;
  const { D, $, $$, esc, url, find, param, publishedAlbum, sourcesBox } = S;
  const page = document.body.dataset.page;
  const today = new Date().toISOString().slice(0, 10);
  const crumbs = items => `<nav class="crumbs" aria-label="Percorso"><ol>${items.map(([href, label]) =>
    href ? `<li><a href="${href}">${esc(label)}</a></li>` : `<li><span aria-current="page">${esc(label)}</span></li>`).join('')}</ol></nav>`;
  const setTitle = t => { document.title = `${t} · Il Tuo Sorriso, il Nostro Ricordo`; };
  const empty = (title, text) => `<div class="empty"><p class="empty__title">${esc(title)}</p><p>${text}</p></div>`;
  const editorial = notes => notes?.length ? `<div class="note-prov"><strong>Note redazionali (non pubblicabili):</strong><ul>${notes.map(n => `<li>${esc(n)}</li>`).join('')}</ul></div>` : '';

  /* ---------- /beneficenza ---------- */
  if (page === 'beneficenza') {
    const list = $('#list');
    const items = S.publicInitiatives(); // ordine cronologico, dalla più recente
    list.innerHTML = items.length
      ? items.map(i => `<li>${S.initiativeCard(i)}</li>`).join('')
      : `<li>${empty('Nessuna iniziativa pubblicata', 'Le iniziative compariranno qui dopo l’approvazione dei testi.')}</li>`;
    if (items.length === 1) list.insertAdjacentHTML('afterend', `<div class="note-prov" style="margin-top:var(--s-6)"><strong>Nota redazionale (non pubblicabile):</strong> a oggi è documentata una sola iniziativa di beneficenza dell’associazione. Non c’è base sufficiente per altre schede: verranno aggiunte solo con fonti o materiali forniti dall’associazione.</div>`);
  }

  /* ---------- /beneficenza/:slug ---------- */
  if (page === 'articolo') {
    const root = $('#page'), i = find('initiatives', param('slug'));
    if (!i || i.status !== 'published') { S.notFound(root, 'Iniziativa', 'beneficenza.html', 'Tutte le iniziative'); }
    else {
      setTitle(i.title);
      const ev = i.relatedEvent && find('events', i.relatedEvent);
      root.innerHTML = `
      <section class="page-head" aria-labelledby="page-title"><div class="wrap">
        ${crumbs([['index.html', 'Home'], ['beneficenza.html', 'Beneficenza'], [null, i.title]])}
        <p class="ccard__meta"><span>${esc(i.dateLabel)}</span><span>${esc(i.place)}</span></p>
        <h1 id="page-title" class="h2">${esc(i.title)}</h1>
        <span class="tag-prov">Testo da approvare con l’associazione</span>
      </div></section>
      <div class="page-body"><div class="wrap article">
        <article class="article__main">
          <figure class="article__media">${i.image ? `<img src="${esc(i.image)}" alt="">` : S.ph('ph--hospital', 'Foto autorizzata della consegna (senza pazienti riconoscibili)')}</figure>
          <p class="lead">${esc(i.summary)}</p>
          ${i.body.map(p => `<p>${esc(p)}</p>`).join('')}
          ${i.timeline?.length ? `<section class="steps" aria-labelledby="steps-title"><h2 id="steps-title" class="related__kicker">Le tappe</h2><ol>${i.timeline.map(t => `
            <li><span class="steps__when">${esc(t.when)}</span><span class="steps__what">${t.event && find('events', t.event)?.status === 'published' ? `<a href="${url.event(t.event)}">${esc(t.what)}</a>` : esc(t.what)}</span></li>`).join('')}</ol></section>` : ''}
          ${editorial(i.notes)}
          ${ev && ev.status === 'published' ? `<aside class="related" aria-labelledby="rel-title">
            <h2 id="rel-title" class="related__kicker">Evento di raccolta fondi collegato</h2>
            <a class="related__card" href="${url.event(ev.slug)}">
              <span class="related__thumb">${S.ph('ph--poster', 'Locandina')}</span>
              <span><span class="related__kicker">${esc(ev.day)} ${esc(ev.monthYear)}</span><span class="related__title">${esc(ev.title)}</span></span>
              <span class="related__go" aria-hidden="true">→</span>
            </a></aside>` : ''}
          <p><a class="back-link" href="beneficenza.html"><span aria-hidden="true">←</span> Tutte le iniziative</a></p>
        </article>
        <div class="article__aside">
          <section class="fact" aria-labelledby="fact-title"><h2 id="fact-title">In breve</h2><dl>
            <div><dt>Quando</dt><dd>${esc(i.dateLabel)}</dd></div>
            <div><dt>Dove</dt><dd>${esc(i.place)}</dd></div>
            <div><dt>Cosa è stato donato</dt><dd><ul>${i.items.map(x => `<li>${esc(x)}</li>`).join('')}</ul></dd></div>
            ${i.purpose ? `<div><dt>Per cosa</dt><dd>${esc(i.purpose)}</dd></div>` : ''}
          </dl></section>
          ${sourcesBox(i.sources)}
        </div>
      </div></div>`;
    }
  }

  /* ---------- /eventi ---------- */
  if (page === 'eventi') {
    const all = S.publicEvents(), drafts = param('bozze') === '1' ? D.events.filter(e => e.status === 'draft') : [];
    const next = all.filter(e => e.date >= today).reverse(), past = all.filter(e => e.date < today);
    const group = (title, list, emptyHtml) => `<section class="group" aria-labelledby="g-${title}">
      <h2 class="group-title" id="g-${title}">${title} <small>${list.length ? `${list.length} ${list.length === 1 ? 'evento' : 'eventi'}` : ''}</small></h2>
      ${list.length ? `<ol class="timeline">${list.map(S.eventCard).join('')}</ol>` : emptyHtml}</section>`;
    $('#groups').innerHTML =
      group('Prossimi', next, empty('Nessun evento annunciato', 'Quando ci sarà una nuova data la troverai qui. Nel frattempo segui l’associazione su <a href="https://www.instagram.com/ilvostrosorrisoilnostroricordo/" rel="noopener" target="_blank">Instagram</a>.')) +
      group('Passati', past, empty('Nessun evento passato', 'L’archivio è vuoto.')) +
      (drafts.length ? `<section class="group group--draft" aria-labelledby="g-bozze"><h2 class="group-title" id="g-bozze">Bozze redazionali <small>non pubblicabili, visibili solo in revisione</small></h2>
        <ol class="timeline">${drafts.map(S.eventCard).join('')}</ol></section>`
        : `<p class="review-link"><a href="eventi.html?bozze=1">Revisione: mostra le bozze non pubblicate</a></p>`);
  }

  /* ---------- /eventi/:slug ---------- */
  if (page === 'evento') {
    const root = $('#page'), e = find('events', param('slug'));
    if (!e) { S.notFound(root, 'Evento', 'eventi.html', 'Tutti gli eventi'); }
    else {
      setTitle(e.title);
      const album = publishedAlbum(e.album), ini = e.initiative && find('initiatives', e.initiative);
      const draft = e.status === 'draft';
      root.innerHTML = `
      ${draft ? `<div class="draft-banner" role="note"><div class="wrap"><strong>BOZZA NON PUBBLICATA.</strong> Questa scheda non compare nel sito pubblico finché l’associazione non conferma i dati. <a href="eventi.html?bozze=1">Torna alle bozze</a></div></div>` : ''}
      <section class="page-head" aria-labelledby="page-title"><div class="wrap">
        ${crumbs([['index.html', 'Home'], ['eventi.html', 'Eventi'], [null, e.title]])}
        <div class="event-hero">
          <div class="ecard__poster">${e.poster ? `<img src="${esc(e.poster)}" alt="Locandina: ${esc(e.title)}">` : S.ph('ph--poster', 'Locandina autorizzata')}</div>
          <div>
            <p class="ecard__date"><time datetime="${esc(e.date)}"><b>${esc(e.day)}</b> ${esc(e.monthYear)}</time></p>
            <h1 id="page-title" class="h2">${esc(e.title)}</h1>
            <p class="ecard__place">${e.place ? esc(e.place) : 'Luogo <em>da confermare</em>'}</p>
            <p class="note-prov">Da confermare: ${esc(e.provisional.join(', '))}.</p>
          </div>
        </div>
      </div></section>
      <div class="page-body"><div class="wrap">
        <div class="article">
          <div class="article__main">${e.body.map(p => `<p>${esc(p)}</p>`).join('')}</div>
          <div class="article__aside">${e.sources?.length ? sourcesBox(e.sources) : ''}</div>
        </div>
        ${album ? `<a class="gallery-cta" href="${url.album(album.slug)}">
            <span><span class="gallery-cta__title">Galleria foto evento</span><span>${album.preview ? '<span class="sim">anteprima · foto non ancora caricate</span>' : `${album.demoCount} foto · <span class="sim">segnaposto</span>`}</span></span>
            <span class="stack__go" aria-hidden="true">→</span></a>` : ''}
        ${ini ? `<aside class="related" aria-labelledby="rel-title">
            <h2 id="rel-title" class="related__kicker">${esc(e.initiativeRelation || 'Iniziativa collegata')}</h2>
            <a class="related__card" href="${url.initiative(ini.slug)}">
              <span class="related__thumb">${S.ph('ph--hospital', 'Foto')}</span>
              <span><span class="related__kicker">${esc(ini.dateLabel)}</span><span class="related__title">${esc(ini.title)}</span></span>
              <span class="related__go" aria-hidden="true">→</span>
            </a></aside>` : ''}
        <p><a class="back-link" href="${draft ? 'eventi.html?bozze=1' : 'eventi.html'}"><span aria-hidden="true">←</span> Tutti gli eventi</a></p>
      </div></div>`;
    }
  }

  /* ---------- /foto ---------- */
  if (page === 'foto') {
    // Catalogo pubblico: solo album legati a eventi reali. Gli album fittizi solo in revisione (?demo=1).
    const review = param('demo') === '1';
    const albums = D.albums.filter(a => a.published && !a.reviewOnly);
    const demos = D.albums.filter(a => a.published && a.reviewOnly);
    $('#albums').innerHTML = albums.length ? albums.map(S.albumCard).join('')
      : `<li>${empty('Nessun album pubblicato', 'Gli album arriveranno dopo il prossimo evento.')}</li>`;
    $('#albums').insertAdjacentHTML('afterend', review
      ? `<section class="group group--draft" aria-labelledby="g-demo"><h2 class="group-title" id="g-demo">Album fittizi <small>solo revisione: servono a provare le funzioni della galleria</small></h2>
          <ul class="album-grid">${demos.map(S.albumCard).join('')}</ul></section>`
      : `<p class="review-link"><a href="foto.html?demo=1">Revisione: mostra gli album fittizi di prova</a></p>`);
  }

  /* ---------- /foto/:slug ---------- */
  if (page === 'album') {
    const root = $('#page'), a = find('albums', param('slug'));
    if (!a || !a.published) {
      setTitle('Album non disponibile');
      root.innerHTML = `<section class="page-head" aria-labelledby="page-title"><div class="wrap">
        ${crumbs([['index.html', 'Home'], ['foto.html', 'Foto'], [null, 'Album non disponibile']])}
        <h1 id="page-title" class="h2">Album non disponibile</h1>
        <p class="lead">Questo album non esiste o non è ancora stato pubblicato.</p>
        <p><a class="btn btn--ink" href="foto.html">Vedi tutti gli album</a></p></div></section>`;
      return;
    }
    setTitle(a.name);
    const ev = a.event && find('events', a.event);
    const N = a.demoCount, STEP = 48, MAX = 50, MB = 4.2;
    root.innerHTML = `
    <section class="page-head" aria-labelledby="page-title"><div class="wrap">
      ${crumbs([['index.html', 'Home'], ['foto.html', 'Foto'], [null, a.name]])}
      <h1 id="page-title" class="h2">${esc(a.name)}</h1>
      <p class="album-meta">${a.dateLabel ? `<span>${esc(a.dateLabel)}</span>` : ''}<span>${N ? `${N} foto segnaposto` : 'Nessuna foto'}</span>
        <span class="tag-prov">${a.fictional ? 'Album fittizio di prova' : a.preview ? 'Anteprima · foto non ancora caricate' : 'Foto dimostrative'}</span>
        ${ev ? `<a class="link-arrow" href="${url.event(ev.slug)}">Vai all’evento <span aria-hidden="true">→</span></a>` : ''}</p>
      <p class="note-prov">${esc(a.note)}</p>
    </div></section>
    ${N ? `<div class="toolbar"><div class="wrap toolbar__in">
      <p class="toolbar__count" aria-live="polite"><span id="count">0</span> selezionate</p>
      <button class="tbtn" type="button" id="select-mode" aria-pressed="false">Seleziona</button>
      <button class="tbtn" type="button" id="select-all">Seleziona tutte le visibili</button>
    </div></div>
    <div class="wrap"><ul class="grid" id="grid" aria-label="Foto dell’album"></ul>
      <div class="more" id="more"></div></div>`
    : `<div class="page-body"><div class="wrap">${a.preview
        ? empty('Foto non ancora caricate', 'Le foto di questo evento arriveranno appena l’associazione le avrà raccolte e autorizzate. Per provare griglia, selezione e download simulati c’è un <a href="album.html?slug=demo-album-grande">album fittizio di prova</a> (solo revisione).')
        : empty('Nessuna foto ancora', 'L’album è stato creato ma le foto non sono ancora state caricate. Torna a trovarci dopo l’evento.')}
        <p><a class="back-link" href="foto.html"><span aria-hidden="true">←</span> Tutti gli album</a></p></div></div>`}`;
    if (!N) return;

    document.body.insertAdjacentHTML('beforeend', `
    <div class="actionbar" id="actionbar" role="region" aria-label="Download della selezione">
      <p class="actionbar__txt"><span id="ab-count">0 foto</span><small id="ab-size"></small></p>
      <button class="tbtn tbtn--light" type="button" id="clear">Annulla</button>
      <button class="tbtn tbtn--primary" type="button" id="zip">Scarica ZIP <span class="sim">simulato</span></button>
      <div class="progress" id="progress" hidden><span></span></div>
    </div>
    <div class="lb" id="lb" hidden role="dialog" aria-modal="true" aria-label="Visualizzatore foto">
      <div class="lb__top">
        <p class="lb__pos" id="lb-pos"></p>
        <button class="tbtn tbtn--primary" type="button" id="lb-dl">Scarica originale <span class="sim">simulato</span></button>
        <button class="icon-btn" type="button" id="lb-close" aria-label="Chiudi"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6 6 18" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round"/></svg></button>
      </div>
      <div class="lb__stage">
        <button class="icon-btn" type="button" data-step="-1" aria-label="Foto precedente"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <div class="lb__img" id="lb-img" role="img" aria-label=""></div>
        <button class="icon-btn" type="button" data-step="1" aria-label="Foto successiva"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
      <div class="lb__bottom">
        <button class="icon-btn" type="button" data-step="-1" aria-label="Foto precedente"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
        <label class="tbtn tbtn--light"><input type="checkbox" id="lb-sel"> Seleziona</label>
        <button class="icon-btn" type="button" data-step="1" aria-label="Foto successiva"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"/></svg></button>
      </div>
    </div>`);

    const grid = $('#grid'), more = $('#more'), selected = new Set();
    let shown = 0;
    const loadMore = () => {
      const to = Math.min(N, shown + STEP);
      let html = '';
      for (let i = shown; i < to; i++) html += `<li class="tile">
        <button class="tile__open" type="button" data-i="${i}" aria-label="Apri foto ${i + 1} di ${N}"><div class="tile__img" style="background:${S.tile(i)}"></div></button>
        <label class="tile__check"><input type="checkbox" data-i="${i}" aria-label="Seleziona foto ${i + 1}"${selected.has(i) ? ' checked' : ''}></label></li>`;
      grid.insertAdjacentHTML('beforeend', html);
      const first = grid.children[shown];
      shown = to;
      more.innerHTML = shown < N ? `<p>${shown} di ${N} foto</p><button class="tbtn" type="button" id="load-more">Carica altre ${Math.min(STEP, N - shown)}</button>` : (N > STEP ? `<p>Tutte le ${N} foto sono visibili</p>` : '');
      $('#load-more')?.addEventListener('click', () => { const f = loadMore(); f?.querySelector('.tile__open').focus(); });
      return first;
    };
    loadMore();

    const sync = () => {
      const n = selected.size, over = n > MAX;
      $('#count').textContent = n;
      $('#ab-count').textContent = `${n} ${n === 1 ? 'foto selezionata' : 'foto selezionate'}`;
      $('#ab-size').innerHTML = over ? `<span class="actionbar__warn">Massimo ${MAX} foto per ZIP: deseleziona ${n - MAX} foto o scarica in più volte.</span>` : `≈ ${Math.round(n * MB)} MB · massimo ${MAX} foto per ZIP · su iPhone lo ZIP va in “File”`;
      $('#zip').disabled = over;
      $('#actionbar').classList.toggle('is-visible', n > 0);
      const visible = $$('input', grid);
      $('#select-all').textContent = visible.length && visible.every(b => b.checked) ? 'Deseleziona tutte' : 'Seleziona tutte le visibili';
    };
    const setSel = (i, on) => { on ? selected.add(i) : selected.delete(i); const b = grid.querySelector(`input[data-i="${i}"]`); if (b) b.checked = on; };
    grid.addEventListener('change', e => { const b = e.target; if (b.matches('input')) { setSel(+b.dataset.i, b.checked); sync(); } });
    $('#select-mode').addEventListener('click', e => {
      const on = e.currentTarget.getAttribute('aria-pressed') !== 'true';
      e.currentTarget.setAttribute('aria-pressed', String(on)); document.body.classList.toggle('selecting', on);
    });
    $('#select-all').addEventListener('click', () => {
      const boxes = $$('input', grid), all = boxes.every(b => b.checked);
      boxes.forEach(b => setSel(+b.dataset.i, !all)); document.body.classList.add('selecting'); sync();
    });
    $('#clear').addEventListener('click', () => { [...selected].forEach(i => setSel(i, false)); sync(); });

    // Download ZIP SIMULATO: barra di avanzamento finta, nessun file generato
    $('#zip').addEventListener('click', () => {
      const bar = $('#progress'), fill = $('span', bar), btn = $('#zip');
      btn.disabled = true; bar.hidden = false; let p = 0;
      const t = setInterval(() => {
        p = Math.min(100, p + 12); fill.style.width = p + '%';
        if (p === 100) { clearInterval(t); setTimeout(() => { bar.hidden = true; fill.style.width = '0'; btn.disabled = false; }, 400);
          S.toast('SIMULAZIONE: in questo mockup non viene scaricato alcun file. In Fase B lo ZIP arriverà dal server.'); }
      }, 120);
    });

    // Lightbox
    const lb = $('#lb'), img = $('#lb-img'), sel = $('#lb-sel');
    let cur = 0, opener = null;
    const show = i => { cur = (i + N) % N; img.style.background = S.tile(cur); img.setAttribute('aria-label', `Foto ${cur + 1} (segnaposto)`); $('#lb-pos').textContent = `${cur + 1} / ${N}`; sel.checked = selected.has(cur); };
    const open = (i, el) => { opener = el; show(i); lb.hidden = false; document.documentElement.classList.add('menu-open'); $('#lb-close').focus(); };
    const close = () => {
      lb.hidden = true; document.documentElement.classList.remove('menu-open');
      while (cur >= shown) loadMore(); // la foto vista potrebbe non essere ancora nella griglia
      (grid.querySelector(`.tile__open[data-i="${cur}"]`) || opener)?.focus();
    };
    grid.addEventListener('click', e => {
      const b = e.target.closest('.tile__open'); if (!b) return;
      const i = +b.dataset.i;
      if (document.body.classList.contains('selecting')) { setSel(i, !selected.has(i)); sync(); } else open(i, b);
    });
    $$('[data-step]', lb).forEach(b => b.addEventListener('click', () => show(cur + +b.dataset.step)));
    $('#lb-close').addEventListener('click', close);
    $('#lb-dl').addEventListener('click', () => S.toast('SIMULAZIONE: nessun file scaricato. In Fase B: /api/photos/:id/download.'));
    sel.addEventListener('change', () => { setSel(cur, sel.checked); sync(); });
    addEventListener('keydown', e => {
      if (lb.hidden) return;
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') show(cur + 1);
      if (e.key === 'ArrowLeft') show(cur - 1);
      if (e.key === 'Tab') {
        const f = $$('button, input', lb).filter(x => x.offsetParent), first = f[0], last = f[f.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    });
    let x0 = null;
    lb.addEventListener('touchstart', e => { x0 = e.touches[0].clientX; }, { passive: true });
    lb.addEventListener('touchend', e => { if (x0 === null) return; const dx = e.changedTouches[0].clientX - x0; if (Math.abs(dx) > 50) show(cur + (dx < 0 ? 1 : -1)); x0 = null; });
    sync();
  }
})();
