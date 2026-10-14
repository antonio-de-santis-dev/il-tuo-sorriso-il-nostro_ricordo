# Inventario contenuti — eventi, raccolte fondi, beneficenza

> Verifica eseguita il **14/10/2026** (secondo passaggio, branch `fix/integrazione-contenuti-mockup`).
> Sostituisce come riferimento `RICERCA_FONTI_EVENTI_BENEFICENZA.md`, che resta come storico.

## 0. Blocco di accesso: cosa non è stato possibile fare

Le fonti primarie e quasi tutte le testate **non sono raggiungibili** dall'ambiente di lavoro. Il proxy di rete rifiuta la connessione (verificato con `curl`, codice 000 / 403) e lo strumento di lettura web non risolve i domini. Anche il connettore **Google Drive** risponde *Forbidden*.

| Fonte | Link | Esito |
|---|---|---|
| Instagram ufficiale | https://www.instagram.com/ilvostrosorrisoilnostroricordo/ | **non_accessibile**: nessun post aperto |
| Facebook | https://www.facebook.com/groups/546155726566062/user/61589920602992/ | **non_accessibile**: nessun post aperto |
| Corriere Salentino (donazione) | https://www.corrieresalentino.it/2025/12/donazione-al-reparto-di-psichiatria-dellospedale-di-scorrano-da-parte-dellassociazione-il-tuo-sorriso-il-nostro-ricordo/ | Pagina bloccata; letto solo l'estratto del motore di ricerca |
| Corriere Salentino (cerimonia) | https://www.corrieresalentino.it/2025/12/allospedale-veris-delli-ponti-di-scorrano-la-cerimonia-di-donazione-dellassociazione-il-tuo-sorriso-il-nostro-ricordo/ | Pagina bloccata; solo estratto |
| Il Gallo | https://www.ilgallo.it/attualita/ospedale-di-scorrano-il-tuo-sorriso-il-nostro-ricordo/ | Pagina bloccata; solo estratto |
| LeccePrima | https://www.lecceprima.it/salute/donazione-reparto-scorrano-12-dicembre-2025.html | Pagina bloccata; **estratto trovato in questo passaggio** |
| LecceNews24 | https://www.leccenews24.it/attualita/donazioni-reparto-psichiatria-ospedale-scorrano.htm | **non_accessibile**: pagina bloccata e nessun estratto restituito dalla ricerca |
| Giornale di Puglia | https://www.giornaledipuglia.com/2025/12/allospedale-veris-delli-ponti-di.html | Pagina bloccata; solo titolo |
| Agenparl (comunicato ASL Lecce) | https://agenparl.eu/2025/12/12/asl-lecce-donazione-al-reparto-di-psichiatria-dellospedale-di-scorrano-da-parte-dellassociazione-il-tuo-sorriso-il-nostro-ricordo/ | Pagina bloccata; solo estratto |
| Grecìa ta nea-ma | https://greciataneama.it/news/notizie/sport/il-tuo-sorriso-il-nostro-ricordo-a-martano-to/40 | **non_accessibile**: nessun estratto; dati solo dalla ricerca preliminare del committente |

**Non è stato dichiarato di aver consultato nessun post o articolo che non si è potuto aprire.** Non è stata aggirata nessuna protezione.

Ricerche aggiuntive di questo passaggio: LecceNews24 e donazione; username Instagram “ilvostrosorriso…”; memorial di Simone e Francesca a Martano nel 2023 e 2024; serate di raccolta fondi a Martano. Risultati **scartati perché di altre associazioni**: “Armonie per la Vita” (Figli in Paradiso, per la TIN di Lecce), “Io non mollo day” (Amici di Paolo), Fratres Martano, donazioni a Pediatria e Ostetricia di Scorrano (Cuore e mani aperte, ALR Lorenzo Risolo).

## 1. Inventario

Legenda: **verificato** = più fonti concordi (anche solo tramite estratti) · **da_confermare** = una sola fonte, dato non letto direttamente o ruolo dell'associazione non chiaro · **non_accessibile** = fonte nota ma illeggibile.

