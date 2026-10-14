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
3. **Carosello con una sola iniziativa**: nascondere frecce e puntini (previsto, non ancora nel mockup perché ci sono i segnaposto).
4. **Font**: in produzione self-hosted con `font-display: swap` e preload di Anton, per evitare salti di layout nei titoli.
5. **Sfocatura del fondo Hero** (`filter: blur`) può pesare sui PC lenti: in produzione usare una versione già sfocata e piccola dell'immagine (pochi KB).
6. **Download su iPhone**: lo ZIP finisce in File, non in Foto. Avviso nella barra di selezione.
7. **Testi**: tutti quelli marcati PROVVISORIO vanno scritti e approvati dall'associazione.
