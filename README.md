# Il Tuo Sorriso, il Nostro Ricordo — sito ufficiale

Sito dell'associazione di volontariato di Martano (LE).

**Stato: Fase A.3 (correzione) — contenuti reali documentati** (branch `fix/integrazione-contenuti-mockup`). Questo repository contiene specifiche e mockup da approvare. Il codice applicativo (React + Node.js) verrà scritto solo dopo l'approvazione dei mockup.

## Documenti

| File | Contenuto |
|---|---|
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
| Revisione: carosello a più card (DEMO) | http://localhost:8765/mockup/index.html?demo=carosello#beneficenza |
| Revisione: album fittizi di prova | http://localhost:8765/mockup/foto.html?demo=1 |

File principali in `design/mockup/`: `data.js` (catalogo contenuti), `site.js` (navbar, footer, schede comuni), `mockup.js` (Home), `pages.js` (pagine interne), `tokens.css`, `mockup.css`, `pages.css`.

Test automatici: `design/tests/e2e.js` (istruzioni in testa al file). Screenshot in `design/screenshots/` (prefisso `a2-` per la Fase A.2, `a3-` per la Fase A.3).
