import nextPlugin from 'eslint-plugin-next';
import { FlatCompat } from '@eslint/eslintrc';
import path from 'path';
import { fileURLToPath } from 'url';

// Convert URL to path
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const compat = new FlatCompat({
  baseDirectory: __dirname,
});

export default [
  ...compat.extends('next/core-web-vitals'),
  {
    plugins: {
      next: nextPlugin,
    },
    rules: {
      'react/no-unescaped-entities': 0,
      '@typescript-eslint/no-unused-vars': 0,
      'react-hooks/rules-of-hooks': 0,
      '@typescript-eslint/no-explicit-any': 0,
      '@typescript-eslint/no-empty-object-type': 0
    },
  },
];
