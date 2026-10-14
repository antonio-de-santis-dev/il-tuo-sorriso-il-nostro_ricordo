# Il Tuo Sorriso, il Nostro Ricordo — sito ufficiale

Sito dell'associazione di volontariato di Martano (LE).

**Stato: Mockup completo V1, pronto per la revisione finale** (branch `mokup/copmpletoV1`). Report: [docs/REPORT_MOCKUP_COMPLETOV1.md](docs/REPORT_MOCKUP_COMPLETOV1.md). Questo repository contiene specifiche e mockup da approvare. Il codice applicativo (React + Node.js) verrà scritto solo dopo l'approvazione dei mockup.

## Documenti

| File | Contenuto |
|---|---|
| [docs/REPORT_MOCKUP_COMPLETOV1.md](docs/REPORT_MOCKUP_COMPLETOV1.md) | **Mockup completo V1**: base, galleria ripristinata, test |
| [docs/PRODUCT.md](docs/PRODUCT.md) | Obiettivi, utenti, fatti accertati, criticità, dati mancanti |
| [docs/DESIGN.md](docs/DESIGN.md) | Design system: colori, contrasti, font, componenti, movimento |
| [docs/HERO_ANALISI.md](docs/HERO_ANALISI.md) | Analisi dei due file della Hero e animazione d'ingresso |
| [docs/SITEMAP_E_FLUSSI.md](docs/SITEMAP_E_FLUSSI.md) | Sitemap, flussi utente, wireframe delle pagine interne |
| [docs/ARCHITETTURA_PROPOSTA.md](docs/ARCHITETTURA_PROPOSTA.md) | Bozza tecnica: contenuti, Google Drive, API |
| [docs/SKILL_E_TOOL.md](docs/SKILL_E_TOOL.md) | Esame delle skill e dei tool proposti |
| [docs/REVISIONE_MOCKUP.md](docs/REVISIONE_MOCKUP.md) | Revisione UX, accessibilità e prestazioni; prima/dopo della Fase A.2 |
| [docs/INVENTARIO_CONTENUTI.md](docs/INVENTARIO_CONTENUTI.md) | **Inventario contenuti di riferimento**: fonti, cosa è integrato e cosa no, cosa serve dal committente |
| [docs/RICERCA_FONTI_EVENTI_BENEFICENZA.md](docs/RICERCA_FONTI_EVENTI_BENEFICENZA.md) | Inventario fonti di eventi e beneficenza, stato di verifica (Fase A.3) |
| [docs/ASSET_DA_RICHIEDERE.md](docs/ASSET_DA_RICHIEDERE.md) | Foto, locandine, conferme e autorizzazioni da chiedere all'associazione |
| [docs/REPORT_CONTENUTI_MOCKUP.md](docs/REPORT_CONTENUTI_MOCKUP.md) | Report della Fase A.3: file, card, immagini, test, limiti |
| [docs/FONTI_CONTENUTI_MOCKUP.md](docs/FONTI_CONTENUTI_MOCKUP.md) | Fonti della Fase A.2 (superato dal documento di ricerca) |

## Prototipo

Sito statico HTML/CSS/JS, senza dipendenze e **senza bisogno di server**: basta aprire `design/mockup/index.html` con un doppio clic (o trascinarlo nel browser). Tutti i link funzionano anche così.

Il server locale serve **solo** per i test automatici (`design/tests/e2e.js`). Gli indirizzi qui sotto valgono in quel caso; aprendo i file direttamente, la parte dopo `/mockup/` è la stessa.

