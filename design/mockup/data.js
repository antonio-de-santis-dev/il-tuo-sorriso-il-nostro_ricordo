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
    grecia: { name: 'Grecìa ta nea-ma', date: '11/06/2024', url: 'https://greciataneama.it/news/notizie/sport/il-tuo-sorriso-il-nostro-ricordo-a-martano-to/40', checked: CHECKED, status: BLOCKED + ' (dati dalla ricerca preliminare del committente)' }
  };

  window.SITE_DATA = {
    initiatives: [
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
        image: null, // foto autorizzata da fornire (nessun paziente riconoscibile)
        sources: [SRC.gallo, SRC.cs1, SRC.cs2, SRC.agenparl, SRC.gdp, SRC.lecceprima],
        notes: ['Numero dei televisori non indicato: la stampa ne riporta 9, una documentazione citata nella ricerca preliminare 8.', 'Il valore economico riportato dalla stampa non viene pubblicato per scelta del committente.']
      }
    ],

    events: [
      {
        slug: 'memorial-2025',
        status: 'published',
        title: 'Memorial 2025',
        date: '2025-08-21',
        day: '21', monthYear: 'agosto 2025',
        place: null, // nessuna fonte riporta il luogo
        summary: 'Una giornata di incontro e memoria, al termine delle iniziative estive che hanno sostenuto il progetto solidale destinato all’ospedale di Scorrano.',
        body: [
          'Il Memorial del 21 agosto 2025 ha chiuso il calendario degli eventi estivi dell’associazione.',
          'Gli eventi di quell’estate sono serviti a raccogliere i fondi con cui, a dicembre 2025, l’associazione ha donato televisori, un amplificatore stereo e un biliardino al reparto di Psichiatria dell’Ospedale di Scorrano. Il Memorial è quindi una tappa della raccolta fondi, non una donazione a sé.'
        ],
        poster: null,
        initiative: 'donazione-spdc-scorrano-2025',
        initiativeRelation: 'Raccolta fondi per',
        album: 'memorial-2025',
        sources: [SRC.gallo, SRC.agenparl, SRC.lecceprima],
        provisional: ['nome ufficiale dell’evento', 'luogo', 'programma', 'locandina']
      },
      {
        slug: 'torneo-calcio-6-simone-2024',
        status: 'draft', // NON pubblicabile finché l'associazione non conferma
        title: 'Torneo di calcio a 6 — In ricordo di Simone',
        date: '2024-06-17',
        day: '17', monthYear: 'giugno 2024',
        place: 'Impianto sportivo “Peppino Impastato”, via Stomeo, Martano',
        summary: 'A Martano, un torneo di calcio a sei per ritrovarsi attraverso lo sport e custodire il ricordo di Simone.',
        body: [
          'Secondo una notizia locale dell’11 giugno 2024, il torneo è iniziato il 17 giugno 2024 all’impianto sportivo “Peppino Impastato” di Martano, nell’ambito delle iniziative locali legate alla Giornata dello Sport.',
          'Non è ancora confermato il ruolo dell’associazione nell’organizzazione: per questo la scheda resta una bozza e non compare nelle pagine pubbliche.'
        ],
        poster: null,
        initiative: null,
        album: null,
        sources: [SRC.grecia],
        provisional: ['ruolo dell’associazione nell’organizzazione', 'autorizzazione alla pubblicazione', 'esito del torneo', 'locandina']
      }
    ],

    /* Album: nessuna foto reale. In Fase B arriveranno da Google Drive.
       reviewOnly = album fittizi per provare le funzioni della galleria: fuori dal catalogo pubblico,
       visibili solo in revisione (foto.html?demo=1). */
    albums: [
      { slug: 'memorial-2025', name: 'Memorial 2025', dateLabel: '21 agosto 2025', event: 'memorial-2025', published: true, preview: true, demoCount: 0,
        note: 'Anteprima: le foto dell’evento non sono ancora state caricate.' },
      { slug: 'demo-album-grande', reviewOnly: true, name: 'Album dimostrativo: tante foto', dateLabel: null, event: null, published: true, demoCount: 240, fictional: true,
        note: 'Album FITTIZIO con foto segnaposto, per provare griglia, selezione, visualizzatore e caricamento a blocchi.' },
      { slug: 'demo-album-vuoto', reviewOnly: true, name: 'Album dimostrativo: in preparazione', dateLabel: null, event: null, published: true, demoCount: 0, fictional: true,
        note: 'Album FITTIZIO per mostrare lo stato “nessuna foto ancora”.' },
      { slug: 'demo-non-pubblicato', name: 'Album non pubblicato', dateLabel: null, event: null, published: false, demoCount: 12, fictional: true,
        note: 'Non compare nel catalogo: aprendo il link diretto si vede lo stato “album non disponibile”.' }
    ],

    /* Schede per studiare il carosello con più card (index.html?demo=carosello). Mai pubblicabili. */
    demoInitiatives: [
      { slug: 'demo-1', demo: true, title: 'Scheda dimostrativa', dateLabel: 'DEMO', place: 'Nessuna iniziativa reale', summary: 'Serve solo a vedere il carosello con più schede. Non è un contenuto dell’associazione.', items: [], sources: [] },
      { slug: 'demo-2', demo: true, title: 'Scheda dimostrativa', dateLabel: 'DEMO', place: 'Nessuna iniziativa reale', summary: 'Serve solo a vedere il carosello con più schede. Non è un contenuto dell’associazione.', items: [], sources: [] }
    ]
  };
})();
