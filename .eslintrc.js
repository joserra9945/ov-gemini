module.exports = {
  env: {
    browser: true,
    es6: true,
    node: true,
  },
  extends: [
    'airbnb',
    'plugin:react/recommended',
    'plugin:@typescript-eslint/eslint-recommended',
    'plugin:@typescript-eslint/recommended',
    'plugin:cypress/recommended',
    'plugin:prettier/recommended',
    'eslint:recommended',
  ],
  globals: {
    Atomics: 'readonly',
    SharedArrayBuffer: 'readonly',
  },
  parser: '@typescript-eslint/parser',
  parserOptions: {
    ecmaVersion: 2020,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true, // permite a eslint analizar los archivos jsx o tsx
      arrowFunctions: true,
    },
  },
  plugins: [
    'react',
    '@typescript-eslint',
    'prettier',
    'react-hooks',
    'json',
    'simple-import-sort',
  ],
  rules: {
    'import/order': 0,
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    '@typescript-eslint/no-explicit-any': 0, // ['error'],
    '@typescript-eslint/no-use-before-define': ['error', { enums: true }],
    '@typescript-eslint/no-empty-function': 0, // ['error'],
    '@typescript-eslint/no-var-requires': ['error'],
    'react/jsx-filename-extension': [
      1,
      { extensions: ['.js', '.jsx', '.ts', '.tsx'] },
    ],
    'react/function-component-definition': [
      2,
      {
        namedComponents: 'arrow-function',
        unnamedComponents: 'arrow-function',
      },
    ],
    'react/destructuring-assignment': 'off',
    'react/require-default-props': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/jsx-uses-react': 'off',
    'react/jsx-key': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/no-unused-prop-types': 'off',
    'no-empty-function': 'off',
    'no-unused-vars': 0,
    '@typescript-eslint/no-unused-vars': 0,
    'no-unused-expressions': 0,
    'import/no-unused-modules': ['error', { unusedExports: true }],
    'no-debugger': 'off',
    'no-undef': 'off',
    'import/extensions': 'off',
    'import/prefer-default-export': 'off',
    'no-use-before-define': 'off',
    'no-nested-ternary': 'off',
    'jsx-a11y/label-has-associated-control': 'off',
    'jsx-a11y/click-events-have-key-events': 'off',
    'jsx-a11y/no-noninteractive-element-interactions': 'off',
    'jsx-a11y/role-supports-aria-props': 'off',
    'react/prop-types': 0,
    'consistent-return': 0,
    'no-case-declarations': 0,
    'no-console': [1, { allow: ['error'] }],
    'default-param-last': 0,
    'no-restricted-syntax': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }],
    'react-hooks/rules-of-hooks': 'error', // Checks rules of Hooks
    'react-hooks/exhaustive-deps': 'error', // Checks effect dependencies
    'no-shadow': 'off',
    '@typescript-eslint/no-shadow': ['error'],
    'prettier/prettier': [
      'warn',
      {
        singleQuote: true,
        trailingComma: 'es5',
        endOfLine: 'auto',
      },
    ],
    'import/no-cycle': 0,
  },
  overrides: [
    {
      files: ['**/*.js', '**/*.jsx', '**/*.ts', '**/*.tsx'],
      rules: {
        'simple-import-sort/imports': [
          'error',
          {
            groups: [
              ['^react*', '^primereact*', '^[a-z]', '^@'],
              ['^@shared'],
              [
                '^@shared/components/Legacy*',
                '^@shared/interfaces/Legacy*',
                '^@shared/templates/Legacy*',
              ],
              [
                '^hooks',
                '^context',
                '^modules',
                '^components',
                '^interfaces',
                '^layout',
                '^templates',
                '^pages',
                '^routes',
                '^store',
                '^services',
                '^documents',
              ],
              ['^\\.\\.(?!/?$)', '^\\.\\./?$'], // imports ../
              ['^\\./(?=.*/)(?!/?$)', '^\\.(?!/?$)', '^\\./?$'], // imports ./
              ['^.+\\.s?css$'], // css
              ['^\\u0000'], // Side effect import
            ],
          },
        ],
      },
    },
  ],
  settings: {
    react: {
      version: 'detect', // para detectar la versión de reactjs
    },
    'import/parsers': {
      '@typescript-eslint/parser': ['.ts', '.tsx'],
    },
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx', '.ts', '.tsx'],
        moduleDirectory: ['src', 'node_modules'],
      },
      typescript: {},
    },
  },
};
