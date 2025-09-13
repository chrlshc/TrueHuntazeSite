# Huntaze Platform — Development Plan

## Framework: React, Next.js & Tailwind
- Stack: React + Next.js (App Router) + Tailwind CSS (déjà en place: Next.js 14, Tailwind 3).
- Rationale: SSR/ISR natif, routing simple, design system rapide via Tailwind, continuité avec le code existant.

## Unified Creator Dashboard (Platform Overview)
- Vision: unifier gestion OnlyFans + réseaux sociaux (Instagram, TikTok, Reddit, etc.) dans un seul tableau de bord piloté par IA.
- Parcours: Onboarding guidé → Dashboard → sections dédiées (Analytics, Campaigns, Messages, Fans, Platforms, Settings, Billing).

## Post‑Login Dashboard Features (/dashboard)
- Auth & Redirections: protégé par `middleware.ts` (redirige `/auth` si non connecté, `/onboarding/setup` si onboarding incomplet en prod). En dev local, les checks sont allégés.
- Sections clés (actuel + cible):
  - Onboarding Progress: `ResumeBanner` + `OnboardingChecklist` (profil, plan de vente, activité, plateformes, config IA, plan).
  - Header & Date Filter: titre + sélecteur de période (placeholder, à brancher sur données réelles).
  - Revenue Graph: "Net sales over time" (données simulées → à connecter revenu réel agrégé par jour/semaine/mois).
  - Key Stats Cards: abonnés actifs, messages envoyés, taux d’engagement, contenu créé (icônes, évolution %). Étendre avec revenus/jour et temps de réponse.
  - Top Performing Content/Fans: listing contenus performants ou top fans (dummy aujourd’hui → real data).
  - Quick Actions: créer campagne, générer contenu AI, voir messages, analytics.
- Layout responsive: aperçu global rapide, liens vers pages détaillées.

## Dashboard Variants
- Mobile (`app/dashboard/mobile-page.tsx`):
  - Today’s Earnings (hero), Quick Stats (nouveaux messages, AI automation), Quick Actions (cards tactiles), Top Fans, Connect & Grow (IG/TikTok/Reddit), AI Assistant Status, CTA connect platform.
- OnlyFans views:
  - `app/dashboard/of/page.tsx`: tabs Overview/Messages/Analytics, bannières et cartes OF.
  - `app/dashboard/onlyfans/page.tsx` + `src/components/of/professional-dashboard.tsx` (placeholder à implémenter).

## AI‑Powered Features (Agents IA)
- Assistant DM OnlyFans: réponses AI, upsell/PPV, respect guardrails/compliance, handoff humain si nécessaire.
- Fan Intelligence & Segmentation: RFM (VIP, big spender, at‑risk, dormant, etc.), best times, LTV, churn risk.
- Automated Follow‑ups (Relance): welcome sequences, win‑back, PPV non achetés, inactifs (timing/priority).
- AI Analytics & Anomalies: tendances revenus/engagement, alertes anomalies, recommandations d’actions.
- Objectif: agir comme un « manager virtuel » multi‑plateforme.

## Platform Integrations (Social & Auth)
- Auth SSO: Apple, Google (`/auth/*/callback`), NextAuth/session sécurisée.
- OnlyFans: pas d’OAuth public; flux guidé via page Platforms Connect; intégration lecture/sync et suggestions IA (envoi avec validation humaine).
- TikTok: OAuth (`/auth/tiktok`), statut connecté (mobile), démos upload/diagnostic.
- Instagram: route d’auth (`app/auth/instagram/route.ts`), carte Connect.
- Reddit: carte Connect + variables d’env; intégration prévue pour growth.
- Extensible: architecture prête pour X/Twitter, Fansly, etc.

