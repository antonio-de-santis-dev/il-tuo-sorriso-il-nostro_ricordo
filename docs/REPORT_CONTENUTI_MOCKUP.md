# Report — contenuti reali nel mockup (Fase A.3)

> 14/10/2026 · branch `feature/contenuti-reali-mockup` (creato da `origin/feature/completamento-mockup` @ `68b3b42`). Nessun merge, nessuna PR.

## 1. In sintesi

Il mockup ora contiene **solo** le iniziative e gli eventi documentabili: **1 iniziativa di beneficenza** (Scorrano, dicembre 2025) e **1 evento pubblico** (Memorial del 21/08/2025). Un secondo evento (torneo di calcio a 6, giugno 2024) è una **bozza non pubblicata**, perché il ruolo dell'associazione non è confermato. Nessun importo, nessuna immagine di terzi, nessun numero inventato.

**Limite principale:** social e testate sono bloccati dalla rete dell'ambiente. I fatti vengono dagli estratti del motore di ricerca e dalla ricerca preliminare del committente (dettagli in `RICERCA_FONTI_EVENTI_BENEFICENZA.md`).

## 2. File modificati e nuovi

| File | Cosa cambia |
|---|---|
| `design/mockup/data.js` | Catalogo riscritto. Campo `status` (`published` / `draft`); fonti con data di consultazione e stato di verifica; testo nuovo e originale dell'iniziativa con “Le tappe”; Memorial con testo proposto e relazione “Raccolta fondi per”; torneo 2024 come bozza; album Memorial in anteprima senza foto; schede `demoInitiatives` per il carosello demo |
| `design/mockup/site.js` | Filtri `publicEvents()` / `publicInitiatives()` (le bozze non entrano mai nelle liste); card demo; card album “Anteprima · foto non ancora caricate”; box fonti condiviso |
| `design/mockup/mockup.js` | Home solo con contenuti pubblicati; variante `?demo=carosello` |
| `design/mockup/pages.js` | Archivio beneficenza in ordine cronologico; articolo con tappe, “Per cosa” e note redazionali; eventi con sezione bozze in revisione (`?bozze=1`); pagina evento con fonti, avviso di bozza e collegamento alla beneficenza; album in anteprima |
| `design/mockup/pages.css`, `mockup.css` | Stili per tappe, avviso di bozza, stato delle fonti, card demo, album senza foto (solo aggiunte, nessuna modifica allo stile approvato) |
| `design/tests/e2e.js` | Suite riscritta: Chromium + WebKit (se presente), desktop, tablet e mobile, bozze, carosello con 1 e con più card, link morti |
| `docs/RICERCA_FONTI_EVENTI_BENEFICENZA.md` | **Nuovo**: inventario delle fonti con stato di verifica |
| `docs/ASSET_DA_RICHIEDERE.md` | **Nuovo**: immagini, conferme e autorizzazioni da chiedere |
| `docs/REPORT_CONTENUTI_MOCKUP.md` | **Nuovo**: questo report |
| `docs/SITEMAP_E_FLUSSI.md`, `README.md`, `docs/FONTI_CONTENUTI_MOCKUP.md` | Rotte di revisione, collegamenti ai nuovi documenti |
| `design/screenshots/a3-*.png` | 31 screenshot (desktop 1440, tablet 768, mobile 390) |

## 3. Card e pagine

| Contenuto | Home | Archivio | Dettaglio | Stato |
|---|---|---|---|---|
| Un gesto concreto per il reparto di Psichiatria di Scorrano | Carosello (1 card, senza controlli) | `beneficenza.html` | `beneficenza-articolo.html?slug=donazione-spdc-scorrano-2025` | Pubblicabile dopo approvazione del testo |
| Memorial 2025 | Sezione Eventi | `eventi.html` → Passati | `evento.html?slug=memorial-2025` | Pubblicabile; luogo e programma da confermare |
| Torneo di calcio a 6 — In ricordo di Simone | **No** | Solo `eventi.html?bozze=1` | `evento.html?slug=torneo-calcio-6-simone-2024` con avviso “BOZZA NON PUBBLICATA” | **Non pubblicabile** |
| Album Memorial 2025 | — | `foto.html` | `album.html?slug=memorial-2025`: anteprima, nessuna foto | Si attende il caricamento |
| Schede del carosello demo | Solo `index.html?demo=carosello` | — | Nessun link | **DEMO NON PUBBLICABILE** |

