/* Test del carosello Beneficenza (Home aperta normalmente, senza parametri).
   Uso:  npm i -D playwright && npx playwright install chromium
         node design/tests/carosello.js          (apre i file direttamente, nessun server)
   Variabile opzionale: CHROMIUM_PATH. Screenshot in design/screenshots/carosello-*. */
const path = require('path');
const { chromium } = require('playwright');
const HOME = 'file://' + path.resolve(__dirname, '..', 'mockup', 'index.html');
const OUT = path.join(__dirname, '..', 'screenshots');
const results = [];
const ok = (name, cond, extra = '') => results.push(`${cond ? 'PASS' : 'FAIL'}  ${name}${extra && !cond ? ' — ' + extra : ''}`);

async function open(b, opts, query = '') {
  const ctx = await b.newContext(opts); const p = await ctx.newPage();
  const errs = []; p.on('pageerror', e => errs.push(e.message));
  await p.goto(HOME + query);
  await p.locator('.hero__skip').click({ timeout: 3000 }).catch(() => {}); // salta l'intro
  await p.evaluate(() => document.fonts.ready);
  await p.evaluate(() => scrollTo({ top: document.getElementById('beneficenza').offsetTop - 72, behavior: 'instant' }));
  await p.waitForTimeout(600);
  return { ctx, p, errs };
}
const state = p => p.evaluate(() => {
  const t = document.getElementById('charity-track'), cards = [...t.querySelectorAll('.ccard')];
  const active = cards.findIndex(c => c.classList.contains('is-active'));
  const r = cards[active]?.getBoundingClientRect(), tr = t.getBoundingClientRect();
  return { n: cards.length, active, count: document.querySelector('.carousel-count').textContent.replace(/\s/g, ''),
    dots: [...document.querySelectorAll('.dots__btn')].map(d => d.getAttribute('aria-current')),
    aligned: r ? Math.abs(r.left - tr.left - parseFloat(getComputedStyle(t).scrollPaddingLeft)) < 3 : false,
    pageY: scrollY };
});
const settle = p => p.waitForTimeout(1000);
const boxes = (p, sels) => p.evaluate(sels => sels.map(s => { const r = document.querySelector(s).getBoundingClientRect(); return { s, l: r.left, t: r.top, r: r.right, b: r.bottom, w: r.width, h: r.height }; }), sels);
const overlap = (a, b) => a.l < b.r && b.l < a.r && a.t < b.b && b.t < a.b;

