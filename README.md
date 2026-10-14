# Il Tuo Sorriso, il Nostro Ricordo — sito ufficiale

Sito dell'associazione di volontariato di Martano (LE).

**Stato: Fase A.2 — prototipo navigabile completo** (branch `feature/completamento-mockup`). Questo repository contiene specifiche e mockup da approvare. Il codice applicativo (React + Node.js) verrà scritto solo dopo l'approvazione dei mockup.

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
| [docs/FONTI_CONTENUTI_MOCKUP.md](docs/FONTI_CONTENUTI_MOCKUP.md) | Fonti, grado di verifica dei contenuti, asset mancanti |

## Prototipo

Sito statico HTML/CSS/JS, senza dipendenze. Va servito da un server locale (i link sono relativi):

```bash
npx serve -l 8765 design          # oppure: python3 -m http.server 8765 --directory design
```

| Pagina | URL locale |
|---|---|
| Home | http://localhost:8765/mockup/index.html (`?intro` per rivedere l'animazione) |
| Beneficenza | http://localhost:8765/mockup/beneficenza.html |
| Articolo | http://localhost:8765/mockup/beneficenza-articolo.html?slug=donazione-spdc-scorrano-2025 |
| Eventi | http://localhost:8765/mockup/eventi.html |
| Evento | http://localhost:8765/mockup/evento.html?slug=memorial-2025 |
| Catalogo foto | http://localhost:8765/mockup/foto.html |
| Album | http://localhost:8765/mockup/album.html?slug=memorial-2025 |
| Privacy | http://localhost:8765/mockup/privacy.html |

File principali in `design/mockup/`: `data.js` (catalogo contenuti), `site.js` (navbar, footer, schede comuni), `mockup.js` (Home), `pages.js` (pagine interne), `tokens.css`, `mockup.css`, `pages.css`.

Test automatici: `design/tests/e2e.js` (istruzioni in testa al file). Screenshot in `design/screenshots/` (prefisso `a2-` per la Fase A.2).
