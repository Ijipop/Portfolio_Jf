# Guide d'utilisation du système de thème

## Architecture simplifiée

Le système de thème est maintenant **unifié et simplifié** :

1. **`app/design-system/themes.ts`** : Source unique de vérité pour tous les thèmes
2. **`app/hooks/useThemeColors.ts`** : Hook unifié pour accéder aux couleurs
3. **`app/components/ThemeSelector.tsx`** : Définit uniquement les CSS variables (pas de manipulation DOM)
4. **Tous les composants** : Utilisent `useThemeColors()` pour leurs styles

## Comment utiliser le système

### 1. Dans n'importe quel composant

```typescript
import { useThemeColors } from '../hooks/useThemeColors'
import { useTheme } from '@mui/material/styles'

function MonComposant() {
  const { primary, secondary, accent } = useThemeColors()
  const theme = useTheme()
  
  return (
    <Box
      sx={{
        border: `2px solid ${primary}30`,
        background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
        color: primary,
        '&:hover': {
          border: `2px solid ${primary}50`,
          boxShadow: `0 4px 12px ${primary}40`
        }
      }}
    >
      {/* Contenu */}
    </Box>
  )
}
```

### 2. Pour convertir hex en rgba (utile pour les opacités)

```typescript
const hexToRgba = (hex: string, alpha: number) => {
  const r = parseInt(hex.slice(1, 3), 16)
  const g = parseInt(hex.slice(3, 5), 16)
  const b = parseInt(hex.slice(5, 7), 16)
  return `rgba(${r}, ${g}, ${b}, ${alpha})`
}

// Utilisation
const shadow = `0 4px 12px ${hexToRgba(primary, 0.4)}`
```

### 3. Règles importantes

✅ **À FAIRE** :
- Utiliser `useThemeColors()` dans tous les composants
- Utiliser les couleurs du thème pour les bordures, ombres, backgrounds
- Utiliser `hexToRgba()` pour les opacités
- Laisser React gérer les styles via `sx` prop

❌ **À ÉVITER** :
- Ne PAS utiliser de couleurs codées en dur (`#ff6b35`, `#3b82f6`, etc.)
- Ne PAS manipuler le DOM directement avec `setProperty` ou `style.setProperty`
- Ne PAS utiliser `!important` sauf cas exceptionnel (override de styles inline externes)
- Ne PAS créer de styles inline avec `setTimeout` ou `MutationObserver`

## Exemples par type de composant

### Titres et textes

```typescript
<Typography
  sx={{
    color: primary,
    textShadow: `0 0 20px ${hexToRgba(primary, 0.8)}`,
  }}
>
  Mon titre
</Typography>
```

### Cartes et conteneurs

```typescript
<Box
  sx={{
    background: theme.palette.mode === 'dark'
      ? GRADIENTS.cards.dark
      : GRADIENTS.cards.light,
    border: `2px solid ${primary}30`,
    boxShadow: `0 8px 32px ${hexToRgba(primary, 0.2)}`,
  }}
>
  {/* Contenu */}
</Box>
```

### Boutons et chips

```typescript
<Chip
  sx={{
    background: `linear-gradient(135deg, ${primary} 0%, ${secondary} 100%)`,
    color: 'white',
    border: `2px solid ${primary}`,
    boxShadow: `0 4px 12px ${hexToRgba(primary, 0.4)}`,
  }}
/>
```

### Icônes

```typescript
<Icon
  sx={{
    color: primary,
    filter: `drop-shadow(0 0 8px ${hexToRgba(primary, 0.5)})`,
  }}
/>
```

## Comment ajouter un nouveau thème

1. Ajouter le thème dans `app/design-system/themes.ts` :

```typescript
export const THEMES = {
  // ... thèmes existants
  nouveauTheme: {
    name: 'Nouveau Thème',
    primary: '#couleur1',
    secondary: '#couleur2',
    accent: '#couleur3',
    bg: '#background1',
    bg2: '#background2',
  },
} as const
```

2. Ajouter le thème dans `themeDisplayOrder` de `ThemeSelector.tsx` :

```typescript
const themeDisplayOrder: ThemeName[] = [
  'default', 
  'sunset', 
  'neon', 
  'ocean', 
  'forest', 
  'cyber',
  'nouveauTheme' // Nouveau thème
]
```

C'est tout ! Le système s'adapte automatiquement.

## Avantages de cette approche

✅ **Cohérence** : Tous les composants utilisent la même source de couleurs
✅ **Réactivité** : Les changements de thème se propagent automatiquement
✅ **Maintenabilité** : Un seul endroit à modifier pour ajouter un thème
✅ **Performance** : Pas de manipulation DOM lourde, juste des CSS variables
✅ **Type-safe** : TypeScript garantit la cohérence des types


