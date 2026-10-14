# Architettura proposta (bozza per la revisione tecnica — Fase B)

> Nulla di questo è implementato. Serve per decidere prima di scrivere codice.

## 1. Struttura

```
/client   React + Vite + JavaScript, React Router
/server   Node.js + Express (API, proxy Google Drive, ZIP, cache)
/content  Catalogo contenuti versionato (JSON/Markdown): iniziative, eventi, album, sponsor, impostazioni
/design   Mockup e asset di progetto (questa fase)
/docs     Documentazione
```

**Rendering e SEO:** una SPA pura rende i contenuti invisibili ad alcuni crawler e ai link condivisi (anteprime WhatsApp/Facebook). Proposta: **prerender statico** delle pagine di contenuto al build (Home, iniziative, eventi, elenco album) + Express che serve i file e le API. Le pagine album caricano le foto via API. Alternativa: SSR con il server Express (più complesso). Da decidere in Fase B.

## 2. Contenuti: file o PostgreSQL?

| | Catalogo in file (`/content`) | PostgreSQL |
|---|---|---|
| Quando ha senso | Pochi contenuti, aggiornati raramente da chi gestisce il sito | Più redattori, pannello admin, molti album |
| Costo e manutenzione | Nessun DB da ospitare, backup = git | Hosting DB, backup, migrazioni |
| Storico modifiche | Gratis con git | Da progettare |
| Pannello admin | No (si modifica il file) | Sì |

**Proposta:** prima release con catalogo in file, validato da uno schema all'avvio del server. Lo schema dei dati è già quello relazionale (sotto), quindi passare a PostgreSQL più avanti non cambia le API.

```
initiatives(id, slug*, title, date, dateLabel, place, summary, body, images[], sources[], eventId?, status)
events(id, slug*, title, startsAt, endsAt?, place?, poster, summary, body, status, albumId?)
albums(id, slug*, eventId?, name, date?, cover, driveFolderId, visibility, sortOrder, status)
sponsors(id, name, logo, url?, order, active)
site_settings(socials[], contacts, legalName, texts{...})
```
Slug stabili (mai rigenerati dal titolo dopo la pubblicazione), `status: draft|published`.

## 3. Google Drive

**Drive è la sorgente, non il CDN.** Il server:
1. legge **solo** le cartelle elencate negli album pubblicati (`files.list` con `'<folderId>' in parents and mimeType contains 'image/' and trashed = false`, con paginazione `pageToken`);
2. salva in un indice: ID, nome, dimensioni, data, md5;
3. genera **anteprime** proprie (es. 480 px e 1600 px, WebP/AVIF, con `sharp`) rimuovendo EXIF/GPS; le salva su disco o object storage e le serve con cache lunga;
4. per l'**originale** fa da proxy (`files.get?alt=media`) in streaming, oppure serve una copia ripulita dai metadati sensibili (decisione da prendere con l'associazione);
5. si aggiorna periodicamente (o su richiesta) usando `md5Checksum`/`modifiedTime` per rifare solo ciò che è cambiato.

Credenziali: **solo sul server**, in variabili d'ambiente (mai nel client, mai nel repo).

| Opzione | Quando | Note |
|---|---|---|
| **Service account** + cartella radice condivisa in sola lettura con l'email del service account | Funziona sia con account personale sia Workspace | Il service account vede **solo** ciò che gli viene condiviso. Scelta consigliata. |
| OAuth con refresh token dell'account dell'associazione | Se la condivisione col service account non è possibile | Il token dà accesso a tutto il Drive: usare scope `drive.readonly` e conservarlo con cura. |

Permesso minimo: scope `https://www.googleapis.com/auth/drive.readonly`. Rotazione chiavi documentata. Quote e costi API da verificare al momento dell'attivazione.

## 4. API (orientative)

```
GET  /api/albums                         elenco album pubblicati
GET  /api/albums/:slug                   dettagli + evento collegato
GET  /api/albums/:slug/photos?cursor=    foto paginate (id interni, dimensioni, anteprime)
GET  /api/photos/:id/preview?w=480|1600  anteprima dalla nostra cache
GET  /api/photos/:id/download            originale, Content-Disposition: attachment
POST /api/photos/download-archive        { albumSlug, photoIds[] } → ZIP in streaming
```
Regole:
- Gli `id` sono **interni** (non gli ID Drive). Ogni ID richiesto viene verificato contro l'indice degli album pubblicati: impossibile chiedere file arbitrari.
- ZIP: massimo 50 foto / ~500 MB per richiesta (da tarare sull'hosting), compressione “store” (le JPEG non si comprimono), streaming senza tenere tutto in memoria; per selezioni più grandi il client divide in più ZIP.
- Rate limit per IP su download e ZIP; header di sicurezza (CSP, HSTS, `X-Content-Type-Options`…); log senza segreti né IP completi.
- Errori Drive 403/404/429: retry con backoff per 429/5xx; foto mancante = tile “non disponibile”, mai pagina rotta.

## 5. Frontend

React Router con route da `SITEMAP_E_FLUSSI.md`; scroll alle ancore con offset; stato quasi tutto locale (selezione foto = stato della pagina album, eventualmente nell'URL). Nessuna libreria di stato globale necessaria. Immagini responsive (`srcset`), lazy load, dimensioni esplicite contro il CLS. Font self-hosted.

## 6. Test (Fase B)

Playwright su Chromium, Firefox e **WebKit** (Safari), viewport desktop e iPhone: navigazione e ancore, intro e skip, reduced motion, tastiera e lightbox, selezione e ZIP, album vuoto, API in errore, rete lenta, album con centinaia di foto. Lighthouse/axe per prestazioni e accessibilità.