| Pagina | URL (con server di test) |
|---|---|
| Home | http://localhost:8765/mockup/index.html (`?intro` per rivedere l'animazione) |
| Beneficenza | http://localhost:8765/mockup/beneficenza.html |
| Articolo | http://localhost:8765/mockup/beneficenza-articolo.html?slug=donazione-spdc-scorrano-2025 |
| Eventi | http://localhost:8765/mockup/eventi.html |
| Evento | http://localhost:8765/mockup/evento.html?slug=memorial-2025 |
| Catalogo foto | http://localhost:8765/mockup/foto.html |
| Album | http://localhost:8765/mockup/album.html?slug=memorial-2025 |
| Privacy | http://localhost:8765/mockup/privacy.html |
| Revisione: bozze eventi | http://localhost:8765/mockup/eventi.html?bozze=1 |
| Anteprima carosello in modalità produzione (solo iniziative verificate) | http://localhost:8765/mockup/index.html?carosello=produzione#beneficenza |

File principali in `design/mockup/`: `data.js` (catalogo contenuti), `site.js` (navbar, footer, schede comuni), `mockup.js` (Home), `pages.js` (pagine interne), `tokens.css`, `mockup.css`, `pages.css`.

Test automatici: `design/tests/e2e.js` (istruzioni in testa al file). Screenshot in `design/screenshots/` (prefisso `a2-` per la Fase A.2, `a3-` per la Fase A.3).

## Branch `fix/ultima` — solo Beneficenza ed Eventi

Modifiche visive e funzionali **solo** a Beneficenza ed Eventi (Home e pagine interne). Hero, intro, navbar, Chi siamo, galleria fotografica, Sponsor, Ringraziamenti e footer sono **invariati**: verificato confrontando HTML e stili calcolati di ogni elemento (54 blocchi a 1440/768/390 px, 0 differenze).

- **Carosello Beneficenza (sempre attivo aprendo `index.html`):** 3 card — 1 reale (Scorrano) + 2 marcate **DEMO**, senza articolo. Freccia precedente a sinistra e successiva a destra (su smartphone ai lati degli indicatori, sotto la card), 3 indicatori cliccabili, contatore, navigazione circolare (dopo la terza si torna alla prima), swipe, tastiera (← → Inizio Fine), trascinamento col mouse; la card successiva si intravede.
  - Modalità in `design/mockup/data.js` → `carousel.mode`: `'mockup'` (predefinita: reali + DEMO, controlli sempre visibili) o `'produzione'` (solo iniziative verificate; frecce e indicatori nascosti solo se la card è una). Anteprima produzione: `index.html?carosello=produzione`.
  - Test dedicato: `node design/tests/carosello.js` (apre i file direttamente) → 59/59; screenshot `design/screenshots/carosello-*`.
- **Card:** le illustrazioni sono intere, mai tagliate.
- **Eventi:** locandine come stampe appese (cornice e nastro), ingrandibili con un clic; etichette tipo/stato; luogo con icona; alternanza sinistra/destra anche fra gli anni.
- **Archivi:** riepilogo, raggruppamento per anno, salto rapido all'anno.
- **Dettaglio evento:** scheda “In breve” e navigazione evento precedente/successivo.
- I link verso la galleria fotografica sono invariati.

Nuovi file isolati: `design/mockup/sezioni.css` e `sezioni.js`, caricati solo da index, beneficenza, beneficenza-articolo, eventi, evento. File della galleria non toccati.

Test: `node design/tests/e2e.js` → 203/203 e `node design/tests/carosello.js` → 59/59 su Chromium, desktop, tablet e mobile (WebKit non disponibile in questo ambiente). Screenshot `design/screenshots/ult-*`.

## Branch `mokup/copmpletoV1` — mockup completo V1

Versione consolidata: tutto il lavoro di `fix/ultima` (carosello Beneficenza, Eventi, archivi, articoli) + **galleria fotografica ripristinata** all'interfaccia di `feature/completamento-mockup` (catalogo con 3 album in griglia, copertine colorate, album Memorial con 48 foto segnaposto). Screenshot del catalogo identici al pixel all'originale. Dettagli e test: [docs/REPORT_MOCKUP_COMPLETOV1.md](docs/REPORT_MOCKUP_COMPLETOV1.md).
