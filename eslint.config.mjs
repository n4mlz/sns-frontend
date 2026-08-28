import nextVitals from 'eslint-config-next/core-web-vitals';
import prettierConfig from 'eslint-config-prettier';
import tseslint from '@typescript-eslint/eslint-plugin';
import importPlugin from 'eslint-plugin-import';

export default [
    ...nextVitals,
    prettierConfig,
    {
        ignores: ['.cache/**', '.github/**', 'node_modules/**', 'public/**', '*.config.js', 'eslint.config.mjs'],
    },
    {
        plugins: {
            '@typescript-eslint': tseslint,
            import: importPlugin,
        },
        rules: {
            'no-unused-vars': 'off',
            '@typescript-eslint/no-unused-vars': 'error',
            'import/order': [
                2,
                {
                    alphabetize: { caseInsensitive: true, order: 'asc' },
                    'newlines-between': 'always',
                    warnOnUnassignedImports: true,
                },
            ],
        },
    },
];