## Analytics & Marketing Tools
- Revenue & Earnings: breakdown par source/période/segment; cohortes; revenu/fan.
- Fan Metrics: taux réponse, heatmaps activité, prédiction churn, automation rate.
- Content Performance: top posts/PPV, A/B, meilleures fenêtres de post.
- Cross‑Platform Growth: entonnoir IG/TikTok → OF, recommandations hashtags, trend calendar, Reddit helper.
- Campaigns & Messaging Analytics: open/conv/revenue par campagne; auto‑winner à terme.
- État actuel: `/analytics` surtout vitrine (mock) → brancher backend progressivement.

## Security & Access Control
- Routes protégées via middleware (`/dashboard`, `/profile`, `/settings`, `/configure`, `/analytics`, `/messages`, `/campaigns`, `/fans`, `/platforms`, `/billing`, `/social`).
- NextAuth sessions (cookies HttpOnly), OAuth officiels pour socials.
- Données sensibles: stockage chiffré (AES‑256‑GCM visé), 2FA app, audit logs (à implémenter).
- Compliance: respect ToS plateformes, filtrage mots interdits, rate limiting, anti‑détection (automation), human‑in‑the‑loop.
- Environnements: dev allégé (localhost), prod stricte (env vars, secrets, HTTPS).

## Current Data Handling (Prototype)
- Dashboard: métriques/graphes simulés côté client.
- Onboarding: `useOnboarding` + localStorage/cookies.
- API routes: placeholders/mocks; intégrations réelles en cours.
- Dev shortcuts: middleware allégé, états connectés simulés pour UI.

## Backend & Data Storage Options
- Option 1 (préférée): backend séparé `huntaze-api` (Node + Prisma + PostgreSQL), Next.js consomme via REST (`NEXT_PUBLIC_API_URL`). Avantage: tâches lourdes (sync OF, AI jobs) isolées et scalables.
- Option 2: full‑stack Next.js (route handlers + Prisma + Postgres) pour endpoints simples/latence faible. Hybrid possible (quick endpoints côté Next, logique lourde côté API).
- Base de données: PostgreSQL (transactions, relations créateurs/fans/messages/transactions), Prisma ORM.

## Hosting
- Front‑end: Vercel (Next.js natif, preview deploys, edge/middleware). Config déjà présente.
- Backend API: hébergeur cloud/containers (AWS/Render/Heroku), non‑Vercel pour jobs longs et queues (pg‑boss).
- Domaine: front sur Vercel (ex: dashboard.huntaze.com) → API `api.huntaze.com`.

## Project Scope
- Full‑stack: UI/UX + auth + API + DB + intégrations plateformes.
- Front: pages Dashboard/Variants, Messages, Campaigns, Fans, Analytics, Settings; Tailwind; responsive; state & appels API.
- Back: endpoints REST, Prisma models/migrations, OAuth socials, queues jobs (sync, scoring, relances), sécurité/compliance.

## Phasing (MVP → V1)
- MVP UI (déjà bien avancé): dashboard avec données simulées, onboarding, pages features.
- MVP Data: endpoints read‑only (overview, stats cartes, top fans/ppv), intégration OAuth TikTok/IG, état plateformes.
- V1 Automations: scoring RFM/churn, Daily Action List, relances (opt‑in), AI assistant drafts avec validation.
- V1 Analytics: agrégation revenus multi‑plateformes, tendances, anomalies, best times, contenu performant.

## Key Deliverables (near‑term)
- Dashboard desktop: Today’s Money + Daily Action List + AI Status (réel/placeholder relié backend).
- OnlyFans Pro: implémentation `ProfessionalDashboard` (Overview/Messages/Analytics OF).
- API overview: `/analytics/overview`, `/agents/unified/actions`, `/segments/top` (mocks → réel Postgres).
- Sécurité: 2FA app, audit log minimal, durcissement API (Zod/Yup), secrets prod.

---

> Ce plan s’appuie sur le code actuel (Next.js + Tailwind), les routes et composants existants, et formalise les priorités pour brancher progressivement les données réelles (PostgreSQL/Prisma via `huntaze-api`) tout en livrant une expérience cohérente et sécurisée.

