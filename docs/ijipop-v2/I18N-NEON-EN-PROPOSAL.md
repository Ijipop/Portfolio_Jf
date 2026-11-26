# Proposition — traductions éditoriales EN pour projets Neon

**Statut :** **REJETÉE / NON RETENUE** (décision éditoriale 2026-11-26).  
**Ne pas implémenter.**  
**Branche :** `feat/ijipop-v2-i18n`

## Décision utilisateur

Les `Project.name` et `Project.description` provenant de Neon **peuvent rester en français** lorsque le site est affiché en anglais.

- Ce n’est **pas** un bug.
- Ce n’est **pas** un blocage à l’activation FR/EN Production.
- Affichage = données **telles qu’enregistrées** dans l’admin.
- Aucune migration Neon / Prisma / API / admin.
- Aucune couche de traduction supplémentaire côté code.
- L’utilisateur pourra éventuellement saisir des contenus bilingues lui-même dans l’administration.

Voir aussi : `I18N-PHASE-E-REPORT.md` §4.

---

## Archive — proposition technique (non appliquée)

> Conservée pour historique uniquement. Ne pas brancher `ProjectCard` ni créer `projectLocaleOverrides.ts`.

### Constat (historique)

Le schéma Prisma `Project` expose `name` et `description` sans champs EN dédiés.  
Le catalogue V2 affichait (et continue d’afficher) ces valeurs brutes.

### Solution minimale qui avait été proposée

Fichier d’overrides éditoriaux indexé par identifiant stable (`lib/public-v2/projectLocaleOverrides.ts`), sans migration DB — **non retenue**.

### Alternatives écartées

| Option | Notes |
|--------|--------|
| Colonnes `nameEn` / `descriptionEn` Neon | Migration + admin |
| Traduction auto | Qualité / coût refusés |
| Masquer les projets sans EN | Perte de contenu catalogue |
| **Overrides fichier (cette proposition)** | **Rejetée** au profit de l’affichage tel quel + gestion admin future |
