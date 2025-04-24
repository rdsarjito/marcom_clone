/** @type {import('eslint').Linter.Config} */
module.exports = {
    root: true,
    extends: [
      'next',
      'next/core-web-vitals',
      'eslint:recommended',
      'plugin:@typescript-eslint/recommended',
      'plugin:react-hooks/recommended',
    ],
    plugins: ['@typescript-eslint'],
    rules: {
      '@typescript-eslint/no-explicit-any': 'off',
      '@typescript-eslint/no-unused-vars': 'off',
      'react/no-children-prop': 'off',
      'react-hooks/exhaustive-deps': 'warn',
      '@typescript-eslint/no-non-null-assertion': 'off',
    },
  };
  