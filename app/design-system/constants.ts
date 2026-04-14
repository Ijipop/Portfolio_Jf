/**
 * Design System Constants
 * Centralisé tous les tokens de design pour une cohérence visuelle
 *
 * Typographie : conventions dans `app/fonts.ts` (Cormorant pour `SectionDisplayTitle`,
 * Inter pour le corps via le thème, `CTAButton` en sans-serif gras).
 */

export const DESIGN_TOKENS = {
  // Border Radius
  borderRadius: {
    small: 12,
    medium: 16,
    large: 24,
    xlarge: 32,
  },

  // Transitions
  transitions: {
    fast: '0.2s ease',
    normal: '0.3s ease',
    slow: '0.4s cubic-bezier(0.4, 0, 0.2, 1)',
    slower: '0.6s ease',
  },

  // Shadows
  shadows: {
    card: {
      light: '0 4px 20px rgba(148, 163, 184, 0.08), 0 0 0 1px rgba(148, 163, 184, 0.05)',
      dark: '0 15px 50px rgba(0, 0, 0, 0.6), 0 0 20px rgba(74, 85, 104, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.1)',
    },
    cardHover: {
      light: '0 20px 40px rgba(59, 130, 246, 0.15), 0 0 20px rgba(147, 197, 253, 0.1), inset 0 1px 0 rgba(255, 255, 255, 0.8)',
      dark: '0 30px 60px rgba(0, 0, 0, 0.7), 0 0 30px rgba(74, 85, 104, 0.3), inset 0 1px 0 rgba(255, 255, 255, 0.2)',
    },
    elevated: {
      light: '0 8px 32px rgba(0, 0, 0, 0.1)',
      dark: '0 8px 32px rgba(0, 0, 0, 0.3)',
    },
  },

  // Spacing (système 8px pour cohérence professionnelle)
  spacing: {
    xs: 1,      // 8px
    sm: 2,      // 16px
    md: 3,      // 24px
    lg: 4,      // 32px
    xl: 6,      // 48px
    xxl: 8,     // 64px
    xxxl: 12,   // 96px
  },
  
  // Typography scale (hiérarchie professionnelle)
  typography: {
    h1: {
      fontSize: { xs: '2rem', sm: '2.5rem', md: '3rem' }, // 32px, 40px, 48px
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h2: {
      fontSize: { xs: '1.75rem', sm: '2rem', md: '2.25rem' }, // 28px, 32px, 36px
      fontWeight: 600,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h3: {
      fontSize: { xs: '1.5rem', sm: '1.75rem', md: '1.875rem' }, // 24px, 28px, 30px
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h4: {
      fontSize: { xs: '1.25rem', sm: '1.5rem', md: '1.5rem' }, // 20px, 24px, 24px
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h5: {
      fontSize: '1.25rem', // 20px
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.125rem', // 18px
      fontWeight: 600,
      lineHeight: 1.5,
    },
    body1: {
      fontSize: '1rem', // 16px
      fontWeight: 400,
      lineHeight: 1.6,
    },
    body2: {
      fontSize: '0.875rem', // 14px
      fontWeight: 400,
      lineHeight: 1.6,
    },
  },

  // Z-Index layers
  zIndex: {
    background: 0,
    base: 1,
    elevated: 2,
    overlay: 10,
    modal: 1000,
    floatingTag: 3,
    stickyBar: 1100,
    floatingAction: 1110,
    introOverlay: 1400,
  },
} as const

// Gradients standards
export const GRADIENTS = {
  backgrounds: {
    dark: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)',
    light: 'linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)',
    lightAlternate: 'linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)', // Pour page.tsx et contact
    lightProjects: 'linear-gradient(135deg, #f0f4ff 0%, #e6f2ff 25%, #dbeafe 50%, #e6f2ff 75%, #f0f4ff 100%)', // Pour projets/page.tsx
    headerDark: 'linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 25%, #2a2a2a 50%, #1a1a1a 75%, #0a0a0a 100%)',
    headerLight: 'linear-gradient(135deg, #1e3a8a 0%, #3b82f6 50%, #059669 100%)',
  },
  cards: {
    dark: 'linear-gradient(145deg, #1a1a1a 0%, #2a2a2a 50%, #1a1a1a 100%)',
    light: 'linear-gradient(145deg, #ffffff 0%, #fafbfc 30%, #f1f5f9 70%, #e2e8f0 100%)',
  },
  // Overlay gradients pour les effets ::before
  overlays: {
    darkRadial: 'radial-gradient(circle at 25% 25%, rgba(255, 107, 53, 0.05) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(255, 23, 68, 0.05) 0%, transparent 50%)',
    lightRadial: 'radial-gradient(circle at 20% 30%, rgba(59, 130, 246, 0.08) 0%, transparent 50%), radial-gradient(circle at 80% 70%, rgba(5, 150, 105, 0.06) 0%, transparent 50%)',
  },
} as const

// Animations centralisées
export const ANIMATIONS = {
  gradientShift: {
    '@keyframes gradientShift': {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' },
    },
  },
  textShimmer: {
    '@keyframes textShimmer': {
      '0%': { backgroundPosition: '0% 50%' },
      '50%': { backgroundPosition: '100% 50%' },
      '100%': { backgroundPosition: '0% 50%' },
    },
  },
  textGlow: {
    '@keyframes textGlow': {
      '0%, 100%': { opacity: 0.3 },
      '50%': { opacity: 0.6 },
    },
  },
  underlineGlow: {
    '@keyframes underlineGlow': {
      '0%, 100%': { opacity: 0.3, width: '40%' },
      '50%': { opacity: 0.8, width: '80%' },
    },
  },
  shimmer: {
    '@keyframes shimmer': {
      '0%': { transform: 'translateX(-100%)' },
      '100%': { transform: 'translateX(100%)' },
    },
  },
  fadeIn: {
    '@keyframes fadeIn': {
      from: { opacity: 0, transform: 'translateY(30px)' },
      to: { opacity: 1, transform: 'translateY(0)' },
    },
  },
} as const

