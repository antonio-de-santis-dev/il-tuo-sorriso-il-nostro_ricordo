# PRODUCT.md — «Il Tuo Sorriso, il Nostro Ricordo»

> Stato: **Fase A — analisi e design**. Nessun codice applicativo finché i mockup non sono approvati.
> Ultimo aggiornamento: 14/10/2026 (Fase A.2: vedi anche `FONTI_CONTENUTI_MOCKUP.md`)

## 1. Cosa stiamo costruendo

Il sito ufficiale di un'associazione di volontariato di Martano (LE). Serve a:

1. raccontare chi è l'associazione e perché esiste (il ricordo di Simone e Francesca);
2. mostrare cosa ha fatto con i fondi raccolti (beneficenza), con articoli verificabili;
3. comunicare gli eventi passati e futuri;
4. permettere a **chiunque, senza login**, di vedere e scaricare le foto autorizzate degli eventi (singole o in ZIP);
5. ringraziare sponsor e sostenitori;
6. dare contatti ufficiali.

Tono: umano, caloroso, concreto. Comunità e vitalità prima del lutto. Niente pietismo, niente numeri o promesse non verificati.

## 2. Utenti e cosa cercano

| Chi | Arriva da | Cosa vuole fare | Cosa conta |
|---|---|---|---|
| Partecipante a un evento | Link Instagram/WhatsApp, QR sulla locandina | Trovare le **sue foto** e scaricarle dal telefono | Arrivare all'album in ≤ 2 tocchi, download che funzioni su iPhone |
| Persona del territorio | Passaparola, stampa locale | Capire chi sono e quando c'è il prossimo evento | Data, luogo, locandina leggibili |
| Possibile sponsor / donatore | Contatto diretto | Vedere serietà e risultati concreti | Iniziative documentate con fonti, loghi sponsor curati |
| Famiglie e amici di Simone e Francesca | — | Ritrovare un ricordo trattato con rispetto | Testi approvati, nessun dettaglio non autorizzato |
| Stampa / enti | Ricerca web | Fatti verificabili, contatti | Pagine indicizzabili con URL stabili |
| Associazione (redazione) | — | Caricare foto su Drive e vederle comparire | Flusso semplice, nessuna competenza tecnica |

## 3. Contenuti accertati (da fonti di stampa)

Usabili **solo attribuendoli alle fonti** e dopo conferma dell'associazione:

- Associazione di volontariato di **Martano (LE)**.
- Nata per **preservare il ricordo di Simone e Francesca** e trasformarlo in iniziative per il territorio e le realtà sociosanitarie locali. *(Nessun cognome, nessuna circostanza.)*
- **Dicembre 2025**: cerimonia di donazione al reparto di Psichiatria / SPDC dell'Ospedale “Veris Delli Ponti” di **Scorrano**.
- Materiali donati: **televisori (9 secondo le fonti), 1 amplificatore stereo, 1 biliardino**. Il valore economico riportato dalla stampa **non va pubblicato** (decisione del committente, Fase A.2).
- Fondi raccolti negli eventi estivi culminati con il **Memorial del 21 agosto 2025**.
- Finalità: benessere, svago e socializzazione delle persone ricoverate.
- Dettagli secondari (targa, momento musicale con i Vasapiedi e Damiano Mulino): **opzionali**, da approvare.

Fonti: *Il Gallo* (pubblicato 12/12/2025), *Corriere Salentino* (14/12/2025). La data esatta della cerimonia **non** è accertata: nel sito si scrive “dicembre 2025”.

## 4. Vincoli già decisi (non ridiscussi)

React + Node.js · stile creativo e dinamico · Home narrativa lunga con sezioni Home / Chi siamo / Beneficenza / Eventi / Foto · approfondimenti su pagine interne · Google Drive come fonte delle foto · foto pubbliche senza login, scaricabili singolarmente e in ZIP · sponsor animati secondo quantità · ringraziamenti + footer · palette di 6 colori fornita.

## 5. Criticità e ambiguità reali

