# Skill e tool proposti — esame del 14/10/2026

Repository clonati in sola lettura (`git clone --depth 1`) e letti; **nulla installato o eseguito**.

| Risorsa | Licenza | Cosa contiene davvero | Uso nel progetto | Note / conflitti |
|---|---|---|---|---|
| **UI UX Pro Max** (nextlevelbuilder) | MIT | Skill `ui-ux-pro-max` + banche dati ricercabili (stili, 192 palette, 74 abbinamenti di font, linee guida UX) | Controllo di gerarchia, responsive, checklist UX | Le sue palette e i font **non** sostituiscono quelli di `DESIGN.md` |
| **Awesome DESIGN.md** (VoltAgent) | MIT | Raccolta di file DESIGN.md di siti noti | Riferimento per la struttura del nostro `DESIGN.md` | Non copiare lo stile dei siti raccolti |
| **Taste Skill** (Leonxlnx) | MIT | Skill `design-taste-frontend` (v2): direzioni artistiche, regole “anti-template”, script di ispezione nel browser, ciclo screenshot→correzione | Revisione dell'originalità delle composizioni | Lo script “pesca” direzioni casuali: qui la direzione è **già decisa** (creativo e dinamico + palette). Usare solo la parte di revisione. Comando attuale dal README: `npx skills add https://github.com/Leonxlnx/taste-skill` (il comando breve del prompt va verificato al momento) |
| **Impeccable** (pbakaus) | Apache 2.0 | Skill con comandi `audit`, `critique`, `polish`, `animate`, `typeset`, `harden`… | Audit e rifinitura dei mockup e poi del codice | Spinge verso scelte “audaci”: usarlo per audit/polish, non per cambiare la direzione approvata |
| **Emil Kowalski Skills** | MIT | `animate`, `review-animations`, `improve-animations`, vocabolario del motion | Coreografia dell'intro, revisione dei movimenti | Pienamente coerente con `DESIGN.md` §6 |
| **Playwright** | Apache 2.0 | Test E2E e screenshot | Già usato per gli screenshot dei mockup (Chromium); in Fase B anche WebKit | Strumento di test, non fonte di stile |
| **img2threejs** | Apache 2.0 | Conversione immagini → scene Three.js | **Non usato** | Aggiungerebbe peso senza beneficio per la prima versione |
| **Formazione** (repo utente) | — | **Ora accessibile**: materiali di corsi (Figma, UX, accessibilità WCAG 2.2, React/Redux, microservizi, Spring, sicurezza) | Riferimento personale | Nessuna skill eseguibile |
| **Skill-programmazione-** (repo utente) | — | Skill: `ui-ux-design`, `react-development`, `react-state-redux`, `java-spring-review`, `microservices-architecture`, `docker-kubernetes-devops` | `ui-ux-design` e `react-development` utili (sono già disponibili in questa sessione) | Java/Spring e microservizi **non pertinenti**: lo stack è React + Node, monolite semplice |

## Ordine d'uso consigliato

1. Fase A: `DESIGN.md` di progetto → `ui-ux-design` / UI UX Pro Max per le checklist → Emil Kowalski per l'intro → Impeccable `critique`/`audit` sui mockup.
2. Fase B: `react-development` → Impeccable `polish`/`harden` → Playwright (Chromium, Firefox, WebKit).

Regola: se una skill suggerisce colori, font o layout diversi da `DESIGN.md`, vince `DESIGN.md`.
