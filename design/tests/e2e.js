/* Test E2E del mockup (Fasi A.2 e A.3).
   Uso:  npx serve -l 8765 design   (oppure: python3 -m http.server 8765 --directory design)
         npm i -D playwright && npx playwright install chromium webkit
         node design/tests/e2e.js
   Variabili: BASE_URL (default http://localhost:8765/mockup/), CHROMIUM_PATH (opzionale).
   Se WebKit non è installato i test girano solo su Chromium e il report lo segnala. */
const path = require('path');
const { chromium, webkit } = require('playwright');
const B = process.env.BASE_URL || 'http://localhost:8765/mockup/';
const OUT = path.join(__dirname, '..', 'screenshots') + path.sep;
const results = [];
const ok = (name, cond, extra = '') => results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra && !cond ? ' — ' + extra : ''}`);

const VIEWPORTS = [
  ['desktop', { viewport: { width: 1440, height: 900 } }],
  ['tablet', { viewport: { width: 768, height: 1024 }, hasTouch: true }],
  ['mobile', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }]
];

async function suite(engine, b, vpName, opts) {
  const vp = `${engine}/${vpName}`;
  const shot = (name, full = false) => engine === 'chromium' ? p.screenshot({ path: `${OUT}ult-${vpName}-${name}.png`, fullPage: full }) : null;
  const ctx = await b.newContext(opts); const p = await ctx.newPage();
  const errs = [];
  p.on('pageerror', e => errs.push(e.message));
  p.on('console', m => m.type() === 'error' && !/fonts\.g/.test(m.text()) && errs.push(m.text()));
  const noOverflow = async tag => {
    await p.evaluate(() => document.fonts.ready);
    const d = await p.evaluate(() => document.documentElement.scrollWidth - innerWidth);
    ok(`[${vp}] nessuno scroll orizzontale: ${tag}`, d <= 0, `${d}px`);
  };
  const isMobileMenu = vpName !== 'desktop';

  // 1. Intro: blocco (in Chromium l'animazione viene rallentata per avere tempo di provare)
  const cdp = engine === 'chromium' ? await ctx.newCDPSession(p) : null;
  if (cdp) { await cdp.send('Animation.enable'); await cdp.send('Animation.setPlaybackRate', { playbackRate: 0.25 }); }
  await p.goto(B + 'index.html?intro'); await p.waitForTimeout(150);
  ok(`[${vp}] intro: pagina bloccata`, await p.evaluate(() => document.documentElement.classList.contains('intro-lock')));
  await p.mouse.wheel(0, 2000); await p.keyboard.press('PageDown'); await p.keyboard.press('End');
  if (opts.hasTouch) await p.touchscreen.tap(200, 700).catch(() => {});
  await p.waitForTimeout(100);
  ok(`[${vp}] intro: rotella/tastiera/touch non scorrono`, (await p.evaluate(() => scrollY)) === 0);
  ok(`[${vp}] intro: navbar e sezioni inerti`, await p.evaluate(() => document.querySelector('.nav').inert && document.querySelector('#chi-siamo').inert));
  if (engine === 'chromium') {
    const tabbed = [];
    for (let k = 0; k < 3; k++) { await p.keyboard.press('Tab'); tabbed.push(await p.evaluate(() => document.activeElement === document.body ? 'BODY' : document.activeElement.className)); }
    ok(`[${vp}] intro: il Tab raggiunge solo "Salta introduzione"`, tabbed.every(t => t === 'hero__skip' || t === 'BODY'), tabbed.join(','));
  }
  await p.evaluate(() => { location.hash = '#eventi'; }); await p.waitForTimeout(100);
  ok(`[${vp}] intro: le ancore non spostano la pagina`, (await p.evaluate(() => scrollY)) === 0);
  const running = await p.evaluate(() => !document.querySelector('.hero').classList.contains('is-done'));
  if (running) { await p.locator('.hero__skip').click({ timeout: 3000 }); await p.waitForTimeout(100); }
  if (cdp) await cdp.send('Animation.setPlaybackRate', { playbackRate: 1 });
  ok(`[${vp}] dopo skip/fine: sblocco completo`, await p.evaluate(() => !document.documentElement.classList.contains('intro-lock') && !document.querySelector('.nav').inert));
  await p.mouse.move(300, 400); await p.mouse.wheel(0, 900);
  ok(`[${vp}] scroll di nuovo attivo`, await p.waitForFunction(() => scrollY > 0, null, { timeout: 2500 }).then(() => true, () => false));
  await p.goto(B + 'index.html?intro'); await p.waitForTimeout(2700);
  ok(`[${vp}] fine naturale dell'intro: sbloccato`, await p.evaluate(() => !document.documentElement.classList.contains('intro-lock') && document.querySelector('.hero').classList.contains('is-done')));

  // Home: contenuti
  await p.goto(B + 'index.html'); await p.waitForTimeout(100);
  ok(`[${vp}] intro già vista: nessun blocco`, await p.evaluate(() => !document.documentElement.classList.contains('intro-lock')));
  await p.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
  await noOverflow('home');
  ok(`[${vp}] home: nessun href="#"`, (await p.$$('a[href="#"]')).length === 0);
  ok(`[${vp}] home: nessun importo €`, !(await p.evaluate(() => /€|3\.000|euro/i.test(document.body.innerText))));
  ok(`[${vp}] home: carosello con 3 card, frecce e 3 indicatori visibili`, await p.evaluate(() => document.querySelectorAll('#charity-track .ccard').length === 3 && document.querySelectorAll('.dots__btn').length === 3 && getComputedStyle(document.querySelector('.carrow--next')).display !== 'none'));
  const draftTitles = await p.evaluate(() => window.SITE_DATA.events.filter(e => e.status === 'draft').map(e => e.title));
  ok(`[${vp}] home: nessuna bozza`, !(await p.evaluate(t => t.some(x => document.body.innerText.includes(x)), draftTitles)));
  ok(`[${vp}] home eventi: card alternate sinistra/destra`, await p.evaluate(() => { const c = [...document.querySelectorAll('#home-events .ecard')]; return c.length >= 1 && c.every((e, i) => e.classList.contains(i % 2 ? 'ecard--right' : 'ecard--left')); }));
  await p.locator('#home-events').scrollIntoViewIfNeeded(); await p.waitForTimeout(400);
  for (const el of await p.$$('#home-events .poster-zoom img')) { await el.scrollIntoViewIfNeeded(); await p.waitForTimeout(150); }
  ok(`[${vp}] home eventi: locandine intere (nessun riquadro vuoto)`, await p.evaluate(() => [...document.querySelectorAll('#home-events .poster-zoom img')].every(i => i.complete && i.naturalWidth > 0 && getComputedStyle(i).objectFit === 'contain')));
  // le immagini hanno caricamento differito: si scorre la pagina per farle caricare tutte
  for (let y = 0; y < await p.evaluate(() => document.body.scrollHeight); y += 600) { await p.evaluate(v => scrollTo(0, v), y); await p.waitForTimeout(60); }
  await p.waitForTimeout(300);
  ok(`[${vp}] immagini: tutte caricate`, await p.evaluate(() => [...document.images].every(i => i.complete && i.naturalWidth > 0)));
  await shot('home-full', true);
  if (engine === 'chromium' && vpName === 'desktop') {
    const perf = await p.evaluate(() => {
      const nav = performance.getEntriesByType('navigation')[0];
      const res = performance.getEntriesByType('resource');
      const local = res.filter(r => r.name.startsWith(location.origin));
      return { dcl: Math.round(nav.domContentLoadedEventEnd), bytes: local.reduce((t, r) => t + (r.transferSize || r.encodedBodySize || 0), 0), requests: local.length,
        cls: performance.getEntriesByType('layout-shift')?.reduce?.((t, e) => t + (e.hadRecentInput ? 0 : e.value), 0) ?? 0 };
    });
    ok(`[${vp}] prestazioni: DOMContentLoaded < 1500 ms in locale`, perf.dcl < 1500, JSON.stringify(perf));
    ok(`[${vp}] prestazioni: risorse locali della Home < 1,5 MB`, perf.bytes < 1.5e6, JSON.stringify(perf));
    results.push(`INFO  prestazioni Home (desktop, server locale): ${JSON.stringify(perf)}`);
  }

  // 2. Home → beneficenza → articolo → archivio → Home
  await p.click('#charity-track .ccard.is-active .btn'); await p.waitForLoadState();
  ok(`[${vp}] home → articolo beneficenza`, /beneficenza-articolo\.html\?slug=donazione-spdc-scorrano-2025/.test(p.url()) && (await p.textContent('h1')).includes('Un gesto concreto'));
  ok(`[${vp}] articolo: nessun importo`, !(await p.evaluate(() => /€|3\.000|euro/i.test(document.body.innerText))));
  ok(`[${vp}] articolo: tappe e fonti con data di consultazione`, (await p.$$('.steps li')).length === 3 && /consultato: 14\/10\/2026/.test(await p.textContent('.sources')));
  ok(`[${vp}] articolo: “televisori” senza numero nel testo pubblico`, !(await p.evaluate(() => /\b(8|9|otto|nove)\s+televisori/i.test(document.querySelector('.article__main > p.lead').innerText + [...document.querySelectorAll('.article__main > p, .fact')].map(e => e.innerText).join(' ')))));
  ok(`[${vp}] articolo: link all'evento di raccolta fondi`, (await p.$$('a[href="evento.html?slug=memorial-2025"]')).length >= 1);
  await shot('beneficenza-articolo', true); await noOverflow('articolo');
  await p.click('.crumbs a[href="beneficenza.html"]'); await p.waitForLoadState();
  ok(`[${vp}] archivio beneficenza`, p.url().endsWith('beneficenza.html') && (await p.$$('.ccard')).length === 1);
  ok(`[${vp}] archivio: spiegata l'unica iniziativa documentata`, /una sola iniziativa/.test(await p.textContent('main')));
  await shot('beneficenza', true); await noOverflow('archivio beneficenza');
  await p.goBack(); ok(`[${vp}] tasto indietro`, /beneficenza-articolo/.test(p.url()));
  await p.goto(B + 'beneficenza.html');
  if (isMobileMenu) await p.click('.nav__toggle');
  await p.click('.nav__menu a[data-section="top"]'); await p.waitForLoadState();
  ok(`[${vp}] ritorno alla Home dalla navbar`, /index\.html#top/.test(p.url()));

  // 3. Home → evento → beneficenza / album
  await p.goto(B + 'eventi.html'); await p.goto(B + 'index.html#eventi'); await p.waitForTimeout(1200);
  ok(`[${vp}] home#eventi: niente intro, pagina sulla sezione`, await p.evaluate(() => !document.documentElement.classList.contains('intro-lock') && scrollY > 300));
  await p.click('#home-events .btn'); await p.waitForLoadState();
  ok(`[${vp}] pagina evento Memorial`, /evento\.html\?slug=memorial-2025/.test(p.url()) && (await p.textContent('h1')).includes('Memorial'));
  ok(`[${vp}] evento: voce "Eventi" attiva`, await p.evaluate(() => document.querySelector('.nav__menu a[aria-current]')?.dataset.section === 'eventi'));
  ok(`[${vp}] evento: fonti presenti`, (await p.$$('.sources a')).length >= 1);
  await shot('evento', true); await noOverflow('evento');
  await p.click('.related__card'); await p.waitForLoadState();
  ok(`[${vp}] evento → beneficenza collegata`, /beneficenza-articolo/.test(p.url()));
  await p.goBack(); await p.click('.gallery-cta'); await p.waitForLoadState();
  ok(`[${vp}] evento → album (anteprima)`, /album\.html\?slug=memorial-2025/.test(p.url()));
  ok(`[${vp}] album Memorial: anteprima, nessuna foto inventata`, await p.isVisible('.empty') && (await p.$$('.tile')).length === 0 && /non ancora caricate/i.test(await p.textContent('main')));
  ok(`[${vp}] album → evento (link inverso)`, (await p.$$('a[href="evento.html?slug=memorial-2025"]')).length === 1);
  await p.goto(B + 'eventi.html'); await shot('eventi', true); await noOverflow('eventi');
  ok(`[${vp}] eventi: stato vuoto "Prossimi"`, await p.isVisible('.empty'));
  ok(`[${vp}] eventi: nessuna bozza nell'archivio pubblico`, !(await p.evaluate(t => t.some(x => document.querySelector('#groups').innerText.includes(x)), draftTitles)));
  const years = await p.$$eval('.year__label', l => l.map(e => e.textContent));
  ok(`[${vp}] eventi: archivio diviso per anno, dal più recente`, years.length >= 1 && years.every((y, i) => i === 0 || y < years[i - 1]), years.join(','));
  ok(`[${vp}] eventi: alternanza continua fra gli anni`, await p.evaluate(() => [...document.querySelectorAll('#groups .ecard')].every((e, i) => e.classList.contains(i % 2 ? 'ecard--right' : 'ecard--left'))));
  if (years.length > 1) { await p.click(`.year-nav a[href="#anno-${years[1]}"]`); await p.waitForTimeout(900);
    ok(`[${vp}] eventi: salto all'anno ${years[1]}`, await p.evaluate(y => { const r = document.getElementById('anno-' + y).getBoundingClientRect(); return r.top < innerHeight / 2 && r.top > -50; }, years[1])); }
  await p.locator('#groups .poster-zoom').first().click(); await p.waitForTimeout(400);
  ok(`[${vp}] locandina: si ingrandisce`, await p.evaluate(() => document.querySelector('.zoom-dialog')?.open === true));
  await shot('eventi-zoom');
  await p.keyboard.press('Escape'); await p.waitForTimeout(200);
  ok(`[${vp}] locandina: Esc chiude e il focus torna`, await p.evaluate(() => !document.querySelector('.zoom-dialog').open && document.activeElement.classList.contains('poster-zoom')));
  if (draftTitles.length) {
    await p.goto(B + 'eventi.html?bozze=1');
    ok(`[${vp}] eventi?bozze=1: bozza visibile ed etichettata`, await p.isVisible('.group--draft') && /Bozza non pubblicata/i.test(await p.textContent('.group--draft')));
  }
  await p.goto(B + 'evento.html?slug=memorial-2025');
  ok(`[${vp}] evento: scheda "In breve" e navigazione fra eventi`, await p.isVisible('.fact') && (await p.$$('.event-pager__link')).length >= 1);
  const pagerHref = await p.getAttribute('.event-pager__link', 'href');
  await p.click('.event-pager__link'); await p.waitForLoadState();
  ok(`[${vp}] evento: link all'evento precedente`, p.url().endsWith(pagerHref));
  await shot('evento-2', true); await noOverflow('evento 2');

  // 4. Home → foto → catalogo → album → lightbox → selezione
  await p.goto(B + 'index.html'); await p.click('.stack'); await p.waitForLoadState();
  ok(`[${vp}] home → catalogo foto: solo l'album dell'evento reale`, p.url().endsWith('foto.html') && (await p.$$('#albums .acard')).length === 1 && /Memorial 2025/.test(await p.textContent('#albums')));
  ok(`[${vp}] catalogo: nessun album fittizio nel pubblico`, !(await p.evaluate(() => /fittizio/i.test(document.querySelector('#albums').innerText))));
  await shot('foto-catalogo', true); await noOverflow('catalogo');
  await p.click('.review-link a'); await p.waitForLoadState();
  ok(`[${vp}] catalogo in revisione: album fittizi separati ed etichettati`, /foto\.html\?demo=1/.test(p.url()) && (await p.$$('.group--draft .acard')).length === 2);
  await p.click('.acard a[href="album.html?slug=demo-album-grande"]'); await p.waitForLoadState();
  ok(`[${vp}] album dimostrativo: etichettato e 48 foto caricate`, /fittizio/i.test(await p.textContent('.page-head')) && (await p.$$('.tile')).length === 48);
  await p.click('#load-more'); ok(`[${vp}] album: "Carica altre"`, (await p.$$('.tile')).length === 96);
  await p.goto(B + 'album.html?slug=demo-album-grande');
  await p.click('#select-mode'); for (const i of [0, 3, 5]) await p.locator('.tile__open').nth(i).click();
  ok(`[${vp}] selezione multipla: 3`, (await p.textContent('#count')) === '3' && await p.isVisible('#actionbar'));
  await shot('album-selezione');
  await p.click('#zip'); await p.waitForTimeout(1700);
  ok(`[${vp}] ZIP simulato dichiarato`, /SIMULAZIONE/.test(await p.textContent('#toast')));
  await p.click('#clear'); await p.click('#select-mode');
  await p.locator('.tile__open').nth(2).click(); await p.waitForTimeout(200);
  ok(`[${vp}] lightbox aperto con focus`, await p.evaluate(() => !document.getElementById('lb').hidden && document.activeElement.id === 'lb-close'));
  await p.keyboard.press('ArrowRight'); ok(`[${vp}] lightbox: freccia`, (await p.textContent('#lb-pos')).startsWith('4 /'));
  await shot('album-lightbox');
  await p.keyboard.press('Escape'); ok(`[${vp}] lightbox: Esc e focus restituito`, await p.evaluate(() => document.getElementById('lb').hidden && document.activeElement.dataset.i === '3'));
  await p.goto(B + 'album.html?slug=demo-album-vuoto'); ok(`[${vp}] album vuoto`, await p.isVisible('.empty'));
  await p.goto(B + 'album.html?slug=demo-non-pubblicato'); ok(`[${vp}] album non pubblicato`, (await p.textContent('h1')).includes('non disponibile'));
  await p.goto(B + 'evento.html?slug=inesistente'); ok(`[${vp}] slug inesistente → non trovato`, (await p.textContent('h1')).includes('non trovato'));

  // 5. Carosello: il comportamento completo è verificato da design/tests/carosello.js
  await p.goto(B + 'index.html#beneficenza'); await p.waitForTimeout(600);
  await p.evaluate(() => document.querySelector('.carrow--next').click()); await p.waitForTimeout(900);
  ok(`[${vp}] carosello: freccia successiva → card 2`, (await p.textContent('.carousel-count__now')) === '02');
  await p.goto(B + 'index.html?carosello=produzione#beneficenza'); await p.waitForTimeout(400);
  ok(`[${vp}] carosello produzione: 1 card, controlli nascosti`, (await p.$$('#charity-track .ccard')).length === 1 && !(await p.isVisible('.carrow--next')));

  // Menu mobile
  if (isMobileMenu) {
    await p.goto(B + 'eventi.html'); await p.click('.nav__toggle'); await p.waitForTimeout(300);
    ok(`[${vp}] menu aperto con focus sulla prima voce`, await p.evaluate(() => document.querySelector('#nav-menu').classList.contains('is-open') && document.activeElement.closest('#nav-menu') !== null));
    if (vpName === 'mobile') await shot('menu');
    await p.keyboard.press('Escape'); ok(`[${vp}] menu: Esc chiude`, await p.evaluate(() => !document.querySelector('#nav-menu').classList.contains('is-open')));
  }
  ok(`[${vp}] nessun errore JavaScript`, errs.length === 0, errs.join(' | '));
  await ctx.close();
}

