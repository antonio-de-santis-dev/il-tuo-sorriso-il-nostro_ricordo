# Integrazione contenuti dal PDF dell'associazione

Fonte primaria ricevuta dal committente: `IL TUO SORRISO IL NOSTRO RICORDO.pdf`, 6 pagine. Testi riscritti per il sito rispettandone il significato, senza inventare luoghi o date.

## Materiale acquisito
- **p. 1:** denominazione «Il Tuo Sorriso Il Nostro Ricordo», «Associazione Culturale», Martano.
- **p. 2:** gruppo di giovani tra 20 e 30 anni; ricordo di Simone (incidente stradale andando al lavoro) e Francesca (tumore); missione di trasformare il ricordo in solidarietà. Inserito nella sezione «Chi siamo».
- **p. 3:** serata commemorativa annuale; tornei di calcetto e pallavolo a scopo benefico; eventi di prevenzione e sensibilizzazione in organizzazione. Inserito in «Chi siamo» come attività ricorrenti; **non trasformato in falsi eventi datati**.
- **p. 4:** cinque donazioni/cause: colposcopio (Io Non Mollo), sostegno sede FRATES Martano, reparto pediatrico di Lecce, reparto Psichiatria di Scorrano, Il Piccolo Guerriero. Inserite nel catalogo Beneficenza, carosello e articoli di dettaglio. Le informazioni di Scorrano erano già presenti; mantenuti anche i collegamenti con Memorial 2025.
- **p. 5:** «4+ anni di attività», «5+ cause sostenute», «€7.000+ donati», «sorrisi donati ∞», grafico degli importi. **I numeri economici non sono stati trasferiti sulla Home:** il totale illustrativo 7.000+ del grafico deriva da valori che non concordano interamente con la descrizione di p. 4. Le diciture simboliche e i dati d'impatto restano qui documentati per una successiva sezione approvata.
- **p. 6:** frase conclusiva «Il vostro sorriso vive in ogni cosa che facciamo» e dedica a Simone e Francesca; proposta per il futuro aggiornamento dei ringraziamenti, senza alterare il footer già approvato.

## Discrepanze da chiarire prima della pubblicazione
1. **Pediatria di Lecce:** p. 4 dice **100 €**, grafico di p. 5 dice **1.000 €**.
2. **Scorrano:** il PDF parla di **9 televisori**; note precedenti citavano anche il dato di 8. Nel sito si conserva la descrizione senza numero.
3. Il totale grafico di 7.000 € è coerente con cinque voci sommate a 1.000+1.000+1.000+3.000+1.000, ma non con la descrizione «100 €» della Pediatria. Non pubblicare una cifra riepilogativa finché non confermata.
4. Date precise di quattro iniziative non presenti nel PDF: nel mockup è scritto **«Data da confermare»**, non si attribuisce un anno.
5. Il documento descrive un minore malato: evitare foto identificative e dati personali non autorizzati.

## File e funzionalità
- `design/mockup/data.js`: quattro nuove iniziative + quella di Scorrano, carosello impostato a iniziative reali; nuove schede generano automaticamente le pagine tramite gli slug.
- `design/mockup/index.html`: Chi siamo, storia e attività.
- `design/mockup/pages.js`: raggruppamento «Da datare» per iniziative senza data.
- `design/assets/contenuti/*.svg`: quattro illustrazioni editoriali originali per le card (non fotografie di eventi).
- Le sezioni Eventi, Galleria e Album non sono state cambiate.

## Per completare il lavoro
- Richiedere all'associazione foto originali/autorizzate, date e luoghi delle iniziative.
- Confermare eventuali importi prima di creare una sezione «Impatto in numeri».
- Approvare i testi sulla storia e sui beneficiari prima del sito pubblico.
- Eseguire controlli visuali desktop e mobile e test Playwright sulla navigazione (non attestati in questa sessione).

**Nessun merge effettuato.**
