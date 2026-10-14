/* MOCKUP Fase A.2 — catalogo contenuti unico per tutte le pagine.
   Rispecchia lo schema di docs/ARCHITETTURA_PROPOSTA.md (initiatives, events, albums).
   Ogni campo non verificato è marcato `provisional` e viene mostrato come tale.
   Fonti e grado di verifica: docs/FONTI_CONTENUTI_MOCKUP.md */
window.SITE_DATA = {
  initiatives: [
    {
      slug: 'donazione-spdc-scorrano-2025',
      title: 'Televisori, musica e un biliardino per il reparto di Psichiatria',
      dateLabel: 'Dicembre 2025',
      date: '2025-12',
      place: 'Ospedale “Veris Delli Ponti”, Scorrano (LE)',
      summary: 'Televisori, un amplificatore stereo e un biliardino donati al reparto di Psichiatria (SPDC) per il benessere, lo svago e la socializzazione delle persone ricoverate.',
      items: ['Televisori con i relativi supporti', 'Un amplificatore stereo', 'Un biliardino'],
      body: [
        'Nel dicembre 2025 l’associazione ha consegnato al Servizio Psichiatrico di Diagnosi e Cura (SPDC) dell’Ospedale “Veris Delli Ponti” di Scorrano una serie di materiali pensati per la vita quotidiana del reparto: televisori, un amplificatore stereo e un biliardino.',
        'L’obiettivo è sostenere il benessere, lo svago e la socializzazione delle persone ricoverate, rendendo più accogliente l’ambiente in cui trascorrono il periodo di cura.',
        'Le risorse sono state raccolte durante gli eventi dell’estate 2025, culminati con il Memorial del 21 agosto. La consegna è avvenuta nel corso di una cerimonia in reparto, alla presenza del personale sanitario e di rappresentanti delle istituzioni locali.'
      ],
      relatedEvent: 'memorial-2025',
      image: null, // foto autorizzata da fornire (nessun paziente riconoscibile)
      sources: [
        { name: 'Il Gallo', date: '12/12/2025', url: 'https://www.ilgallo.it/attualita/ospedale-di-scorrano-il-tuo-sorriso-il-nostro-ricordo/' },
        { name: 'Corriere Salentino', date: 'dicembre 2025', url: 'https://www.corrieresalentino.it/2025/12/donazione-al-reparto-di-psichiatria-dellospedale-di-scorrano-da-parte-dellassociazione-il-tuo-sorriso-il-nostro-ricordo/' },
        { name: 'Corriere Salentino', date: '14/12/2025', url: 'https://www.corrieresalentino.it/2025/12/allospedale-veris-delli-ponti-di-scorrano-la-cerimonia-di-donazione-dellassociazione-il-tuo-sorriso-il-nostro-ricordo/' },
        { name: 'Agenparl (comunicato ASL Lecce)', date: '12/12/2025', url: 'https://agenparl.eu/2025/12/12/asl-lecce-donazione-al-reparto-di-psichiatria-dellospedale-di-scorrano-da-parte-dellassociazione-il-tuo-sorriso-il-nostro-ricordo/' }
      ],
      provisional: ['testo da approvare con l’associazione', 'immagine da fornire']
    }
  ],

  events: [
    {
      slug: 'memorial-2025',
      title: 'Memorial 2025',
      date: '2025-08-21',
      day: '21', monthYear: 'agosto 2025',
      place: null, // luogo non riportato dalle fonti consultate
      summary: 'La serata che ha concluso gli eventi dell’estate 2025 dell’associazione.',
      body: [
        'Il Memorial del 21 agosto 2025 ha chiuso il calendario degli eventi estivi organizzati dall’associazione.',
        'Secondo la stampa locale, le risorse raccolte durante quegli eventi hanno permesso la donazione di dicembre 2025 al reparto di Psichiatria dell’Ospedale di Scorrano.'
      ],
      poster: null, // locandina da fornire con autorizzazione
      initiative: 'donazione-spdc-scorrano-2025',
      album: 'memorial-2025',
      provisional: ['nome ufficiale dell’evento', 'luogo', 'programma', 'locandina']
    }
  ],

  /* Album: le foto sono SEGNAPOSTO generati. In Fase B arriveranno da Google Drive. */
  albums: [
    { slug: 'memorial-2025', name: 'Memorial 2025', dateLabel: '21 agosto 2025', event: 'memorial-2025', published: true, demoCount: 48, demo: true,
      note: 'Album collegato all’evento reale; le foto sono segnaposto dimostrativi.' },
    { slug: 'demo-album-grande', name: 'Album dimostrativo: tante foto', dateLabel: null, event: null, published: true, demoCount: 240, demo: true, fictional: true,
      note: 'Album FITTIZIO per provare il caricamento a blocchi di un album molto grande.' },
    { slug: 'demo-album-vuoto', name: 'Album dimostrativo: in preparazione', dateLabel: null, event: null, published: true, demoCount: 0, demo: true, fictional: true,
      note: 'Album FITTIZIO per mostrare lo stato “nessuna foto ancora”.' },
    { slug: 'demo-non-pubblicato', name: 'Album non pubblicato', dateLabel: null, event: null, published: false, demoCount: 12, demo: true, fictional: true,
      note: 'Non compare nel catalogo: aprendo il link diretto si vede lo stato “album non disponibile”.' }
  ]
};