(async () => {
  const engines = [['chromium', await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {})]];
  try { engines.push(['webkit', await webkit.launch()]); } catch (e) { results.push('SKIP  WebKit non installato: test eseguiti solo su Chromium'); }
  for (const [engine, b] of engines) for (const [name, opts] of VIEWPORTS) await suite(engine, b, name, opts);

  const b = engines[0][1];
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
  await p.goto(B + 'index.html?intro'); await p.waitForTimeout(100);
  ok('[reduced-motion] nessuna intro, nessun blocco', await p.evaluate(() => document.querySelector('.hero').classList.contains('is-done') && !document.documentElement.classList.contains('intro-lock')));

  // Link morti su tutte le pagine
  const pages = ['index.html', 'index.html?carosello=produzione', 'evento.html?slug=torneo-calcio-6-simone-2024', 'beneficenza.html', 'beneficenza-articolo.html?slug=donazione-spdc-scorrano-2025', 'eventi.html', 'eventi.html?bozze=1', 'evento.html?slug=memorial-2025', 'foto.html', 'album.html?slug=memorial-2025', 'album.html?slug=demo-album-grande', 'foto.html?demo=1', 'privacy.html'];
  const dead = [];
  for (const pg of pages) {
    await p.goto(B + pg);
    const hrefs = await p.$$eval('a[href]', as => as.map(a => a.getAttribute('href')));
    for (const h of hrefs) {
      if (h === '#') dead.push(`${pg}: href="#"`);
      if (/^https?:/.test(h) || h.startsWith('#')) continue;
      const file = h.split(/[?#]/)[0]; if (!file) continue;
      const r = await p.request.get(B + file); if (r.status() !== 200) dead.push(`${pg}: ${h} → ${r.status()}`);
    }
  }
  ok('link interni tutti validi (nessun 404, nessun href="#")', dead.length === 0, dead.join(' | '));
  for (const [, br] of engines) await br.close();
  console.log(results.join('\n'));
  const pass = results.filter(r => r.startsWith('PASS')).length, fail = results.filter(r => r.startsWith('FAIL')).length;
  console.log(`\n${pass}/${pass + fail} PASS`);
  process.exitCode = fail ? 1 : 0;
})();
