# DESIGN.md — design system

> Questo file prevale sulle raccomandazioni generiche delle skill esterne (UI UX Pro Max, Taste Skill, Impeccable…).
> I token sono implementati in `design/mockup/tokens.css`.

## 1. Idea guida

**«Il tramonto di Martano, d'estate, con gli amici.»** Tutto parte dall'illustrazione: cielo celeste, sole arancio, palme scure, sabbia. Il sito alterna sezioni **luminose e piene di colore** (Hero, Foto, Grazie) a sezioni **calme su carta crema** (Chi siamo, Eventi, Sponsor). Le fotografie sono trattate come **stampe vere**: cornice bianca, leggera rotazione, sovrapposizioni. Il colore forte è uno sfondo alla volta, mai sei insieme.

Cose da evitare: colonne centrate con tre icone, gradienti viola, card tutte uguali, toni funerei (niente nero puro, niente grigi freddi, niente candele o simboli di lutto).

## 2. Colore

### Palette del committente (invariata)

| Token | HEX | Uso |
|---|---|---|
| `--c-sky` | `#32A5C2` | Sfondo sezione Foto, accenti. Testo **solo scuro** sopra (5,7:1) |
| `--c-sunset` | `#F39C33` | Segni a pennello, sottolineature, punti. **Mai testo su chiaro** (2,2:1 su bianco) |
| `--c-gold` | `#F7C552` | Bottoni principali, statistiche, link su scuro (10,2:1 su palm) |
| `--c-palm` | `#112318` | Testo principale, sezioni scure (Beneficenza, Grazie, footer) |
| `--c-hill` | `#34593C` | Citazioni, hover dei bottoni scuri, bianco sopra 7,9:1 |
| `--c-sea` | `#28A0B2` | Decorazioni, bordi, gradienti. Testo **solo scuro** sopra (5,3:1) |

### Derivati (contrasti misurati, WCAG 2.2)

| Token | HEX | Contrasto | Uso |
|---|---|---|---|
| `--c-cream` | `#FFF8EE` | — | Sfondo principale (più caldo del bianco) |
| `--c-sand` | `#FBEBD3` | — | Sfondo sezioni calme alternate |
| `--c-ink-soft` | `#3D4A42` | 8,8:1 su cream | Testo secondario |
| `--c-sunset-text` | `#9A4D08` | 5,8:1 su cream | Arancio per testo piccolo e link |
| `--c-sea-text` | `#1B6E82` | 5,5:1 su cream | Link, metadati, focus su chiaro |
| `--c-on-dark` | `#FFF8EE` | 15,6:1 su palm | Testo su sezioni scure |

Combinazioni vietate per il testo: bianco su `sky`, `sea`, `sunset` (< 3,2:1).

## 3. Tipografia

Tutti i caratteri sono Google Fonts con licenza **SIL Open Font License** (uso commerciale e self-hosting consentiti; in produzione si servono dal nostro dominio, non da Google, anche per la privacy).

| Ruolo | Carattere | Perché |
|---|---|---|
| Display (titoli H1/H2, numeri) | **Anton**, maiuscolo | Condensato e deciso, richiama la scritta del logo senza imitarla |
| Testo e UI | **Nunito Sans** 400/600/800 | Terminazioni morbide, calda, leggibilissima su mobile |
| Accento a mano | **Caveat Brush** | Sopratitoli e didascalie “scritte a pennarello”, con parsimonia (max 1 per sezione) |

Scala fluida (`clamp`): H2 da 40 a 88 px, H3 da 24 a 36 px, testo 17 px, interlinea 1,65. Righe al massimo ~70 caratteri. `text-wrap: balance` sui titoli. Verificato il wrapping a 360 px.

## 4. Spazio, griglia, forma

- Base 4 px; scala `--s-1`…`--s-10` (4 → 128 px). Margine laterale fluido 16–48 px; contenuto max 1280 px.
- Griglia a 12 colonne su desktop, composizioni **asimmetriche** (testo 6 colonne, foto 5 colonne sfalsate); 1–2 colonne su mobile.
- Spazio verticale delle sezioni: 72–160 px.
- Raggi: 8 / 16 / 28 px, pill per i bottoni. Le “foto stampate” hanno cornice bianca 10 px con bordo inferiore 44 px (Polaroid).
- Ombre calde (tinta `palm`), mai grigie.

## 5. Componenti

