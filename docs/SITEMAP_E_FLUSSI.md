# Sitemap, flussi utente e wireframe delle pagine interne

## 1. Sitemap

```
/                          Home (pagina narrativa lunga)
├─ #top                      1. Intro + Hero
├─ #chi-siamo                2. Chi siamo
├─ #beneficenza              3. Beneficenza (anteprima, carosello)
├─ #eventi                   4. Eventi (anteprima, sequenza alternata)
├─ #foto                     5. Foto (card “pila di foto”)
├─ #sponsor                  6. Sponsor
└─ #grazie                   7. Ringraziamenti + footer

/beneficenza               Archivio iniziative
/beneficenza/:slug         Articolo iniziativa      es. /beneficenza/donazione-spdc-scorrano-2025
/eventi                    Archivio eventi (Prossimi / Passati)
/eventi/:slug              Pagina evento            es. /eventi/memorial-2025
/foto                      Catalogo album
/foto/:slug                Album: griglia, lightbox, download singolo e ZIP
/privacy                   Privacy policy
/cookie                    Solo se servono cookie non tecnici
/*                         404 con link alla Home e agli album
```

Navbar uguale ovunque: **Home · Chi siamo · Beneficenza · Eventi · Foto**.
- Sulla Home: scorrimento morbido all'ancora, con spazio per la navbar.
- Su una pagina interna: link a `/#sezione` (si torna alla sezione giusta della Home). La voce della sezione a cui appartiene la pagina resta evidenziata (es. su `/eventi/memorial-2025` è attiva “Eventi”).
- Logo: torna a `/#top`.

## 2. Flussi principali

### A. “Voglio le mie foto della serata” (mobile, il flusso più importante)
```
Link Instagram / QR sulla locandina ─▶ /foto/memorial-2025 (diretto)
oppure  Home ─▶ Menu ─▶ Foto ─▶ card “Apri gli album” ─▶ /foto ─▶ album
  ├─ tocco su una foto ─▶ lightbox ─▶ swipe ─▶ “Scarica originale” ─▶ foglio di condivisione iOS / download
  └─ tocco sui cerchi di selezione (o “Seleziona”) ─▶ barra in basso “3 foto · ≈13 MB” ─▶ “Scarica ZIP”
        ─▶ avanzamento ─▶ file .zip  (oltre il limite: proposta di dividere in più ZIP)
```
Nota iPhone: Safari salva lo ZIP in File, non in Foto. Per chi vuole le foto nel rullino il download singolo è la via migliore: va detto nella barra (“Su iPhone, per salvarle in Foto scaricale una alla volta”).

### B. “Chi siete e cosa avete fatto?”
```
Home ─▶ Chi siamo ─▶ Beneficenza (carosello) ─▶ “Scopri l'iniziativa” ─▶ /beneficenza/:slug
  ─▶ fonti e foto ─▶ link all'evento che ha raccolto i fondi (/eventi/memorial-2025)
```

### C. “Quando c'è il prossimo evento?”
```
Home ─▶ Eventi ─▶ prima card = prossimo evento (se c'è) ─▶ /eventi/:slug ─▶ data, luogo, locandina
Dopo l'evento: la stessa pagina mostra “Galleria foto evento” ─▶ /foto/:slug
```

### D. Evento ↔ album (collegamento bidirezionale)
- `/eventi/:slug` mostra “Galleria foto evento” **solo se** l'album esiste ed è pubblicato.
- `/foto/:slug` mostra “Vai all'evento” se l'album è legato a un evento.

### E. Associazione: pubblicare un album
```
Crea cartella su Drive (dentro la cartella radice condivisa) ─▶ carica le foto
─▶ aggiunge la voce album nel catalogo (nome, slug, ID cartella, evento, pubblicato=sì)
─▶ il server indicizza, genera anteprime e mette in cache ─▶ album visibile
```
Senza pannello admin, il passaggio “aggiunge la voce” è una modifica a un file di catalogo (fatta da chi gestisce il sito). Con il pannello admin (opzionale) diventa un modulo.

## 3. Wireframe delle pagine interne

### /beneficenza/:slug — articolo
```
[NAVBAR solida                                   Beneficenza attiva]
Beneficenza / Donazione al reparto SPDC di Scorrano        ← briciole
DICEMBRE 2025 · OSPEDALE “VERIS DELLI PONTI”, SCORRANO
TELEVISORI, MUSICA E UN BILIARDINO            ┌───────────────┐
PER IL REPARTO DI PSICHIATRIA                 │ 3.000 €        │ badge
                                              │ 9 TV · 1 ampli │
[ immagine grande autorizzata, 16:9 ]         │ 1 biliardino   │
                                              └───────────────┘
Testo dell'articolo (max 70 caratteri a riga)
   foto 2 ruotata, sfalsata a destra
Testo
┌ Fonti ─────────────────────────────────────┐
│ Il Gallo, 12/12/2025 ↗  Corriere Salentino ↗│
└────────────────────────────────────────────┘
Fondi raccolti durante: [card evento Memorial 2025 →]
← Iniziativa precedente            Iniziativa successiva →
[FOOTER]
```

### /eventi/:slug — evento
```
[NAVBAR]                                           Eventi attiva
┌────────────┐  21                         ← data gigante
│ LOCANDINA  │  AGOSTO 2025
│  (3:4)     │  MEMORIAL 2025
│ ruotata 2° │  Luogo · orario
└────────────┘  [Aggiungi al calendario]  (solo eventi futuri)
Descrizione completa
Programma / ospiti (se forniti)
╔══════════════════════════════════════════╗
║  GALLERIA FOTO EVENTO   [pila di foto] → ║  (solo se l'album è pubblicato)
╚══════════════════════════════════════════╝
Con i fondi raccolti: [card iniziativa →]  (se collegata)
```

### /eventi e /beneficenza — archivi
```
TITOLO                         [Prossimi] [Passati]   ← filtri (solo se ci sono dati)
card · card · card   (griglia 3 col desktop, 1 col mobile)
Stato vuoto: “Nessun evento in programma. Seguici su Instagram per le novità.”
```

### /foto — catalogo album
```
GALLERIA FOTOGRAFICA
Testo breve: “Foto libere da scaricare, nessuna registrazione.”
Ordina: [Più recenti ▾]
┌────────┐ ┌────────┐ ┌────────┐
│copertina│ │        │ │        │  ← pila di 2–3 stampe per album
│Memorial │ │  ...   │ │  ...   │
│21/08/25 │ │        │ │        │
│48 foto  │ │        │ │        │
└────────┘ └────────┘ └────────┘
Stato vuoto: “Gli album arriveranno dopo il prossimo evento.”
```

### /foto/:slug — album
Vedi mockup `design/mockup/album.html` (barra strumenti fissa, griglia, selezione, barra download, lightbox).
Stati da gestire: caricamento (scheletri), album vuoto, foto non disponibile (tile con icona e “non disponibile”), errore di rete (riprova), ZIP oltre il limite (dividi), ZIP fallito (riprova / scarica singolarmente).