(async () => {
  const b = await chromium.launch(process.env.CHROMIUM_PATH ? { executablePath: process.env.CHROMIUM_PATH } : {});
  for (const [vp, opts] of [['desktop', { viewport: { width: 1440, height: 900 } }], ['mobile', { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 }]]) {
    const { ctx, p, errs } = await open(b, opts);
    let s = await state(p);
    ok(`[${vp}] apertura normale: 3 card nel carosello`, s.n === 3, `card=${s.n}`);
    ok(`[${vp}] card 1 reale (Scorrano) con link all'articolo`, await p.locator('#charity-track .ccard').first().locator('a[href*="donazione-spdc-scorrano-2025"]').count() === 1);
    ok(`[${vp}] card 2 e 3 marcate DEMO, senza link ad articoli`, await p.evaluate(() => { const c = [...document.querySelectorAll('#charity-track .ccard')].slice(1); return c.length === 2 && c.every(x => x.classList.contains('ccard--demo') && /DEMO/.test(x.innerText) && !x.querySelector('a')); }));
    ok(`[${vp}] frecce precedente/successiva visibili`, await p.isVisible('.carrow--prev') && await p.isVisible('.carrow--next'));
    ok(`[${vp}] 3 indicatori visibili e cliccabili`, (await p.$$('.dots__btn')).length === 3 && await p.isVisible('.dots__btn >> nth=2'));
    const [bp, bn, bt] = await boxes(p, ['.carrow--prev', '.carrow--next', '#charity-track']);
    ok(`[${vp}] freccia precedente a sinistra, successiva a destra`, bp.l < bt.l + bt.w / 2 && bn.r > bt.l + bt.w / 2 && bp.l < bn.l);
    ok(`[${vp}] prima card mostrata e allineata, indicatore 1 attivo`, s.active === 0 && s.aligned && s.count === '01/03' && s.dots.join() === 'true,false,false', JSON.stringify(s));
    const peek = await p.evaluate(() => { const c = document.querySelectorAll('#charity-track .ccard')[1].getBoundingClientRect(); return c.left < innerWidth && c.right > innerWidth; });
    ok(`[${vp}] si intravede la card successiva`, peek);
    // nessuna sovrapposizione: frecce e indicatori non coprono il testo della card attiva
    const [body, nav] = await boxes(p, ['.ccard.is-active .ccard__body', '.cnav']);
    ok(`[${vp}] frecce e indicatori non coprono il testo della card`, !overlap(bp, body) && !overlap(bn, body) && !overlap(nav, body));
    ok(`[${vp}] nessun contenuto della card tagliato`, await p.evaluate(() => [...document.querySelectorAll('#charity-track .ccard__body')].every(el => el.scrollWidth <= el.clientWidth + 1 && el.scrollHeight <= el.clientHeight + 1)));
    ok(`[${vp}] nessuno scroll orizzontale della pagina`, await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth));
    await p.locator('#beneficenza').screenshot({ path: `${OUT}/carosello-${vp}-card1.png` });

    await p.click('.carrow--next'); await settle(p); s = await state(p);
    ok(`[${vp}] SUCCESSIVA → card 2, indicatore 2`, s.active === 1 && s.aligned && s.count === '02/03' && s.dots.join() === 'false,true,false', JSON.stringify(s));
    await p.locator('#beneficenza').screenshot({ path: `${OUT}/carosello-${vp}-card2.png` });
    await p.click('.carrow--next'); await settle(p); s = await state(p);
    ok(`[${vp}] SUCCESSIVA → card 3, indicatore 3`, s.active === 2 && s.aligned && s.count === '03/03' && s.dots.join() === 'false,false,true', JSON.stringify(s));
    await p.locator('#beneficenza').screenshot({ path: `${OUT}/carosello-${vp}-card3.png` });
    await p.click('.carrow--next'); await settle(p); s = await state(p);
    ok(`[${vp}] SUCCESSIVA dopo la terza → torna alla prima`, s.active === 0 && s.aligned && s.count === '01/03', JSON.stringify(s));
    await p.click('.carrow--prev'); await settle(p); s = await state(p);
    ok(`[${vp}] PRECEDENTE dalla prima → terza`, s.active === 2 && s.aligned && s.count === '03/03', JSON.stringify(s));
    await p.click('.carrow--prev'); await settle(p); s = await state(p);
    ok(`[${vp}] PRECEDENTE → seconda`, s.active === 1 && s.aligned && s.count === '02/03', JSON.stringify(s));
    await p.locator('.dots__btn').nth(0).click(); await settle(p); s = await state(p);
    ok(`[${vp}] indicatore 1 → prima card`, s.active === 0 && s.aligned && s.dots.join() === 'true,false,false', JSON.stringify(s));
    await p.locator('.dots__btn').nth(2).click(); await settle(p); s = await state(p);
    ok(`[${vp}] indicatore 3 → terza card`, s.active === 2 && s.aligned && s.dots.join() === 'false,false,true', JSON.stringify(s));

    // la pagina non si sposta: 5 cambi card con clic diretti (senza lo scorrimento automatico di Playwright)
    const y0 = await p.evaluate(() => scrollY);
    for (const sel of ['.carrow--next', '.carrow--next', '.carrow--next', '.carrow--prev']) { await p.evaluate(q => document.querySelector(q).click(), sel); await settle(p); }
    await p.evaluate(() => document.querySelectorAll('.dots__btn')[1].click()); await settle(p);
    ok(`[${vp}] la pagina non si sposta durante i cambi card`, (await p.evaluate(() => scrollY)) === y0, `${y0} → ${await p.evaluate(() => scrollY)}`);

    // tastiera
    await p.locator('.dots__btn').nth(0).click(); await settle(p);
    await p.focus('#charity-track');
    await p.keyboard.press('ArrowRight'); await settle(p); s = await state(p);
    ok(`[${vp}] tastiera → avanti`, s.active === 1 && s.aligned, JSON.stringify(s));
    await p.keyboard.press('ArrowLeft'); await settle(p); s = await state(p);
    ok(`[${vp}] tastiera ← indietro`, s.active === 0 && s.aligned, JSON.stringify(s));
    await p.keyboard.press('End'); await settle(p); s = await state(p);
    ok(`[${vp}] tastiera Fine → ultima`, s.active === 2 && s.aligned, JSON.stringify(s));
    await p.keyboard.press('Home'); await settle(p); s = await state(p);
    ok(`[${vp}] tastiera Inizio → prima`, s.active === 0 && s.aligned, JSON.stringify(s));
    await p.focus('.carrow--next'); await p.keyboard.press('Enter'); await settle(p); s = await state(p);
    ok(`[${vp}] freccia SUCCESSIVA attivabile da tastiera (Invio)`, s.active === 1, JSON.stringify(s));
    await p.locator('.dots__btn').nth(0).click(); await settle(p);

    // swipe reale (gesto touch del browser)
    if (vp === 'mobile') {
      // swipe reale: eventi touch del dito (giù → movimento → su)
      const cdp = await ctx.newCDPSession(p);
      await p.evaluate(() => { const t = document.getElementById('charity-track'); scrollTo({ top: t.getBoundingClientRect().top + scrollY - 90, behavior: 'instant' }); }); await p.waitForTimeout(300);
      const swipe = async (x0, x1, y) => {
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchStart', touchPoints: [{ x: x0, y }] });
        for (let i = 1; i <= 12; i++) { await cdp.send('Input.dispatchTouchEvent', { type: 'touchMove', touchPoints: [{ x: x0 + (x1 - x0) * i / 12, y }] }); await p.waitForTimeout(16); }
        await cdp.send('Input.dispatchTouchEvent', { type: 'touchEnd', touchPoints: [] });
      };
      const yS = await p.evaluate(() => scrollY);
      await swipe(320, 80, 240); await settle(p); s = await state(p);
      ok(`[${vp}] swipe a sinistra → card 2`, s.active === 1 && s.aligned && s.count === '02/03', JSON.stringify(s));
      await swipe(320, 80, 240); await settle(p); s = await state(p);
      ok(`[${vp}] swipe a sinistra → card 3`, s.active === 2 && s.aligned && s.count === '03/03', JSON.stringify(s));
      await swipe(80, 320, 240); await settle(p); s = await state(p);
      ok(`[${vp}] swipe a destra → card 2`, s.active === 1 && s.aligned && s.count === '02/03', JSON.stringify(s));
      ok(`[${vp}] lo swipe non sposta la pagina`, s.pageY === yS, `${yS} → ${s.pageY}`);
    } else {
      // desktop: trascinamento col mouse
      const t = await p.locator('#charity-track').boundingBox();
      await p.mouse.move(t.x + t.width * .6, t.y + 150); await p.mouse.down(); await p.mouse.move(t.x + t.width * .2, t.y + 150, { steps: 8 }); await p.mouse.up();
      await settle(p); s = await state(p);
      ok(`[${vp}] trascinamento col mouse → card 2`, s.active === 1 && s.aligned, JSON.stringify(s));
    }
    // ridimensionamento: resta sulla stessa card
    await p.locator('.dots__btn').nth(1).click(); await settle(p);
    await p.setViewportSize({ width: opts.viewport.width - 40, height: opts.viewport.height }); await settle(p); s = await state(p);
    ok(`[${vp}] ridimensionando resta sulla stessa card`, s.active === 1 && s.aligned, JSON.stringify(s));
    ok(`[${vp}] nessun errore JavaScript`, errs.length === 0, errs.join(' | '));
    await ctx.close();
  }

  // Modalità produzione futura: solo iniziative verificate; una sola card → controlli nascosti
  const { ctx, p } = await open(b, { viewport: { width: 1440, height: 900 } }, '?carosello=produzione');
  ok('[produzione] solo la card reale, frecce e indicatori nascosti', (await p.$$('#charity-track .ccard')).length === 1 && !(await p.isVisible('.carrow--next')) && !(await p.isVisible('.cnav')));
  await ctx.close();

  // Movimento ridotto: cambio card senza animazione, comunque funzionante
  const rm = await open(b, { viewport: { width: 1440, height: 900 }, reducedMotion: 'reduce' });
  await rm.p.click('.carrow--next'); await rm.p.waitForTimeout(150); const sr = await state(rm.p);
  ok('[reduced-motion] cambio card immediato', sr.active === 1 && sr.aligned, JSON.stringify(sr));
  await rm.ctx.close();

  await b.close();
  console.log(results.join('\n'));
  const pass = results.filter(r => r.startsWith('PASS')).length;
  console.log(`\n${pass}/${results.length} PASS`);
  process.exitCode = pass === results.length ? 0 : 1;
})();
