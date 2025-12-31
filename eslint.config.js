import eslint from '@eslint/js';
import vue from 'eslint-plugin-vue';
import vueParser from 'vue-eslint-parser';
import typescriptEslint from 'typescript-eslint';
import typescriptParser from '@typescript-eslint/parser';
import globals from 'globals';

export default [
  { ignores: ['dist/**', 'node_modules/', "*.js"] },
  eslint.configs.recommended,
  ...vue.configs['flat/recommended'],
  ...typescriptEslint.configs.recommended,
  {
    plugins: {
      // '@typescript-eslint': typescriptEslint,
      vue,
    },
    languageOptions: {
      parser: vueParser,
      parserOptions: {
        parser: typescriptParser,
        sourceType: 'module',
        ecmaVersion: 'latest'
      },

      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.vitest
      }
    },
    settings: {
      vue: {
        version: '3'
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: true,
    },
    files: ['**/*.{jsx,mjs,ts,tsx,cts,mts,vue}', 'template/make.ts'],
    rules: {
      'arrow-parens': ['error', 'as-needed'],
      curly: ['error', 'all'],
      indent: ['error', 2, { SwitchCase: 1, MemberExpression: 0 }],
      'max-len': [
        'error',
        {
          code: 200,
          tabWidth: 2,
          ignoreStrings: true,
          ignoreUrls: true,
          ignoreTemplateLiterals: true,
          ignoreComments: true,
          ignoreTrailingComments: true,
        },
      ],
      'no-console': 'off',
      'prefer-const': ['error'],
      '@typescript-eslint/no-explicit-any': 'warn',
      '@typescript-eslint/explicit-function-return-type': 'off',
      '@typescript-eslint/explicit-module-boundary-types': 'off',
      '@typescript-eslint/no-unused-vars': ['error', {  argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
      'semi': ['error', 'always'],
      'vue/singleline-html-element-content-newline': 'off',
      'vue/multiline-html-element-content-newline': 'off',
      'vue/order-in-components': 'off',
      'vue/max-attributes-per-line': 'off',
      'vue/attributes-order': 'off',
      'vue/html-indent': 'off',
      'vue/html-closing-bracket-newline': ['error', { singleline: 'never', multiline: 'never' }],
      'vue/attribute-hyphenation': 'off',
      'vue/first-attribute-linebreak': 'off',
      'vue/no-useless-template-attributes': 'off',
      'vue/valid-v-slot': 'off',
      'vue/multi-word-component-names': 'off',
      "vue/v-on-event-hyphenation": ['error', "never"],
      "no-undef": "error",
      "no-trailing-spaces": "error"
    }
  }
];
