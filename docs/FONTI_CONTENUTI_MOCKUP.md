# Fonti dei contenuti del mockup (Fase A.2)

> Ricerca del 14/10/2026. **Superato** da `RICERCA_FONTI_EVENTI_BENEFICENZA.md` (Fase A.3): il torneo 2024 ora è una bozza non pubblicata e l'album Memorial non ha più foto segnaposto. Tutti i testi del sito restano **da approvare con l'associazione**.

## 1. Limite della verifica (da leggere per primo)

La rete dell'ambiente di lavoro **blocca** questi siti: `ilgallo.it`, `corrieresalentino.it`, `lecceprima.it`, `agenparl.eu`, `giornaledipuglia.com`, `instagram.com`, `facebook.com`. La pagina **non è stata aperta**, né con il browser né con lo strumento di lettura web (errore 403 del proxy / DNS).

Quello che segue viene dagli **estratti restituiti dal motore di ricerca** (titoli, sommari e brani degli articoli). Più testate indipendenti riportano gli stessi fatti, ma prima della pubblicazione **qualcuno deve leggere gli articoli integrali**. Per sbloccare i siti basta aggiungere i domini in *Network access* nelle impostazioni dell'ambiente cloud (vedi [documentazione](https://code.claude.com/docs/en/cloud-environments#network-access)).

Legenda grado di verifica:
- **A — concorde**: riportato da almeno due testate negli estratti.
- **B — singola fonte**: un solo estratto.
- **C — da confermare**: dedotto, ambiguo o non trovato.

## 2. Affermazioni usate nel mockup

| # | Affermazione | Dove compare | Fonti | Grado | Note |
|---|---|---|---|---|---|
| 1 | Associazione di volontariato di Martano (LE) | Home, footer | Il Gallo; Corriere Salentino | A | Denominazione legale da fornire |
| 2 | Nata per ricordare Simone e Francesca, due amici scomparsi | Home “Chi siamo” | Corriere Salentino (“fondata da un gruppo di giovani amici di Martano”) | B | **Ogni dettaglio biografico va approvato dalle famiglie.** Nessun cognome, nessuna circostanza |
| 3 | Dicembre 2025: donazione al reparto di Psichiatria (SPDC) dell'Ospedale “Veris Delli Ponti” di Scorrano | Home, archivio, articolo | Il Gallo 12/12/2025; Corriere Salentino (2 articoli); Agenparl / comunicato ASL Lecce 12/12/2025; Giornale di Puglia | A | Il giorno esatto della cerimonia non è certo: nel sito c'è “dicembre 2025” |
| 4 | Donati: televisori (con supporti), un amplificatore stereo, un biliardino | Articolo, scheda “In breve” | Stesse fonti | A | Le fonti indicano **9** televisori. Come chiesto, nel sito si scrive solo “televisori” |
| 5 | Valore dei materiali (circa 3.000 €) | **Rimosso dal sito** | Il Gallo; Agenparl | A | Su richiesta del committente non compare in card, badge o testi |
| 6 | Finalità: benessere, svago e socializzazione delle persone ricoverate | Card, articolo | Stesse fonti | A | |
| 7 | Fondi raccolti negli eventi estivi, culminati con il Memorial del 21 agosto | Articolo, evento | Il Gallo; Agenparl | A | L'anno 2025 si ricava dal contesto (articoli di dicembre 2025 sull'estate appena passata) |
| 8 | Cerimonia in reparto con personale sanitario e rappresentanti delle istituzioni | Articolo | Corriere Salentino; Agenparl | A | Le fonti nominano i sindaci di Martano e Scorrano e il direttore del reparto: **nomi non usati** nel sito, da approvare |
| 9 | Targa di riconoscimento consegnata all'associazione | Non usato | Corriere Salentino | B | Dettaglio opzionale |
| 10 | Momento musicale (Vasapiedi, Damiano Mulino) | Non usato | Prompt iniziale (stampa) | C | Non ritrovato negli estratti di questa ricerca |

## 3. Eventi

