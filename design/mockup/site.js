/* MOCKUP Fase A.2 — parti comuni a tutte le pagine: navbar, footer, schede, utilità.
   In un sito statico evita di duplicare navbar e footer in ogni file HTML;
   in Fase B diventeranno componenti React (Layout, Navbar, Footer, Card…). */
(() => {
  const D = window.SITE_DATA;
  const $ = (s, r = document) => r.querySelector(s);
  const $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isHome = document.body.classList.contains('home');

  /* URL statici equivalenti alle rotte future (vedi docs/SITEMAP_E_FLUSSI.md) */
  const url = {
    initiative: slug => `beneficenza-articolo.html?slug=${encodeURIComponent(slug)}`,  // /beneficenza/:slug
    event: slug => `evento.html?slug=${encodeURIComponent(slug)}`,                     // /eventi/:slug
    album: slug => `album.html?slug=${encodeURIComponent(slug)}`,                      // /foto/:slug
    home: id => (isHome ? `#${id}` : `index.html#${id}`)
  };
  const find = (kind, slug) => D[kind].find(x => x.slug === slug) || null;
  const param = name => new URLSearchParams(location.search).get(name);
  const publishedAlbum = slug => { const a = slug && find('albums', slug); return a && a.published ? a : null; };
  /* Solo i contenuti pubblicabili: le bozze non compaiono mai nelle liste pubbliche */
  const publicEvents = () => D.events.filter(e => e.status === 'published').sort((a, b) => b.date.localeCompare(a.date));
  const publicInitiatives = () => D.initiatives.filter(i => i.status === 'published').sort((a, b) => b.date.localeCompare(a.date));

  /* ---------- NAVBAR ---------- */
  const SECTIONS = [['top', 'Home'], ['chi-siamo', 'Chi siamo'], ['beneficenza', 'Beneficenza'], ['eventi', 'Eventi'], ['foto', 'Foto']];
  const nav = $('.nav');
  if (nav) {
    const current = document.body.dataset.section; // pagina interna: sezione di appartenenza
    nav.innerHTML = `
    <div class="nav__inner">
      <a class="nav__logo" href="${url.home('top')}" aria-label="Il Tuo Sorriso, il Nostro Ricordo — torna all'inizio della Home">
        <img src="../assets/intro-figure.webp" alt="" width="48" height="48">
        <span class="nav__name">Il Tuo Sorriso,<br>il Nostro Ricordo</span>
      </a>
      <button class="nav__toggle" type="button" aria-expanded="false" aria-controls="nav-menu">
        <span class="nav__toggle-bars" aria-hidden="true"></span><span class="nav__toggle-label">Menu</span>
      </button>
      <nav id="nav-menu" class="nav__menu" aria-label="Principale">
        <ul>${SECTIONS.map(([id, label]) => `<li><a href="${url.home(id)}" data-section="${id}"${current === id ? ' aria-current="true"' : ''}>${label}</a></li>`).join('')}</ul>
      </nav>
    </div>`;

    const hero = $('.hero');
    const setNav = () => {
      if (!hero) { nav.dataset.state = 'solid'; return; }
      nav.dataset.state = scrollY > hero.offsetHeight - nav.offsetHeight - 1 ? 'solid' : 'over-hero';
    };
    setNav(); addEventListener('scroll', setNav, { passive: true });

    const toggle = $('.nav__toggle', nav), menu = $('#nav-menu', nav);
    const closeMenu = () => { toggle.setAttribute('aria-expanded', 'false'); menu.classList.remove('is-open'); document.documentElement.classList.remove('menu-open'); };
    toggle.addEventListener('click', () => {
      const open = toggle.getAttribute('aria-expanded') !== 'true';
      toggle.setAttribute('aria-expanded', String(open)); menu.classList.toggle('is-open', open);
      document.documentElement.classList.toggle('menu-open', open);
      if (open) $('a', menu).focus();
    });
    $$('a', menu).forEach(a => a.addEventListener('click', closeMenu));
    addEventListener('keydown', e => { if (e.key === 'Escape' && menu.classList.contains('is-open')) { closeMenu(); toggle.focus(); } });
    matchMedia('(min-width: 861px)').addEventListener('change', e => e.matches && closeMenu());
  }

  /* ---------- FOOTER ---------- */
  const footer = $('.footer');
  if (footer) footer.innerHTML = `
    <div class="wrap footer__grid">
      <div>
        <img src="../assets/intro-figure.webp" alt="" width="88" height="88" class="footer__logo">
        <p class="footer__name">Il Tuo Sorriso, il Nostro Ricordo</p>
        <p class="footer__small">Associazione di volontariato · Martano (LE)<br><span class="tbd">Denominazione legale e C.F. da fornire</span></p>
      </div>
      <div>
        <h2 class="footer__h">Contatti</h2>
        <p class="tbd">Email, telefono e sede ufficiali da fornire</p>
      </div>
      <div>
        <h2 class="footer__h">Social</h2>
        <p><a href="https://www.instagram.com/ilvostrosorrisoilnostroricordo/" rel="noopener" target="_blank">Instagram<span class="visually-hidden"> (si apre in una nuova scheda)</span></a> <span class="tbd">(account da confermare: username diverso dal nome)</span></p>
      </div>
      <div>
        <h2 class="footer__h">Esplora</h2>
        <ul class="footer__links">
          <li><a href="beneficenza.html">Iniziative</a></li>
          <li><a href="eventi.html">Eventi</a></li>
          <li><a href="foto.html">Album fotografici</a></li>
          <li><a href="privacy.html">Privacy</a></li>
        </ul>
      </div>
    </div>
    <p class="wrap footer__copy">© 2026 Il Tuo Sorriso, il Nostro Ricordo <span class="tbd">— titolarità da confermare</span></p>`;

  /* ---------- SCHEDE RIUTILIZZABILI ---------- */
  const ph = (cls, label) => `<div class="ph ${cls}" role="img" aria-label="Segnaposto: ${esc(label)}"><span>${esc(label)}<br><small>da fornire</small></span></div>`;

  const initiativeCard = (i, n, total) => i.demo ? `
    <article class="ccard ccard--demo"${total ? ` aria-roledescription="slide" aria-label="${n} di ${total} — scheda dimostrativa"` : ''}>
      <div class="ccard__media">
        ${i.image ? `<img class="ccard__img" src="${esc(i.image)}" alt="Immagine dimostrativa" draggable="false">` : ph('ph--poster2', 'Immagine dimostrativa')}
      </div>
      <div class="ccard__body">
        <p class="ccard__meta"><span>${esc(i.dateLabel)}</span><span>${esc(i.place)}</span></p>
        <span class="tag-prov">Demo — non è un’iniziativa reale</span>
        <h3 class="h3">${esc(i.title)}</h3>
        <p>${esc(i.summary)}</p>
        <p class="ccard__nolink">Nessun articolo: scheda dimostrativa</p>
        <p class="src">Serve solo a verificare il funzionamento del carosello.</p>
      </div>
    </article>` : `
    <article class="ccard"${total ? ` aria-roledescription="slide" aria-label="${n} di ${total}"` : ''}>
      <div class="ccard__media">
        ${i.image ? `<img class="ccard__img" src="${esc(i.image)}" alt="" draggable="false">` : ph('ph--hospital', 'Foto autorizzata della consegna')}
        <p class="ccard__stat"><b>${esc(i.dateLabel)}</b><span>${esc(i.place.split(',').pop().trim())}</span></p>
      </div>
      <div class="ccard__body">
        <p class="ccard__meta"><span>${esc(i.dateLabel)}</span><span>${esc(i.place)}</span></p>
        <h3 class="h3">${esc(i.title)}</h3>
        <p>${esc(i.summary)}</p>
        <a class="btn btn--gold" href="${url.initiative(i.slug)}">Scopri di più<span class="visually-hidden">: ${esc(i.title)}</span> <span aria-hidden="true">→</span></a>
        <p class="src">Fonti: ${i.sources.map(s => esc(s.name)).filter((v, k, a) => a.indexOf(v) === k).join(' · ')}</p>
      </div>
    </article>`;

  /* Card evento (Home, archivio eventi). i = posizione nella lista: alterna sinistra/destra.
     La locandina si può ingrandire (sezioni.js); il link alla galleria resta invariato. */
  const eventCard = (e, i = 0) => {
    const album = publishedAlbum(e.album);
    const past = e.date < new Date().toISOString().slice(0, 10);
    const alt = e.poster ? `Illustrazione editoriale dell’evento: ${e.title}` : '';
    return `
    <li class="ecard ${i % 2 ? 'ecard--right' : 'ecard--left'}">
      <div class="ecard__poster">${e.poster
        ? `<button type="button" class="poster-zoom" data-zoom="${esc(e.poster)}" data-zoom-alt="${esc(alt)}" aria-label="Ingrandisci l’immagine: ${esc(e.title)}"><img src="${esc(e.poster)}" alt="${esc(alt)}" loading="lazy"><span class="poster-zoom__hint" aria-hidden="true">Ingrandisci</span></button>`
        : ph('ph--poster', 'Locandina')}</div>
      <div class="ecard__body">
        <p class="ecard__date"><time datetime="${esc(e.date)}"><b>${esc(e.day)}</b> ${esc(e.monthYear)}</time></p>
        <ul class="ecard__chips" aria-label="Dettagli">
          ${e.kind ? `<li>${esc(e.kind)}</li>` : ''}<li class="ecard__chip--${past ? 'past' : 'next'}">${past ? 'Evento concluso' : 'In programma'}</li>
          ${e.status === 'draft' ? '<li class="ecard__chip--draft">Bozza non pubblicata</li>' : ''}
        </ul>
        <h3 class="h3">${esc(e.title)}</h3>
        <p class="ecard__place"><svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21s-7-6.2-7-11.5a7 7 0 0 1 14 0C19 14.8 12 21 12 21Z" fill="none" stroke="currentColor" stroke-width="2"/><circle cx="12" cy="9.5" r="2.5" fill="currentColor"/></svg>${e.place ? esc(e.place) : 'Luogo <em>da confermare</em>'}</p>
        <p>${esc(e.summary)}</p>
        <div class="ecard__actions">
          <a class="btn btn--ink" href="${url.event(e.slug)}">Scopri di più<span class="visually-hidden">: ${esc(e.title)}</span></a>
          ${album ? `<a class="link-arrow" href="${url.album(album.slug)}">Galleria foto evento <span aria-hidden="true">→</span></a>` : ''}
        </div>
        ${e.provisional?.length ? `<p class="note-prov">Da confermare: ${esc(e.provisional.join(', '))}.</p>` : ''}
      </div>
    </li>`;
  };

  const albumCard = a => `
    <li class="acard">
      <a class="acard__link" href="${url.album(a.slug)}">
        <span class="acard__pile" aria-hidden="true">
          <span class="acard__print acard__print--2"></span>
          <span class="acard__print acard__print--1" style="background:${tile(a.slug.length)}"></span>
        </span>
        <span class="acard__body">
          ${a.fictional ? '<span class="tag-prov">Album fittizio di prova</span>' : '<span class="tag-prov">Foto dimostrative</span>'}
          <span class="acard__title">${esc(a.name)}</span>
          <span class="acard__meta">${a.dateLabel ? esc(a.dateLabel) + ' · ' : ''}${a.demoCount ? `${a.demoCount} foto (valore dimostrativo)` : 'Nessuna foto ancora'}</span>
        </span>
      </a>
    </li>`;

  /* Box fonti: testata, data di pubblicazione, data di consultazione, stato di verifica */
  const sourcesBox = list => `<section class="sources" aria-labelledby="src-title"><h2 id="src-title">Fonti</h2><ul>${list.map(s => `
    <li><a href="${esc(s.url)}" rel="noopener" target="_blank">${esc(s.name)}<span class="visually-hidden"> (si apre in una nuova scheda)</span></a>
      <small>pubblicato: ${esc(s.date)} · consultato: ${esc(s.checked)}</small>
      <small class="sources__status">${esc(s.status)}</small></li>`).join('')}</ul></section>`;

  /* Colori dei segnaposto fotografici (stessi della pagina album) */
  const PAL = [['#F39C33', '#c86b1c'], ['#28A0B2', '#1B6E82'], ['#32A5C2', '#34593C'], ['#F7C552', '#F39C33'], ['#34593C', '#112318'], ['#28A0B2', '#F7C552']];
  function tile(i) { const [a, b] = PAL[i % PAL.length]; return `radial-gradient(circle at ${20 + (i * 37) % 60}% ${30 + (i * 53) % 50}%, rgba(255,248,238,.55), transparent 35%), linear-gradient(${(i * 47) % 360}deg, ${a}, ${b})`; }

  const toast = msg => {
    let t = $('#toast');
    if (!t) { t = document.createElement('div'); t.id = 'toast'; t.className = 'toast'; t.setAttribute('role', 'status'); document.body.append(t); }
    t.textContent = msg; t.hidden = false; clearTimeout(t._h); t._h = setTimeout(() => { t.hidden = true; }, 4000);
  };

  /* Pagina “non trovato” per slug inesistenti (equivale al 404 delle rotte future) */
  const notFound = (root, what, back, backLabel) => {
    document.title = `Non trovato · Il Tuo Sorriso, il Nostro Ricordo`;
    root.innerHTML = `<section class="page-head"><div class="wrap">
      <h1 class="h2">${esc(what)} non trovato</h1>
      <p class="lead">Il collegamento potrebbe essere errato o il contenuto non è più pubblicato.</p>
      <p><a class="btn btn--ink" href="${back}">${esc(backLabel)}</a></p></div></section>`;
  };

  window.Site = { D, $, $$, esc, reduce, url, find, param, publishedAlbum, publicEvents, publicInitiatives, sourcesBox, initiativeCard, eventCard, albumCard, tile, toast, notFound, ph };
})();