Collegamenti verificati: Home → beneficenza → articolo → evento Memorial → album (anteprima) → evento → beneficenza. Album dimostrativi (fittizi, etichettati) per provare griglia, selezione, visualizzatore e ZIP simulato.

Equivalenza con le rotte React future: `beneficenza-articolo.html?slug=x` → `/beneficenza/x`, `evento.html?slug=x` → `/eventi/x`, `album.html?slug=x` → `/foto/x`. `?bozze=1` e `?demo=carosello` sono **solo strumenti di revisione**: in produzione le bozze stanno nel sistema redazionale e non sono raggiungibili dal pubblico.

## 4. Immagini

| Immagine | Stato |
|---|---|
| Foto della consegna a Scorrano | **Mancante**: segnaposto “Foto autorizzata della consegna (senza pazienti riconoscibili)” |
| Locandina Memorial 2025 | **Mancante**: segnaposto |
| Locandina torneo 2024 | **Mancante**: segnaposto (bozza) |
| Foto degli album | **Nessuna foto reale**: anteprima vuota per il Memorial, segnaposto colorati negli album fittizi |
| Hero e logo | Asset forniti dal committente (invariati) |

Nessuna immagine è stata presa da testate o social.

## 5. URL consultati

Tutti tentati il 14/10/2026. Bloccati dalla rete, quindi letti solo tramite estratti del motore di ricerca, dove disponibili:
instagram.com/ilvostrosorrisoilnostroricordo · facebook.com/groups/546155726566062/… · ilgallo.it (articolo e pagina tag) · corrieresalentino.it (2 articoli) · lecceprima.it · giornaledipuglia.com · agenparl.eu · greciataneama.it. Elenco completo con link in `RICERCA_FONTI_EVENTI_BENEFICENZA.md`.

## 6. Test

`node design/tests/e2e.js` con server statico locale. **171/171 PASS su Chromium** a 1440×900, 768×1024 e 390×844:
- intro: scroll, tastiera, touch e ancore bloccati; sblocco dopo skip e a fine animazione; nessun blocco con reduced motion, con intro già vista o arrivando a una sezione;
- percorsi Home → beneficenza → articolo → archivio → Home e Home → evento → beneficenza / album → ritorno, con briciole di pane, navbar e tasto indietro;
- carosello con 1 card (niente controlli) e con 3 card nella variante demo (frecce e tastiera);
- bozze assenti da Home ed Eventi, visibili solo in revisione e con avviso;
- nessun importo, “televisori” senza numero, fonti con data di consultazione;
- catalogo → album, selezione multipla, visualizzatore, ZIP simulato dichiarato, album vuoto, non pubblicato e inesistente;
- menu mobile e tablet; nessun errore JavaScript, nessuno scroll orizzontale, nessun link interno rotto.

**WebKit non installato** nell'ambiente: la suite lo prova ad avviare e, in sua assenza, lo segnala (`SKIP`). Va rilanciata in locale dopo `npx playwright install webkit`.

## 7. Limiti e questioni aperte

1. Fonti lette solo tramite estratti: serve una lettura integrale prima della pubblicazione.
2. Social non consultati: l'elenco dei post va chiesto all'associazione.
3. Torneo 2024: ruolo dell'associazione da confermare.
4. Memorial 2025: luogo, programma e locandina mancanti.
5. Discrepanza sul numero dei televisori (9 o 8) e sulla data di pubblicazione di Il Gallo (12/12 o 16/12/2025).
6. Le note redazionali (es. la discrepanza sui televisori) sono visibili nel mockup con l'etichetta “non pubblicabili”: in produzione staranno solo nel sistema redazionale.
