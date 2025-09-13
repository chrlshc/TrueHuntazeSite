Title: Consolidation du Design System (S2)

Objectif
- Réduire et unifier les styles globaux en un design system cohérent
- Supprimer les doublons et CSS de contournement hérités

Stratégie
- Source de vérité: conserver Tailwind + tokens publics sous /public/styles
- Garder dans app/layout.tsx: globals.css + 2–3 feuilles DS max
- Mettre derrière NEXT_PUBLIC_DEV_STYLES tous les CSS de debug/fixes (déjà fait)
- Passer en revue styles/ pour fusionner dans un seul fichier DS (typographie, tokens, helpers)

Étapes
1) Audit des imports CSS dans app/layout.tsx (marquer indispensables vs. legacy)
2) Créer un DS unique (tokens, typographie, utilitaires; dark/light)
3) Migrer les règles actives depuis styles/ vers DS; supprimer doublons
4) Supprimer les CSS non référencés; garder un mode DEV (NEXT_PUBLIC_DEV_STYLES)
5) Vérifications: contrastes AA, focus visible, tailles min tap, responsive

Livrables
- PR 1: Activation du flag DEV (réduction en prod); documentation des feuilles à migrer
- PR 2: DS unifié + nettoyage des imports dans layout.tsx
- PR 3: Revue accessibilité + perf (lazy images, purge)

