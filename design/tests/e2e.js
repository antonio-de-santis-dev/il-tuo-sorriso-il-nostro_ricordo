/* Test E2E del mockup (Fase A.2).
   Uso:  npx serve -l 8765 design   (oppure: python3 -m http.server 8765 --directory design)
         npm i -D playwright && npx playwright install chromium
         node design/tests/e2e.js
   Variabili: BASE_URL (default http://localhost:8765/mockup/), CHROMIUM_PATH (opzionale). */
const path = require('path');
const { chromium } = require('playwright');
const B = process.env.BASE_URL || 'http://localhost:8765/mockup/';
const OUT = path.join(__dirname, '..', 'screenshots') + path.sep;
const results = []; const ok = (name, cond, extra = '') => results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra ? ' — ' + extra : ''}`);
(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const [vp, opts] of [['desktop', { viewport: { width: 1440, height: 900 } }], ['mobile', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }]]) {
    const ctx = await b.newContext(opts); const p = await ctx.newPage();
    const errs = []; p.on('pageerror', e => errs.push(e.message)); p.on('console', m => m.type() === 'error' && !/fonts\.g/.test(m.text()) && errs.push(m.text() + ' @ ' + (m.location()?.url || '')));
    const noOverflow = async tag => { await p.evaluate(() => document.fonts.ready); const r = await p.evaluate(() => ({ d: document.documentElement.scrollWidth - innerWidth, sw: document.documentElement.scrollWidth, iw: innerWidth, off: [...document.querySelectorAll('body *')].filter(e => e.getBoundingClientRect().right > innerWidth + 1).slice(0, 4).map(e => e.tagName + '.' + e.className) })); ok(`[${vp}] nessuno scroll orizzontale: ${tag}`, r.d <= 0, JSON.stringify(r)); };

    // 1. Intro: blocco
    const cdp = await ctx.newCDPSession(p); await cdp.send('Animation.enable'); await cdp.send('Animation.setPlaybackRate', { playbackRate: 0.25 });
    await p.goto(B + 'index.html?intro'); await p.waitForTimeout(200);
    ok(`[${vp}] intro: pagina bloccata (classe intro-lock)`, await p.evaluate(() => document.documentElement.classList.contains('intro-lock')));
    await p.mouse.wheel(0, 2000); await p.keyboard.press('PageDown'); await p.keyboard.press('End'); await p.keyboard.press('Space');
    if (vp === 'mobile') { await p.touchscreen.tap(200, 700).catch(() => {}); }
    await p.waitForTimeout(150);
    ok(`[${vp}] intro: rotella/tastiera/touch non scorrono`, (await p.evaluate(() => scrollY)) === 0, 'scrollY=' + await p.evaluate(() => scrollY));
    const navInert = await p.evaluate(() => document.querySelector('.nav').inert && document.querySelector('#chi-siamo').inert);
    ok(`[${vp}] intro: navbar e sezioni inerti`, navInert);
    const tabbed = [];
    for (let k = 0; k < 4; k++) { await p.keyboard.press('Tab'); tabbed.push(await p.evaluate(() => document.activeElement === document.body ? 'BODY' : document.activeElement.className)); }
    ok(`[${vp}] intro: il Tab raggiunge solo "Salta introduzione"`, tabbed.every(t => t === 'hero__skip' || t === 'BODY') && tabbed.includes('hero__skip'), tabbed.join(','));
    await p.evaluate(() => { location.hash = '#eventi'; }); await p.waitForTimeout(100);
    ok(`[${vp}] intro: ancora nell'URL non sposta la pagina`, (await p.evaluate(() => scrollY)) === 0);
    await p.screenshot({ path: `${OUT}a2-${vp}-intro-locked.png` });
    ok(`[${vp}] intro ancora in corso durante i controlli`, await p.evaluate(() => !document.querySelector('.hero').classList.contains('is-done')));
    await p.locator('.hero__skip').click({ timeout: 3000 }); await p.waitForTimeout(100);
    await cdp.send('Animation.setPlaybackRate', { playbackRate: 1 });
    ok(`[${vp}] skip: sblocco completo`, await p.evaluate(() => !document.documentElement.classList.contains('intro-lock') && !document.querySelector('.nav').inert && getComputedStyle(document.body).overflow !== 'hidden'));
    await p.mouse.wheel(0, 900); await p.waitForTimeout(400);
    ok(`[${vp}] skip: scroll di nuovo attivo`, (await p.evaluate(() => scrollY)) > 0);
    // fine naturale
    await p.goto(B + 'index.html?intro'); await p.waitForTimeout(2600);
    ok(`[${vp}] fine naturale: sbloccato`, await p.evaluate(() => !document.documentElement.classList.contains('intro-lock') && document.querySelector('.hero').classList.contains('is-done')));
    // intro già vista: nessun blocco
    await p.goto(B + 'index.html'); await p.waitForTimeout(100);
    ok(`[${vp}] intro già vista: nessun blocco`, await p.evaluate(() => !document.documentElement.classList.contains('intro-lock')));
    await p.evaluate(() => document.querySelectorAll('.reveal').forEach(e => e.classList.add('is-in')));
    await noOverflow('home');
    ok(`[${vp}] home: nessun href="#"`, (await p.$$('a[href="#"]')).length === 0);
    ok(`[${vp}] home: nessun importo €`, !(await p.evaluate(() => /€|3\.000/.test(document.body.innerText))));
    ok(`[${vp}] home: carosello con 1 card senza frecce`, await p.evaluate(() => getComputedStyle(document.querySelector('.carousel-ctrl')).display === 'none' && document.querySelectorAll('.ccard').length === 1));
    await p.screenshot({ path: `${OUT}a2-${vp}-home-full.png`, fullPage: true });

    // 2. Home → card beneficenza → articolo → archivio → Home
    await p.click('#charity-track .btn'); await p.waitForLoadState();
    ok(`[${vp}] beneficenza: articolo aperto`, /beneficenza-articolo\.html\?slug=donazione-spdc-scorrano-2025/.test(p.url()) && await p.isVisible('h1#page-title'));
    ok(`[${vp}] articolo: nessun importo €`, !(await p.evaluate(() => /€|3\.000/.test(document.body.innerText))));
    ok(`[${vp}] articolo: fonti e collegamento all'evento`, (await p.$$('.sources a')).length >= 3 && (await p.$$('a[href^="evento.html"]')).length >= 1);
    await p.screenshot({ path: `${OUT}a2-${vp}-beneficenza-articolo.png`, fullPage: true }); await noOverflow('articolo');
    await p.click('.crumbs a[href="beneficenza.html"]'); await p.waitForLoadState();
    ok(`[${vp}] archivio beneficenza`, p.url().endsWith('beneficenza.html') && (await p.$$('.ccard')).length === 1);
    await p.screenshot({ path: `${OUT}a2-${vp}-beneficenza.png`, fullPage: true }); await noOverflow('archivio beneficenza');
    await p.goBack(); ok(`[${vp}] tasto indietro`, /beneficenza-articolo/.test(p.url()));
    await p.goto(B + 'beneficenza.html');
    if (vp === 'mobile') await p.click('.nav__toggle');
    await p.click('.nav__menu a[data-section="top"]'); await p.waitForLoadState();
    ok(`[${vp}] ritorno alla Home dalla navbar`, /index\.html#top/.test(p.url()));

    // 3. Home → eventi → evento → album
    await p.goto(B + 'eventi.html'); await p.goto(B + 'index.html#eventi'); await p.waitForTimeout(1200);
    ok(`[${vp}] home#eventi: niente intro, scroll alla sezione`, await p.evaluate(() => !document.documentElement.classList.contains('intro-lock') && scrollY > 500));
    await p.click('#home-events .btn'); await p.waitForLoadState();
    ok(`[${vp}] pagina evento`, /evento\.html\?slug=memorial-2025/.test(p.url()) && (await p.textContent('h1')).includes('Memorial'));
    ok(`[${vp}] evento: navbar "Eventi" attiva`, await p.evaluate(() => document.querySelector('.nav__menu a[aria-current]')?.dataset.section === 'eventi'));
    await p.screenshot({ path: `${OUT}a2-${vp}-evento.png`, fullPage: true }); await noOverflow('evento');
    await p.click('.gallery-cta'); await p.waitForLoadState();
    ok(`[${vp}] evento → album`, /album\.html\?slug=memorial-2025/.test(p.url()));
    ok(`[${vp}] album → evento (link inverso)`, (await p.$$('a[href="evento.html?slug=memorial-2025"]')).length === 1);
    await p.goto(B + 'eventi.html'); await p.screenshot({ path: `${OUT}a2-${vp}-eventi.png`, fullPage: true }); await noOverflow('eventi');
    ok(`[${vp}] eventi: stato vuoto "Prossimi"`, await p.isVisible('.empty'));

    // 4. Home → foto → catalogo → album → lightbox → selezione
    await p.goto(B + 'index.html'); await p.click('.stack'); await p.waitForLoadState();
    ok(`[${vp}] home → catalogo foto`, p.url().endsWith('foto.html') && (await p.$$('.acard')).length === 3);
    await p.screenshot({ path: `${OUT}a2-${vp}-foto-catalogo.png`, fullPage: true }); await noOverflow('catalogo');
    await p.click('.acard a[href="album.html?slug=demo-album-grande"]'); await p.waitForLoadState();
    ok(`[${vp}] album grande: 48 caricate`, (await p.$$('.tile')).length === 48);
    await p.click('#load-more'); ok(`[${vp}] album grande: "Carica altre"`, (await p.$$('.tile')).length === 96);
    await p.goto(B + 'album.html?slug=memorial-2025');
    await p.click('#select-mode'); for (const i of [0, 3, 5]) await p.locator('.tile__open').nth(i).click();
    ok(`[${vp}] selezione multipla: 3`, (await p.textContent('#count')) === '3' && await p.isVisible('#actionbar'));
    await p.screenshot({ path: `${OUT}a2-${vp}-album-selezione.png` });
    await p.click('#zip'); await p.waitForTimeout(1600);
    ok(`[${vp}] ZIP simulato segnalato`, /SIMULAZIONE/.test(await p.textContent('#toast')));
    await p.click('#clear'); await p.click('#select-mode');
    await p.locator('.tile__open').nth(2).click(); await p.waitForTimeout(200);
    ok(`[${vp}] lightbox aperto con focus`, await p.evaluate(() => !document.getElementById('lb').hidden && document.activeElement.id === 'lb-close'));
    await p.keyboard.press('ArrowRight'); ok(`[${vp}] lightbox: freccia`, (await p.textContent('#lb-pos')).startsWith('4 /'));
    await p.screenshot({ path: `${OUT}a2-${vp}-album-lightbox.png` });
    await p.keyboard.press('Escape'); ok(`[${vp}] lightbox: Esc e focus restituito`, await p.evaluate(() => document.getElementById('lb').hidden && document.activeElement.dataset.i === '3'));
    await p.goto(B + 'album.html?slug=demo-album-vuoto'); ok(`[${vp}] album vuoto: stato vuoto`, await p.isVisible('.empty'));
    await p.goto(B + 'album.html?slug=demo-non-pubblicato'); ok(`[${vp}] album non pubblicato: non disponibile`, (await p.textContent('h1')).includes('non disponibile'));
    await p.goto(B + 'evento.html?slug=inesistente'); ok(`[${vp}] slug inesistente: pagina non trovato`, (await p.textContent('h1')).includes('non trovato'));

    // menu mobile e link morti
    if (vp === 'mobile') {
      await p.goto(B + 'eventi.html'); await p.click('.nav__toggle'); await p.waitForTimeout(300);
      ok('[mobile] menu aperto con focus sulla prima voce', await p.evaluate(() => document.querySelector('#nav-menu').classList.contains('is-open') && document.activeElement.closest('#nav-menu') !== null));
      await p.screenshot({ path: `${OUT}a2-mobile-menu.png` });
      await p.keyboard.press('Escape'); ok('[mobile] menu: Esc chiude', await p.evaluate(() => !document.querySelector('#nav-menu').classList.contains('is-open')));
    }
    ok(`[${vp}] nessun errore JavaScript`, errs.length === 0, errs.join(' | '));
    await ctx.close();
  }
  // reduced motion
  const ctx = await b.newContext({ viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' }); const p = await ctx.newPage();
  await p.goto(B + 'index.html?intro'); await p.waitForTimeout(100);
  ok('[reduced-motion] nessuna intro, nessun blocco', await p.evaluate(() => document.querySelector('.hero').classList.contains('is-done') && !document.documentElement.classList.contains('intro-lock')));
  // controllo link morti su tutte le pagine
  const pages = ['index.html', 'beneficenza.html', 'beneficenza-articolo.html?slug=donazione-spdc-scorrano-2025', 'eventi.html', 'evento.html?slug=memorial-2025', 'foto.html', 'album.html?slug=memorial-2025', 'privacy.html'];
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
  await b.close();
  console.log(results.join('\n'));
  console.log(`\n${results.filter(r => r.startsWith('PASS')).length}/${results.length} PASS`);
  process.exitCode = results.some(r => r.startsWith('FAIL')) ? 1 : 0;
})();
