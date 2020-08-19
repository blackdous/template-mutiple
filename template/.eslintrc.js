/*
 * @Descripttion: eslint.config.js
 * @Author: asyncnode
 * @Date: 2020-03-23 12:08:30
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-16 19:39:06
 */

// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint',
    ecmaFeatures: {
      legacyDecorators: true
    }
  },
  env: {
    browser: true
  },
  {{#if_eq eslintConfig "standard"}}
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential',
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
  ],
  {{/if_eq}}
  {{#if_eq eslintConfig "airbnb"}}
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential', 'airbnb-base'],
  {{/if_eq}}
  {{#if_eq eslintConfig "none"}}
  // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
  // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
  extends: ['plugin:vue/essential'],
  {{/if_eq}}
  // required to lint *.vue files
  plugins: ['vue'],
  // add your custom rules here
  rules: {
    {{#if_eq eslintConfig "standard"}}
    'vue/max-attributes-per-line': [
      1,
      {
        //多个特性的元素应该分多行撰写，每个特性一行
        singleline: 10,
        multiline: {
          max: 1,
          allowFirstLine: false
        }
      }
    ],
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger':
      process.env.NODE_ENV === 'production'
        ? 'error'
        : 'off',
    //
    semi: ['error', 'always'],
    'space-before-function-paren': 0,
    camelcase: 0,
    // allow debugger during development
    indent: 2,
    'for-direction': 2,
    'getter-return': 2,
    'valid-jsdoc': [
      'error',
      {
        requireReturn: false,
        requireParamDescription: false,
        requireReturnDescription: true
      }
    ],
    'vue/no-parsing-error': [
      2,
      {
        'x-invalid-end-tag': false
      }
    ],
    'array-callback-return': 2,
    'no-alert': 'warn',
    'no-empty-function': 0,
    'no-eval': 2, //不允许使用eval()
    'no-floating-decimal': 2, //不允许浮点数缺失数字
    'no-undef': 2, //不允许未声明的变量
    'no-shadow': 0, //外部作用域中的变量不能与它所包含的作用域中的变量或参数同名
    'no-multi-spaces': 0, //不允许出现多余的空格
    'no-multi-str': 2, //不允许用\来让字符串换行
    'no-new-wrappers': 2, //不允许使用new String，Number和Boolean对象
    'no-with': 2, //不允许使用with语句
    'no-irregular-whitespace': 2, //不允许出现不规则的空格
    'eqeqeq': ['error', 'smart'], //比较的时候使用严格等于
    'no-eq-null': 2, //不允许对null用==或者!=
    'no-tabs': 'off', // allow paren-less arrow functions
    'arrow-parens': 0,
    'eol-last': 0,
    {{/if_eq}}
    {{#if_eq eslintConfig "airbnb"}}
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      js: 'never',
      vue: 'never'
    }],
    // disallow reassignment of function parameters
    // disallow parameter object manipulation except for specific exclusions
    'no-param-reassign': ['error', {
      props: true,
      ignorePropertyModificationsFor: [
        'state', // for vuex state
        'acc', // for reduce accumulators
        'e' // for e.returnvalue
      ]
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      optionalDependencies: ['test/unit/index.js']
    }],
    {{/if_eq}}
  }
};