| Componente | Note |
|---|---|
| **Navbar** | Fissa. Sulla Hero: trasparente con velatura scura in alto e testo crema. Dopo la Hero: crema semitrasparente con sfocatura, testo scuro. Voce attiva = tratto arancio. Mobile: bottone “Menu” con testo (non solo icona), pannello a tutto schermo verde scuro, voci grandi in Anton, `Esc` chiude. |
| **Bottone primario** | Oro su scuro / scuro su chiaro; altezza min. 48 px; hover −2 px, pressione scala 0,98. |
| **Link con freccia** | “Tutte le iniziative →”: la freccia scorre di 4 px all'hover. |
| **Card beneficenza** | Larga (78vw, max 1040 px), immagine a sinistra + testo; badge oro ruotato con data e luogo (nessun importo economico, per scelta del committente). Su mobile: immagine sopra. |
| **Carosello** | Scroll nativo con `scroll-snap` (swipe gratis su iOS), bottoni precedente/successivo espliciti, indicatori di posizione, regione focalizzabile (frecce della tastiera). **Nessun autoplay.** Con una sola card frecce e puntini sono nascosti (implementato). |
| **Card evento** | Locandina ruotata ±2° alternata a destra/sinistra; data gigante in Anton; CTA “Scopri di più” + “Galleria foto evento” solo se l'album esiste. |
| **Pila di foto (Foto)** | Tre stampe sovrapposte; all'hover (solo puntatore fine) o al focus si aprono a ventaglio. Su touch la pila è già leggermente aperta: nessuna informazione dipende dall'hover. Tutta la card è un link a `/foto`. |
| **Loghi sponsor** | Variante A (≤ 8 loghi): griglia statica. Variante B (molti): due righe, la prima scorre ←, la seconda →; pausa con bottone, hover e focus; elenco testuale unico per screen reader; con reduced motion diventa griglia. |
| **Tile foto** | Quadrata; casella di selezione 44×44 sempre visibile su touch, visibile all'hover su desktop; selezionata = bordo oro + leggero rimpicciolimento. |
| **Barra azioni selezione** | Compare dal basso con conteggio, peso stimato, limiti, “Annulla”, “Scarica ZIP”. |
| **Lightbox** | Dialog modale, focus intrappolato e restituito al tile, frecce tastiera, swipe, `Esc`; “Scarica originale” e “Seleziona” nel visualizzatore. |
| **Segnaposto** | Nel mockup ogni contenuto non verificato è marcato in rosso tratteggiato “PROVVISORIO” / “SEGNAPOSTO”. |

## 6. Movimento

Principi (da Emil Kowalski / Impeccable, adattati):
1. **Ogni animazione deve dire qualcosa**: l'intro racconta l'incastro tra ricordo e paesaggio; le foto si aprono a ventaglio perché sono un album; la sottolineatura della navbar indica dove sei.
2. Solo `transform`, `opacity`, `clip-path`. Niente animazioni di layout.
3. Durate: 160 ms (feedback), 280 ms (stati), 600–700 ms (comparse). Easing in uscita `cubic-bezier(.22,1,.36,1)`; mai `ease-in` per le entrate.
4. Comparsa delle sezioni: 24 px + opacità, una volta sola.
5. Niente autoplay di caroselli. Il marquee sponsor è l'unico movimento continuo e si può fermare.
6. `prefers-reduced-motion`: niente intro, niente comparse, niente marquee, scroll non animato.
7. Libreria: **nessuna** per ora (CSS + Web Animations API). Motion/GSAP solo se in Fase B emergesse un caso che lo giustifica.

## 7. Responsive

Breakpoint di contenuto (non di dispositivo): 420 px, 600 px, 860 px, 1280 px. La Hero cambia impaginazione in base al **rapporto d'aspetto** (≤ 4/5 = verticale). Unità `svh` per evitare il salto della barra di Safari iOS; `env(safe-area-inset-*)` per notch e home indicator. Target touch ≥ 44 px. Nessuno scroll orizzontale (verificato a 390 e 1440 px).

## 8. Accessibilità (obiettivo WCAG 2.2 AA)

Link “Vai al contenuto”; un solo H1 per pagina (nella Home è testuale e visivamente nascosto perché il nome è già nell'illustrazione, che ha un `alt` descrittivo); focus visibile turchese su chiaro, oro su scuro; caroselli con `aria-roledescription`, etichette dei bottoni e regione scorrevole raggiungibile da tastiera; testi mai sovrapposti alle foto; zoom al 200% senza perdita di contenuto.
