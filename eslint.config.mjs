import nextCoreWebVitals from 'eslint-config-next/core-web-vitals'

/** @type {import('eslint').Linter.Config[]} */
const eslintConfig = [
  ...nextCoreWebVitals,
  {
    name: 'portfolio/react-hooks-pragmatic',
    rules: {
      // React Hooks plugin v7 (bundled with eslint-config-next 16) adds compiler-style rules
      // that flag many valid patterns; `next lint` did not enforce these before Next.js 16.
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/refs': 'off',
      'react-hooks/immutability': 'off',
      'react-hooks/globals': 'off',
      'react-hooks/preserve-manual-memoization': 'off',
    },
  },
]

export default eslintConfig