| # | Tema | Problema | Proposta |
|---|---|---|---|
| 1 | **Nome** | Stampa: «Il Tuo Sorriso, il Nostro Ricordo»; Instagram: `ilvostrosorrisoilnostroricordo` (*vostro*). | Confermare denominazione legale e grafia. Il mockup usa la versione della stampa e del logo. |
| 2 | **Hero: risoluzione** | Entrambi i file sono **1254×1254 px**. A schermo intero su desktop retina servono ≥ 2000 px: l'illustrazione risulta morbida. | Richiedere gli originali ad alta risoluzione (≥ 2500 px) o il file sorgente. |
| 3 | **Hero: formato** | L'illustrazione è **quadrata**. In un viewport 16:9 o 9:19 non si può “ritagliare” senza tagliare teste o scritta. | Mockup: quadrato intero + estensione (sfocata su desktop, banda scura su mobile). Ideale: versione **orizzontale** (16:9) e **verticale** (9:16) disegnate dall'illustratore. Vedi `HERO_ANALISI.md`. |
| 4 | **Hero: livelli** | Nell'immagine dell'intro e in quella principale le figure e la scritta hanno **scale diverse** (0,794 vs 0,954). | Il mockup separa i due livelli con un ritaglio. In produzione è più pulito avere **livelli separati** (figure / scritta / sfondo) in PNG. |
| 5 | **Nomi file** | Il prompt cita `imagine_animazione_iniziale.png` e `imagine principale.png`; sono arrivati due `.webp`. Nel repo: `design/assets/intro-figure.webp` e `hero-main.webp`. In produzione evitare spazi nei nomi. | Confermare che siano i file definitivi. |
| 6 | **Contenuti** | Esiste **una** iniziativa e **un** evento documentati. Il carosello beneficenza e la sequenza eventi sono progettati per crescere, ma oggi mostrano poche schede. | Il layout regge anche con 1 sola scheda (in quel caso le frecce si nascondono). Nessun contenuto inventato. |
| 7 | **Foto: diritti** | Foto di eventi pubblici con possibili **minori** e foto in **ambito sanitario** (reparto di Psichiatria). | Liberatorie prima della pubblicazione; per l'ospedale nessun paziente riconoscibile; policy EXIF (rimozione GPS). |
| 8 | **Drive** | Account personale o Google Workspace? Determina se usare service account con cartella condivisa oppure OAuth. | Da chiarire prima della Fase B. Vedi `ARCHITETTURA_PROPOSTA.md`. |
| 9 | **Hosting / dominio** | Non indicati. Il backend Node (proxy Drive + ZIP) richiede un hosting con processo server, non solo statico. | Proporre opzioni con costi in Fase B. |
| 10 | **PostgreSQL** | Utile solo se servirà un pannello admin. | Prima release: catalogo contenuti in file JSON/Markdown versionati; DB solo con admin. |

## 6. Dati mancanti da richiedere all'associazione

- [ ] Denominazione ufficiale completa, C.F., sede legale
- [ ] Logo in alta risoluzione (vettoriale se esiste) e regole d'uso
- [ ] **Originali della Hero** ad alta risoluzione, idealmente a livelli + varianti 16:9 e 9:16
- [ ] Data di fondazione e storia approvata
- [ ] Testo su Simone e Francesca, con il consenso delle famiglie
- [ ] 1–2 fotografie autorizzate per “Chi siamo”
- [ ] Foto autorizzate della donazione a Scorrano (senza pazienti riconoscibili)
- [ ] Elenco completo di iniziative ed eventi (date, luoghi, locandine, descrizioni)
- [ ] Nome ufficiale e luogo del Memorial 2025
- [ ] Sponsor: elenco, loghi, autorizzazione, link
- [ ] Contatti ufficiali (email, telefono, social verificati)
- [ ] Cartella Drive, account proprietario, struttura album, liberatorie fotografiche
- [ ] Dominio, privacy policy, eventuale cookie policy
- [ ] Testo dei ringraziamenti finali

## 7. Fuori ambito (per ora)

Registrazione utenti, commenti, e-commerce, donazioni online, pannello admin (opzionale, da approvare), 3D (img2threejs), multilingua.
