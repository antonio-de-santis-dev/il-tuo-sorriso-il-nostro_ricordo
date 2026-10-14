# Report — Mockup completo V1

> Branch `mokup/copmpletoV1` (nome usato esattamente come richiesto). 14/10/2026. Nessun merge su altri branch. React, Node.js e Google Drive non iniziati.

## 1. Branch usato come base
`fix/ultima`, il più aggiornato: contiene tutti gli altri branch (`feature/completamento-mockup`, `feature/contenuti-reali-mockup`, `fix/integrazione-contenuti-mockup`, `feature/integrazione-fonti-verificate`), verificato con `git merge-base --is-ancestor`. Al momento della creazione non c'erano modifiche locali non salvate.

## 2. Commit di partenza
`8cd89b2` — *Carosello Beneficenza: vero carosello sempre attivo nella Home*.

## 3. Differenze tra le versioni della galleria

Confronto fra `feature/completamento-mockup` (`68b3b42`) e il commit di partenza (`8cd89b2`):

| Elemento | `feature/completamento-mockup` | Prima del ripristino |
|---|---|---|
| `foto.html`, `album.html` | — | **identici** (nessuna differenza) |
| CSS della galleria (`pages.css`: card album, griglia, barra selezione, visualizzatore) | — | **identico** (solo regole aggiunte per altre sezioni) |
| Card nel catalogo | 3 in un'unica griglia: Memorial + 2 album di prova | 1 sola (Memorial) |
| Copertina del Memorial | stampa colorata | stampa a righe grigie, “vuota” |
| Etichetta e testo del Memorial | “Foto dimostrative” · “21 agosto 2025 · 48 foto (valore dimostrativo)” | “Anteprima · foto non ancora caricate” · “Foto non ancora caricate” |
| Album di prova | nella griglia principale | nascosti, visibili solo con `foto.html?demo=1` in un riquadro tratteggiato |
| Pagina album Memorial | 48 foto segnaposto, “48 foto” | nessuna foto, stato vuoto “in anteprima” |

**Causa:** la grafica non era cambiata. Erano cambiati i **dati** degli album e il **codice che compone il catalogo** (`data.js`, `site.js` → card album, `pages.js` → catalogo), a seguito delle richieste di correzione dei contenuti.

## 4. Elementi grafici ripristinati
- Catalogo con le **3 card in griglia**, nell'ordine originale (album dell'evento per primo).
- **Copertine colorate** delle card (stampe sovrapposte).
- **Etichette e testi** originali delle card (“Foto dimostrative”, “Album fittizio di prova”, “… foto (valore dimostrativo)”).
- Pagina album del Memorial con la **griglia di 48 foto segnaposto** e l'intestazione “48 foto”.

**Verifica:** gli screenshot di catalogo e album Memorial sono **identici al pixel** a quelli di `feature/completamento-mockup` a 1440, 768 e 390 px. Inoltre la funzione della card album e il ramo del catalogo in `pages.js` sono identici riga per riga al codice originale.

## 5. Funzionalità preservate
- **Galleria:** catalogo, apertura dei singoli album, collegamenti evento ↔ album, griglia, visualizzatore a schermo intero con frecce/swipe/tastiera, selezione singola e multipla, download simulati dichiarati, caricamento a blocchi (“Carica altre”), album vuoto, album non pubblicato, smartphone.
- **Beneficenza:** carosello con 3 card (1 reale + 2 DEMO), frecce, indicatori cliccabili, animazione orizzontale, swipe, tastiera; archivio e articolo.
- **Eventi:** card con locandine, archivio per anno, pagine di dettaglio, collegamenti a iniziative e album.
- Hero, intro, navbar, Chi siamo, Sponsor, Ringraziamenti, footer: invariati.

## 6. File modificati
| File | Modifica |
|---|---|
| `design/mockup/data.js` | Solo l'elenco `albums`, riportato a quello di `feature/completamento-mockup` |
| `design/mockup/site.js` | Solo la funzione `albumCard`, identica all'originale |
| `design/mockup/pages.js` | Solo il catalogo (`foto`, identico all'originale) e il testo “N foto” nell'intestazione dell'album |
| `design/tests/e2e.js` | Controlli della galleria aggiornati alla versione ripristinata |
| `docs/REPORT_MOCKUP_COMPLETOV1.md`, `README.md` | Documentazione |
| `design/screenshots/v1-*`, `ult-*` | Screenshot |

Non modificati: `foto.html`, `album.html`, `pages.css`, `mockup.css`, `sezioni.css`, `sezioni.js`, `index.html`, `mockup.js`.

## 7. Screenshot
In `design/screenshots/`:
- `v1-galleria-riferimento-completamento-mockup-{desktop,mobile}.png`: la versione da ripristinare;
- `v1-galleria-prima-del-ripristino-{desktop,mobile}.png`: la versione di `fix/ultima`;
- `v1-galleria-ripristinata-{desktop,mobile}.png`: il risultato (identico al riferimento);
- `carosello-{desktop,mobile}-card{1,2,3}.png`: il carosello Beneficenza;
- `ult-*`: le altre pagine, generate dai test.

## 8. Test effettuati e risultati
Tutti eseguiti realmente con Playwright su Chromium, il 14/10/2026.

| Test | Risultato |
|---|---|
| Confronto al pixel della galleria con `feature/completamento-mockup` (catalogo + album Memorial, 3 viewport) | **6/6 identici** |
| Confronto HTML + stili calcolati delle altre sezioni con il commit di partenza (Hero, navbar, Chi siamo, Beneficenza, Eventi, Foto in Home, Sponsor, Grazie, footer, archivi, articolo, eventi, privacy; 3 viewport) | **48/51 identici**; i 3 diversi sono la pagina evento Memorial: cambia solo il testo del pulsante galleria (vedi §9) |
| `design/tests/e2e.js` (desktop 1440, tablet 768, smartphone 390): intro, navbar, Home → catalogo, card → album corretto, album → evento, evento → album, visualizzatore, selezione, ZIP simulato, album vuoto/non pubblicato, carosello, eventi, link interni, errori JS, scroll orizzontale, immagini, prestazioni | **209/209** |
| `design/tests/carosello.js` (desktop e smartphone, apertura normale di `index.html`) | **59/59** |
| Apertura dei file con doppio clic (`file://`) di tutte le pagine | nessun errore |

**Non eseguiti:** test su WebKit/Safari e Firefox (non installati nell'ambiente); nessun test su dispositivi fisici.

## 9. Problemi residui e decisioni da confermare
1. **Pagina evento Memorial:** il pulsante “Galleria foto evento” ora dice “48 foto · segnaposto” invece di “anteprima · foto non ancora caricate”. Il codice degli Eventi non è stato toccato: il testo viene dai dati dell'album, e lasciarlo invariato sarebbe stato falso.
2. **Contenuti dimostrativi visibili al pubblico:** con il ripristino, l'album del Memorial mostra 48 foto segnaposto (etichettate “Foto dimostrative”) e gli album di prova tornano nel catalogo. È la versione richiesta per la revisione grafica. Prima della pubblicazione, gli album fittizi andranno tolti e il Memorial riempito con le foto reali.
3. **`foto.html?demo=1`** non serve più (gli album di prova sono di nuovo nel catalogo); il collegamento è stato tolto dal README.
4. Safari/iOS non verificato.
