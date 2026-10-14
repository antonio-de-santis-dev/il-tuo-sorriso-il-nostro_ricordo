# Revisione dei mockup (UX, accessibilità, prestazioni)

Verifica fatta con Playwright (Chromium) a 1440×900 e 390×844 (iPhone, touch). Screenshot in `design/screenshots/`.

## Verificato

- Nessun errore JavaScript, **nessuno scroll orizzontale** su Home e album, desktop e mobile.
- Intro: l'ultimo fotogramma coincide con la Hero (nessuno stacco). Con `prefers-reduced-motion` l'intro non parte.
- Navbar: trasparente sulla Hero, solida dopo; voce attiva aggiornata durante lo scroll; menu mobile con `Esc` e focus.
- Contrasti dei testi ≥ 4,5:1 (tabella in `DESIGN.md`).
- Target touch ≥ 44 px (bottoni, caselle di selezione, frecce).
- Lightbox: focus intrappolato e restituito, tastiera, swipe.

## Problemi trovati e già corretti

| Problema | Correzione |
|---|---|
| Su mobile la metà inferiore della Hero era un fondo sfocato confuso | Banda verde scuro con luogo e CTA, illustrazione a tutta larghezza in alto |
| Le comparse delle sezioni annullavano la rotazione delle foto | Comparsa con la proprietà `translate`, separata da `transform` |
| Il badge “MOCKUP” copriva la CTA della Hero | Spostato in una linguetta verticale a destra |

## Aperti (da gestire in Fase B o con i contenuti veri)

1. **Nitidezza della Hero su desktop retina** (file a 1254 px). Serve l'originale più grande.
2. **Safari iOS reale non ancora testato**: WebKit di Playwright in Fase B; da controllare `clip-path` animato, `mask-composite` e `backdrop-filter`.
3. ~~**Carosello con una sola iniziativa**~~: risolto in Fase A.2 (frecce e puntini nascosti).
4. **Font**: in produzione self-hosted con `font-display: swap` e preload di Anton, per evitare salti di layout nei titoli.
5. **Sfocatura del fondo Hero** (`filter: blur`) può pesare sui PC lenti: in produzione usare una versione già sfocata e piccola dell'immagine (pochi KB).
6. **Download su iPhone**: lo ZIP finisce in File, non in Foto. Avviso nella barra di selezione.
7. **Testi**: tutti quelli marcati PROVVISORIO vanno scritti e approvati dall'associazione.

---

# Fase A.2 — completamento del prototipo (14/10/2026)

Branch `feature/completamento-mockup`. Test: `design/tests/e2e.js` (Playwright, Chromium), risultato **90/90 PASS** a 1440×900 e 390×844, più controllo di overflow ed errori a 360×740, 768×1024, 1024×768, 844×390 (orizzontale), 1280×800, 1920×1080: nessun problema.

## Prima / dopo

| Funzionalità | Prima (Fase A) | Dopo (Fase A.2) |
|---|---|---|
| Intro | Animazione; la pagina si poteva scorrere e usare durante l'intro | Stessa animazione. Bloccati: rotella, touch, tasti di scorrimento, scrollbar, ancore, navbar, link, focus. Unico controllo attivo: **Salta introduzione** (anche `Esc`). Sblocco completo a fine animazione, con skip, su errore dell'immagine, dopo un timeout o con la rete di sicurezza a 6 s. Nessun blocco con reduced motion, con intro già vista o arrivando con un'ancora |
| Beneficenza (Home) | 1 card reale + 2 segnaposto, badge “3.000 €”, link `#` | 1 card reale dal catalogo, **nessun importo**, frecce e puntini nascosti con una sola card, “Scopri di più” verso l'articolo |
| Archivio e articolo beneficenza | Solo wireframe testuale | `beneficenza.html` e `beneficenza-articolo.html?slug=…`: briciole di pane, scheda “In breve”, fonti esterne, collegamento all'evento, ritorno all'archivio, stato vuoto, pagina “non trovato” |
| Eventi | Card in Home, link `#`, card segnaposto | `eventi.html` (Prossimi con stato vuoto / Passati) e `evento.html?slug=…` con dati da confermare evidenziati, CTA “Galleria foto evento” solo se l'album è pubblicato, iniziativa collegata |
| Foto | Home → direttamente un album | Home → **catalogo `foto.html`** → `album.html?slug=…`. Album per evento, album fittizi etichettati, album vuoto, album non pubblicato, caricamento a blocchi (“Carica altre”), limite 50 foto per ZIP con avviso, avanzamento ZIP **simulato** e dichiarato, collegamento album ↔ evento |
| Navbar / footer | Copiati in ogni file | Generati da `site.js` (una sola fonte); voce attiva corretta anche nelle pagine interne |
| Link | Diversi `href="#"` | Nessun `href="#"`, nessun link interno rotto (verificato dai test) |
| Privacy | Link `#` | `privacy.html` segnaposto dichiarato |

## Problemi trovati con i test e corretti

1. Durante l'intro un cambio di ancora via script spostava la pagina → la pagina viene riportata in cima finché l'intro è in corso.
2. Su mobile la seconda stampa delle card album sporgeva di 5 px → contenuta.
3. Nella pagina evento la locandina ereditava la griglia della card e diventava enorme su desktop → corretto.
4. Favicon mancante (404 in console) → aggiunta.

## Limiti dei test

- **Firefox e WebKit/Safari non testati**: in questo ambiente è installato solo Chromium e non è possibile scaricare altri browser. Restano da provare su Safari iOS reale (`clip-path` animato, `inert`, `overflow: hidden` durante l'intro).
- I test del blocco rallentano l'animazione con il DevTools Protocol, per avere il tempo di provare scroll e tastiera mentre l'intro è ancora in corso.