| Evento | Stato | Cosa manca |
|---|---|---|
| **Memorial, 21 agosto 2025** | Nel mockup (`evento.html?slug=memorial-2025`) | Nome ufficiale (nel mockup è “Memorial 2025”), **luogo** (nessuna fonte lo riporta), programma, locandina autorizzata. Nelle ricerche per Martano del 21/08/2025 compare solo un altro evento (“Sei Festival”), che **non** è collegato all'associazione |
| **Torneo di calcio del 17 giugno 2024 in ricordo di Simone** | **Non inserito** nell'archivio | Nessuna fonte trovata, nemmeno con ricerche mirate. Non è possibile verificare data, luogo o che l'organizzatore sia l'associazione. Va confermato dall'associazione prima di pubblicarlo |

## 4. Iniziative di beneficenza

Una sola trovata e attribuibile con sicurezza all'associazione: la **donazione al SPDC di Scorrano (dicembre 2025)**. Ricerche per altre iniziative (nome dell'associazione + Martano / beneficenza / donazione / torneo / memorial): **nessun risultato pertinente**. Non ne sono state inventate altre.

## 5. Fonti consultate o tentate

| Fonte | URL | Esito |
|---|---|---|
| Il Gallo | https://www.ilgallo.it/attualita/ospedale-di-scorrano-il-tuo-sorriso-il-nostro-ricordo/ | Bloccata dalla rete; estratto via ricerca |
| Corriere Salentino (donazione) | https://www.corrieresalentino.it/2025/12/donazione-al-reparto-di-psichiatria-dellospedale-di-scorrano-da-parte-dellassociazione-il-tuo-sorriso-il-nostro-ricordo/ | Bloccata; estratto via ricerca |
| Corriere Salentino (cerimonia, 14/12/2025) | https://www.corrieresalentino.it/2025/12/allospedale-veris-delli-ponti-di-scorrano-la-cerimonia-di-donazione-dellassociazione-il-tuo-sorriso-il-nostro-ricordo/ | Bloccata; estratto via ricerca |
| Agenparl (comunicato ASL Lecce, 12/12/2025) | https://agenparl.eu/2025/12/12/asl-lecce-donazione-al-reparto-di-psichiatria-dellospedale-di-scorrano-da-parte-dellassociazione-il-tuo-sorriso-il-nostro-ricordo/ | Bloccata; estratto via ricerca |
| Giornale di Puglia | https://www.giornaledipuglia.com/2025/12/allospedale-veris-delli-ponti-di.html | Bloccata; solo titolo |
| LeccePrima | https://www.lecceprima.it/salute/donazione-reparto-scorrano-12-dicembre-2025.html | Bloccata; nessun estratto |
| Instagram | https://www.instagram.com/ilvostrosorrisoilnostroricordo/ | Bloccata; **non consultata** |
| Facebook | https://www.facebook.com/groups/546155726566062/user/61589920602992/ | **Non consultata** (richiede accesso) |

## 6. Asset mancanti

- [ ] Foto autorizzata della consegna a Scorrano (**nessun paziente riconoscibile**)
- [ ] Locandina del Memorial 2025, con il permesso d'uso
- [ ] Foto vere per l'album del Memorial (oggi 48 segnaposto colorati)
- [ ] 1–2 foto per “Chi siamo”
- [ ] Loghi degli sponsor
- [ ] Originali ad alta risoluzione della Hero (vedi `HERO_ANALISI.md`)

## 7. Contenuti fittizi presenti nel mockup (tutti etichettati)

- Album **“Album dimostrativo: tante foto”** (240 foto) — serve a provare il caricamento a blocchi.
- Album **“Album dimostrativo: in preparazione”** (0 foto) — mostra lo stato vuoto.
- Album **non pubblicato** (`album.html?slug=demo-non-pubblicato`) — non compare nel catalogo; il link diretto mostra “Album non disponibile”.
- Tutte le foto degli album sono segnaposto colorati; il numero di foto è dimostrativo.
- Download dell'originale e ZIP sono **simulati**: nessun file viene generato, e l'avviso lo dice.
