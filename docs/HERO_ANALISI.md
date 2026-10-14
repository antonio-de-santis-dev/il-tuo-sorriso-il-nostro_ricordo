# Intro + Hero — analisi dei due file e soluzione proposta

## 1. I file ricevuti

| File nel repo | Contenuto | Dimensioni | Canale alfa |
|---|---|---|---|
| `design/assets/intro-figure.webp` | Simone e Francesca + scritta, **sfondo trasparente** (logo) | 1254×1254 | sì (bbox 0,53 → 1240,1230) |
| `design/assets/hero-main.webp` | Stessa illustrazione su spiaggia al tramonto con palme | 1254×1254 | no |

## 2. Misura dell'allineamento

Ho confrontato le due immagini con un algoritmo di corrispondenza di punti (SIFT + RANSAC, OpenCV), separatamente per figure e scritta:

| Livello | Punti coerenti | Scala | Rotazione | Traslazione (px su 1254) |
|---|---|---|---|---|
| Figure | 302 / 364 | **0,7944** | −0,12° | (135,1 ; 227,7) |
| Scritta | 61 / 128 | **0,9543** | −0,01° | (31,4 ; 65,1) |

**Conclusione:** le figure dell'intro sono le stesse della Hero, solo più grandi; la scritta invece ha una scala diversa. Con **una sola** trasformazione la scritta resterebbe sfalsata (effetto “doppia immagine”). Servono **due livelli** che si muovono ciascuno verso la propria posizione.

Nel mockup lo stesso file viene usato due volte con un ritaglio (`clip-path`): figure sopra il 74,5% dell'altezza, scritta sotto. Alla fine dell'animazione entrambi coincidono **al pixel** con la Hero, quindi il passaggio all'immagine principale è invisibile (vedi `design/screenshots/*-intro-*.png`).

Trasformazioni CSS (origine 0 0):
```css
.cut--figures { transform: translate(10.774%, 18.158%) scale(.7944); }
.cut--title   { transform: translate(2.504%, 5.191%) scale(.9543); }
```

## 3. Coreografia (≈ 2 s, interrompibile)

| Tempo | Cosa succede | Perché |
|---|---|---|
| 0–520 ms | Simone e Francesca compaiono su fondo crema (opacità + leggero assestamento) | Il primo volto che si vede sono loro |
| 620–1770 ms | Dal **sole** dell'illustrazione si apre un cerchio che rivela il tramonto; nello stesso tempo figure e scritta “rientrano” nella scena | Il ricordo prende posto nel paesaggio: l'incastro ha un significato |
| 1770–2030 ms | Lo strato intro sfuma (è già perfettamente sovrapposto) e compaiono navbar, luogo e CTA | Nessuno stacco percepibile |

Regole:
- **Salta intro** sempre visibile; anche `Esc` la chiude.
- Vista una volta per sessione (`sessionStorage`); al ritorno sulla Home la Hero è già composta. `?intro` la forza (per le revisioni).
- `prefers-reduced-motion`: nessuna animazione, Hero già composta.
- L'intro parte solo quando `hero-main` è caricata; se non arriva entro 2,5 s o va in errore, si salta.
- Solo `transform`, `opacity`, `clip-path`: nessun ricalcolo di layout. L'immagine Hero ha `preload` ed è l'elemento LCP.

## 4. Impaginazione desktop e mobile

L'illustrazione è quadrata e contiene testo vicino ai bordi (la scritta va dal 5% al 96% della larghezza): **non si può ritagliare** con `object-fit: cover`.

- **Desktop / orizzontale:** quadrato intero alto quanto il viewport, al centro. Ai lati la stessa immagine sfocata e scurita, con bordi sfumati. Luogo in basso a sinistra, CTA “Scopri la nostra storia” in basso a destra.
- **Mobile / verticale:** quadrato a tutta larghezza in alto (sotto la navbar trasparente ci sono solo palme), che sfuma in una banda verde scuro `#112318` con “Associazione di volontariato · Martano · Lecce” e la CTA a tutta larghezza in basso, nella zona del pollice.

## 5. Cosa serve per la versione definitiva

1. **Originali ad alta risoluzione** (≥ 2500 px di lato): oggi a 1254 px il desktop retina è morbido.
2. Idealmente i **livelli separati**: figure (PNG trasparente), scritta (PNG trasparente o SVG), sfondo senza figure. Così animazione e ritagli sono più puliti e la scritta può restare nitida a ogni dimensione.
3. Se possibile, **sfondo esteso** in 16:9 e 9:16 (stesso paesaggio, più largo/più alto): eliminerebbe il fondo sfocato ai lati su desktop.
4. Conferma che il logo (immagine dell'intro) si può usare anche piccolo in navbar e nel footer.

Con i livelli separati l'animazione resta la stessa; cambiano solo i file.

## 6. Alternativa (se non arrivano file migliori)

Rimane la soluzione del mockup, che funziona con i due file attuali. Su desktop c'è da mettere in conto una leggera perdita di nitidezza.