| ID | Titolo | Categoria | Data | Luogo | Descrizione (riscritta) | Link diretto | Cosa conferma la fonte | Attendibilità | Immagine candidata e diritti | Dubbi |
|---|---|---|---|---|---|---|---|---|---|---|
| A0 | Identità dell'associazione | Identità | — | Martano (LE) | Associazione di volontariato nata da un gruppo di amici per ricordare Simone e Francesca, due giovani scomparsi, trasformando il ricordo in solidarietà | LeccePrima; Corriere Salentino (link sopra) | Nome, sede a Martano, legame con Simone e Francesca | **verificato** (2 estratti concordi) | Logo/illustrazione forniti dal committente | Denominazione legale; username Instagram “vostro” ≠ “Tuo”; nessun dettaglio biografico senza consenso delle famiglie |
| B1 | Un gesto concreto per il reparto di Psichiatria di Scorrano | **Beneficenza** | Dicembre 2025 (cerimonia riportata il 12/12/2025) | SPDC, Ospedale Veris Delli Ponti, Scorrano (LE) | Donazione di televisori con supporti, un amplificatore stereo e un biliardino, per lo svago e la socialità delle persone ricoverate | Corriere Salentino (donazione) | Beni donati, destinatario, finalità, collegamento con gli eventi estivi | **verificato** (5 testate concordi negli estratti) | Foto della consegna: **nessuna autorizzata**; foto di testate non riutilizzabili; attenzione ai pazienti | 9 televisori secondo la stampa, 8 secondo le note di progetto → “televisori”. Valore economico **mai mostrato**. Data di Il Gallo: 12/12 o 16/12/2025 |
| B1-c | Cerimonia di consegna | Parte di B1 | Dicembre 2025 | come B1 | Consegna in reparto con personale sanitario e istituzioni locali | Corriere Salentino (cerimonia); Giornale di Puglia; Agenparl | Che la consegna è avvenuta con una cerimonia | verificato | come B1 | **Non è una seconda beneficenza**: più articoli raccontano lo stesso fatto |
| E1 | Memorial 2025 | **Evento di raccolta fondi** | 21/08/2025 | **non riportato** | Ultimo appuntamento degli eventi estivi, i cui fondi hanno sostenuto B1 | Il Gallo; Agenparl; LeccePrima | Data e ruolo di chiusura della raccolta per B1 | **verificato** (data e legame); **da_confermare** (nome ufficiale, luogo, programma) | Locandina: **nessuna disponibile** | Anno 2025 ricavato dal contesto degli articoli; non è una donazione a sé |
| E0 | Eventi estivi 2025 | Raccolta fondi (insieme di eventi) | Estate 2025 | — | Serie di eventi che hanno raccolto i fondi per B1 | come E1 | Che ci sono stati eventi estivi di raccolta | verificato in modo generico | — | **Nessun dettaglio** su quali eventi, date e luoghi: non sono state create schede |
| E2 | Torneo di calcio a 6 — In ricordo di Simone | Evento sportivo | dal 17/06/2024 | Impianto “Peppino Impastato”, via Stomeo, Martano | Torneo dedicato a Simone, nell'ambito della Giornata dello Sport | Grecìa ta nea-ma | Solo secondo la ricerca preliminare: data, luogo, dedica | **da_confermare** (fonte non_accessibile) | Locandina 2024: nessuna | **Ruolo dell'associazione non confermato**; numeri di telefono delle iscrizioni da non ripubblicare |

## 2. Trovati → integrati → non integrati

| Contenuto trovato | Integrato nel mockup | Dove | Non integrato / perché |
|---|---|---|---|
| A0 Identità | Sì | Home “Chi siamo”, footer | Biografie, cognomi, date: **no**, servono il consenso delle famiglie e un testo approvato |
| B1 Donazione SPDC Scorrano | Sì, **unica card di beneficenza** | Carosello in Home (1 card, senza frecce né puntini), `beneficenza.html`, `beneficenza-articolo.html?slug=donazione-spdc-scorrano-2025` | Valore economico **escluso**. Numero dei televisori omesso. Foto: segnaposto (nessuna autorizzata) |
| B1-c Cerimonia | Sì, come **tappa** dell'articolo B1 | Sezione “Le tappe” | Non è una card separata, per evitare il doppio conteggio |
| E1 Memorial 2025 | Sì, unico evento pubblico | Home Eventi, `eventi.html`, `evento.html?slug=memorial-2025` | Luogo, programma e locandina: **non integrati** (nessuna fonte) |
| Album del Memorial | Sì, come **anteprima senza foto** | `foto.html` (unico album pubblico), `album.html?slug=memorial-2025` | Nessuna foto e nessun conteggio: le foto non esistono ancora nel progetto |
| E0 Eventi estivi 2025 | Solo citati nei testi di B1 ed E1 | — | Nessuna scheda: mancano nomi, date e luoghi dei singoli eventi |
| E2 Torneo 2024 | **No** (bozza) | Solo in revisione: `eventi.html?bozze=1` | Ruolo dell'associazione non confermato; fonte illeggibile |
| Altre beneficenze | — | — | **Nessuna trovata**: non c'è base sufficiente per altre card reali |
| Eventi di altre associazioni a Martano/Scorrano | No | — | Omonimie o enti diversi |

**Immagini verificate: nessuna.** Non è stata recuperata nessuna locandina o foto originale con permesso di riuso. Ovunque ci sono segnaposto dichiarati; l'elenco da chiedere è in `ASSET_DA_RICHIEDERE.md`.

## 3. Cosa serve dal committente per completare davvero

La ricerca sui social non si può fare da questo ambiente. Per completarla servono **una** di queste strade:

1. **Sbloccare la rete:** nelle impostazioni dell'ambiente cloud, *Network access* → aggiungere i domini `instagram.com`, `facebook.com`, `corrieresalentino.it`, `ilgallo.it`, `lecceprima.it`, `leccenews24.it`, `giornaledipuglia.com`, `agenparl.eu`, `greciataneama.it` ([documentazione](https://code.claude.com/docs/en/cloud-environments#network-access)). Instagram e Facebook però spesso richiedono il login, quindi la strada 2 resta la più affidabile.
2. **Fornire i materiali** (cartella nel repo, ad es. `design/assets/contenuti/`, oppure accesso a Drive):
   - export dei post Instagram/Facebook dell'associazione (Instagram: *Impostazioni → Il tuo account → Scarica le tue informazioni*, formato JSON con media), oppure screenshot di ogni post con data visibile;
   - per ogni evento: **locandina originale**, data, luogo, programma e una riga su chi l'ha organizzato;
   - per ogni iniziativa benefica: destinatario, data, cosa è stato donato, eventuali foto autorizzate (senza pazienti o minori riconoscibili);
   - conferma scritta sul **torneo di calcio 2024**;
   - autorizzazione al riuso di ogni immagine (associazione e autori delle foto).
