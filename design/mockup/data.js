/* MOCKUP — catalogo contenuti unico per tutte le pagine.
   Rispecchia lo schema di docs/ARCHITETTURA_PROPOSTA.md (initiatives, events, albums).
   status: 'published' = mostrabile nel mockup · 'draft' = bozza redazionale, MAI nelle liste pubbliche.
   Ogni fonte ha data di consultazione e stato di verifica.
   Inventario completo: docs/RICERCA_FONTI_EVENTI_BENEFICENZA.md */
(() => {
  const CHECKED = '14/10/2026'; // ultima verifica: stessa data, secondo passaggio di ricerca
  // Stato di verifica delle fonti (vedi legenda nel documento di ricerca)
  const EXCERPT = 'estratto da motore di ricerca: pagina non apribile dall’ambiente di lavoro';
  const BLOCKED = 'non accessibile dall’ambiente di lavoro';

  const SRC = {
    gallo: { name: 'Il Gallo', date: '12/12/2025 (altra indicazione: 16/12/2025)', url: 'https://www.ilgallo.it/attualita/ospedale-di-scorrano-il-tuo-sorriso-il-nostro-ricordo/', checked: CHECKED, status: EXCERPT },
    cs1: { name: 'Corriere Salentino', date: 'dicembre 2025', url: 'https://www.corrieresalentino.it/2025/12/donazione-al-reparto-di-psichiatria-dellospedale-di-scorrano-da-parte-dellassociazione-il-tuo-sorriso-il-nostro-ricordo/', checked: CHECKED, status: EXCERPT },
    cs2: { name: 'Corriere Salentino', date: '14/12/2025', url: 'https://www.corrieresalentino.it/2025/12/allospedale-veris-delli-ponti-di-scorrano-la-cerimonia-di-donazione-dellassociazione-il-tuo-sorriso-il-nostro-ricordo/', checked: CHECKED, status: EXCERPT },
    agenparl: { name: 'Agenparl (comunicato ASL Lecce)', date: '12/12/2025', url: 'https://agenparl.eu/2025/12/12/asl-lecce-donazione-al-reparto-di-psichiatria-dellospedale-di-scorrano-da-parte-dellassociazione-il-tuo-sorriso-il-nostro-ricordo/', checked: CHECKED, status: EXCERPT },
    gdp: { name: 'Giornale di Puglia', date: 'dicembre 2025', url: 'https://www.giornaledipuglia.com/2025/12/allospedale-veris-delli-ponti-di.html', checked: CHECKED, status: EXCERPT },
    lecceprima: { name: 'LeccePrima', date: '12/12/2025 (dall’indirizzo)', url: 'https://www.lecceprima.it/salute/donazione-reparto-scorrano-12-dicembre-2025.html', checked: CHECKED, status: EXCERPT },
    grecia: { name: 'Grecìa ta nea-ma', date: '11/06/2024', url: 'https://greciataneama.it/news/notizie/sport/il-tuo-sorriso-il-nostro-ricordo-a-martano-to/40', checked: CHECKED, status: 'articolo indicizzato consultato tramite ricerca web; 11/06/2024' }
  };

  window.SITE_DATA = {
    initiatives: [
      {
        slug: 'contributo-colposcopio-io-non-mollo', status: 'published', title: 'Un contributo per la diagnosi precoce', dateLabel: 'Data da confermare', date: '0000-01', place: 'Associazione Io Non Mollo',
        summary: 'L\'associazione ha contribuito all\'acquisto di un colposcopio destinato alla diagnosi precoce, sostenendo l\'iniziativa promossa da Io Non Mollo.', items: ["Contributo all'acquisto di un colposcopio"], purpose: 'Sostenere strumenti per la prevenzione e la diagnosi precoce',
        body: ["Tra le cause sostenute figura il contributo all'acquisto di un colposcopio per la diagnosi precoce, nell'ambito di un'iniziativa dell'associazione Io Non Mollo.","L'informazione è riportata nella presentazione ufficiale dell'associazione «Il Tuo Sorriso Il Nostro Ricordo» (pagina 4). La data e ulteriori dettagli dell'iniziativa non sono specificati nel documento."], relatedEvent: null, image: '../assets/contenuti/contributo-colposcopio-io-non-mollo.svg',
        sources: [], notes: ['Fonte: presentazione fornita dall’associazione, pagina 4. Data e fotografie originali da confermare.']
      },
      {
        slug: 'sostegno-fratres-martano', status: 'published', title: 'Un sostegno alla sede operativa FRATES Martano', dateLabel: 'Data da confermare', date: '0000-02', place: 'FRATES Martano',
        summary: 'Un contributo per aiutare a mantenere operativa la sede FRATES sul territorio di Martano.', items: ["Copertura delle spese della sede operativa"], purpose: 'Sostegno alla continuità delle attività della sede sul territorio',
        body: ["L'associazione ha sostenuto FRATES Martano contribuendo alla copertura delle spese necessarie per mantenere operativa la sede sul territorio.","La presentazione associativa descrive questo intervento tra le donazioni effettuate (pagina 4), senza precisare la data."], relatedEvent: null, image: '../assets/contenuti/sostegno-fratres-martano.svg',
        sources: [], notes: ['Fonte: presentazione fornita dall’associazione, pagina 4. Data e fotografie originali da confermare.']
      },
      {
        slug: 'sostegno-pediatria-lecce', status: 'published', title: 'Un gesto di vicinanza al reparto pediatrico di Lecce', dateLabel: 'Data da confermare', date: '0000-03', place: 'Ospedale di Lecce · Reparto Pediatrico',
        summary: 'Sostegno all\'associazione interna del reparto pediatrico, guidata dalla primaria e affiancata da volontari.', items: ["Donazione a favore dell'associazione interna al reparto"], purpose: 'Supporto all\'attività solidale nel reparto pediatrico',
        body: ["Il documento dell'associazione racconta un contributo destinato all'associazione interna del reparto pediatrico dell'Ospedale di Lecce, guidata dalla primaria con il supporto dei volontari.","La cifra riportata nella descrizione della pagina 4 differisce da quella rappresentata nel grafico a pagina 5. Per evitare di pubblicare un importo ambiguo, il valore resta da verificare con l'associazione."], relatedEvent: null, image: '../assets/contenuti/sostegno-pediatria-lecce.svg',
        sources: [], notes: ['Fonte: presentazione fornita dall’associazione, pagina 4. Data e fotografie originali da confermare.']
      },
      {
        slug: 'piccolo-guerriero-sostegno', status: 'published', title: 'Una serata per Il Piccolo Guerriero', dateLabel: 'Data da confermare', date: '0000-04', place: 'Luogo da confermare',
        summary: 'Una serata solidale organizzata per sostenere un bambino impegnato in un lungo percorso di cure oncologiche.', items: ["Raccolta solidale attraverso una serata dedicata"], purpose: 'Sostenere il percorso di cura del bambino e la sua famiglia',
        body: ["Fra le iniziative benefiche documentate dall'associazione figura «Il Piccolo Guerriero», una serata organizzata per sostenere un bambino che, secondo il documento, aveva affrontato 73 cicli di cure.","Per tutelare la riservatezza del minore, non vengono riportati dati identificativi. La data e il luogo dell'iniziativa non sono specificati nel documento."], relatedEvent: null, image: '../assets/contenuti/piccolo-guerriero-sostegno.svg',
        sources: [], notes: ['Fonte: presentazione fornita dall’associazione, pagina 4. Data e fotografie originali da confermare.']
      },
      {
        slug: 'donazione-spdc-scorrano-2025',
        status: 'published',
        title: 'Un gesto concreto per il reparto di Psichiatria di Scorrano',
        dateLabel: 'Dicembre 2025',
        date: '2025-12',
        place: 'Ospedale Veris Delli Ponti, Scorrano (LE)',
        summary: 'Grazie alle iniziative della comunità, l’associazione ha donato televisori, un amplificatore stereo e un biliardino al reparto di Psichiatria dell’ospedale di Scorrano, contribuendo a rendere più accoglienti i momenti di quotidianità e condivisione.',
        items: ['Televisori, con i relativi supporti', 'Un amplificatore stereo', 'Un biliardino'],
        purpose: 'Attività ricreative, quotidianità e socializzazione delle persone ricoverate',
        body: [
          'Le giornate in un reparto ospedaliero sono fatte anche di tempo libero: un film da guardare insieme, la musica, una partita. È da qui che è partita l’idea dell’associazione per il Servizio Psichiatrico di Diagnosi e Cura (SPDC) dell’Ospedale Veris Delli Ponti di Scorrano.',
          'Con quanto raccolto durante gli eventi dell’estate 2025 l’associazione ha acquistato e donato al reparto dei televisori con i relativi supporti, un amplificatore stereo e un biliardino: strumenti semplici, pensati per gli spazi comuni e per i momenti di svago e di incontro tra le persone ricoverate.',
          'La consegna è avvenuta a dicembre 2025, con una cerimonia in reparto alla presenza del personale sanitario e di rappresentanti delle istituzioni locali.'
        ],
        timeline: [
          { when: 'Estate 2025', what: 'Eventi estivi di raccolta fondi organizzati dall’associazione' },
          { when: '21 agosto 2025', what: 'Memorial 2025, ultimo appuntamento dell’estate', event: 'memorial-2025' },
          { when: 'Dicembre 2025', what: 'Cerimonia di consegna dei materiali in reparto' }
        ],
        relatedEvent: 'memorial-2025',
        image: '../assets/contenuti/beneficenza-scorrano-2025.svg', // visual editoriale originale; foto della consegna ancora da autorizzare
        sources: [SRC.gallo, SRC.cs1, SRC.cs2, SRC.agenparl, SRC.gdp, SRC.lecceprima],
        notes: ['Il PDF dell’associazione indica 9 televisori; precedenti appunti citavano 8. Verificare il numero prima della pubblicazione.', 'Il valore economico riportato dalla stampa non viene pubblicato per scelta del committente.']
      }
    ],

    events: [
      {
        slug: 'memorial-2025',
        status: 'published',
        kind: 'Raccolta fondi', // tipo di evento (etichetta della card)
        title: 'Memorial 2025',
        date: '2025-08-21',
        day: '21', monthYear: 'agosto 2025',
        place: null, // nessuna fonte riporta il luogo
        summary: 'Una giornata di incontro e memoria, al termine delle iniziative estive che hanno sostenuto il progetto solidale destinato all’ospedale di Scorrano.',
        body: [
          'Il Memorial del 21 agosto 2025 ha chiuso il calendario degli eventi estivi dell’associazione.',
          'Gli eventi di quell’estate sono serviti a raccogliere i fondi con cui, a dicembre 2025, l’associazione ha donato televisori, un amplificatore stereo e un biliardino al reparto di Psichiatria dell’Ospedale di Scorrano. Il Memorial è quindi una tappa della raccolta fondi, non una donazione a sé.'
        ],
        poster: '../assets/contenuti/memorial-2025.svg', // visual editoriale originale, non locandina storica
        initiative: 'donazione-spdc-scorrano-2025',
        initiativeRelation: 'Raccolta fondi per',
        album: 'memorial-2025',
        sources: [SRC.gallo, SRC.agenparl, SRC.lecceprima],
        provisional: ['nome ufficiale dell’evento', 'luogo', 'programma', 'locandina']
      },
      {
        slug: 'torneo-calcio-6-simone-2024',
        kind: 'Sport e ricordo',
        status: 'published', // Evento documentato dalla testata Grecìa ta nea-ma; confermare eventuali dettagli organizzativi
        title: 'Torneo di calcio a 6 — In ricordo di Simone',
        date: '2024-06-17',
        day: '17', monthYear: 'giugno 2024',
        place: 'Impianto sportivo “Peppino Impastato”, via Stomeo, Martano',
        summary: 'A Martano, un torneo di calcio a sei per ritrovarsi attraverso lo sport e custodire il ricordo di Simone.',
        body: [
          'La testata Grecìa ta nea-ma annunciava per il 17 giugno 2024 l’inizio del torneo di calcio a 6 «Il Tuo sorriso il nostro ricordo», dedicato a Simone Surdo presso l’impianto sportivo «Peppino Impastato» di via Stomeo, a Martano.',
          'L’appuntamento era inserito nel calendario comunale della Giornata dello Sport e rappresentava un momento di incontro e di ricordo attraverso il calcio. La notizia annuncia il torneo, ma non ne documenta il risultato finale.'
        ],
        poster: '../assets/contenuti/torneo-calcio-2024.svg', // visual editoriale originale, non locandina storica
        initiative: null,
        album: null,
        sources: [SRC.grecia],
        provisional: ['ruolo preciso dell’associazione nell’organizzazione', 'esito del torneo', 'locandina ufficiale originale']
      }
    ],

    /* Album: nessuna foto reale. In Fase B arriveranno da Google Drive.
       Elenco come in feature/completamento-mockup (interfaccia galleria approvata):
       Memorial con foto segnaposto dichiarate + album fittizi di prova, tutti nel catalogo. */
    albums: [
      { slug: 'memorial-2025', name: 'Memorial 2025', dateLabel: '21 agosto 2025', event: 'memorial-2025', published: true, demoCount: 48, demo: true,
        note: 'Album collegato all’evento reale; le foto sono segnaposto dimostrativi.' },
      { slug: 'demo-album-grande', name: 'Album dimostrativo: tante foto', dateLabel: null, event: null, published: true, demoCount: 240, demo: true, fictional: true,
        note: 'Album FITTIZIO per provare il caricamento a blocchi di un album molto grande.' },
      { slug: 'demo-album-vuoto', name: 'Album dimostrativo: in preparazione', dateLabel: null, event: null, published: true, demoCount: 0, demo: true, fictional: true,
        note: 'Album FITTIZIO per mostrare lo stato “nessuna foto ancora”.' },
      { slug: 'demo-non-pubblicato', name: 'Album non pubblicato', dateLabel: null, event: null, published: false, demoCount: 12, demo: true, fictional: true,
        note: 'Non compare nel catalogo: aprendo il link diretto si vede lo stato “album non disponibile”.' }
    ],

    /* Carosello Beneficenza in Home.
       mode 'mockup'     → iniziative reali + schede DEMO, controlli sempre visibili (predefinita in questa fase)
       mode 'produzione' → solo iniziative pubblicate; frecce e indicatori nascosti solo se la card è una
       (anteprima senza modificare questo file: index.html?carosello=produzione) */
    carousel: { mode: 'produzione' },

    /* Schede DEMO del carosello: servono solo a verificarne il funzionamento.
       Non sono attività dell'associazione e non hanno articolo collegato. */
    demoInitiatives: [
      { slug: 'demo-1', demo: true, title: 'DEMO — Titolo di una futura iniziativa', dateLabel: 'DEMO', place: 'Luogo da definire',
        image: '../assets/demo/carosello-demo-1.svg',
        summary: 'Testo segnaposto: qui comparirà la descrizione di una nuova iniziativa benefica, quando l’associazione la avrà realizzata e documentata.', items: [], sources: [] },
      { slug: 'demo-2', demo: true, title: 'DEMO — Un’altra iniziativa di esempio', dateLabel: 'DEMO', place: 'Luogo da definire',
        image: '../assets/demo/carosello-demo-2.svg',
        summary: 'Testo segnaposto: scheda di esempio con lo stesso layout delle iniziative reali, usata solo per provare il carosello.', items: [], sources: [] }
    ]
  };
})();
