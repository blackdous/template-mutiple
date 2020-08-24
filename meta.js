/*
 * @Descripttion:
 * @Author: heidous
 * @Date: 2020-08-13 22:48:07
 * @LastEditors: heidous
 * @LastEditTime: 2020-08-24 23:36:55
 */
const path = require('path');
const fs = require('fs');

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage
} = require('./utils');

const pkg = require('./package.json');
const { addTestAnswers } = require('./scenarios');
const { type } = require('os');

const templateVersion = pkg.version;

// const { addTestAnswers } = require('./sec');

module.exports = {
  metalsmith: {
    // When running tests for the template, this adds answers for the selected scenario
    before: addTestAnswers
  },
  helpers: {
    if_or(v1, v2, options) {
      if (v1 || v2) {
        return options.fn(this);
      }
      return options.inverse(this);
    },
    template_version() {
      return templateVersion;
    }
  },
  prompts: {
    name: {
      when: 'isNotTest',
      type: 'string',
      required: true,
      message: 'Project name'
    },
    description: {
      when: 'isNotTest',
      type: 'string',
      require: false,
      message: 'Project descripton',
      default: 'A Vue spa project'
    },
    author: {
      when: 'isNotTest',
      type: 'string',
      message: 'Author'
    },
    router: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Install vue-router'
    },
    vuex: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Install vuex'
    },
    eslint: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Use ESLint to lint your code?'
    },
    eslintConfig: {
      when: 'isNotTest && eslint',
      type: 'list',
      message: 'Use ESlint config',
      choices: [
        {
          name: 'Standard (https://github.com/standard/standard)',
          value: 'standard',
          short: 'Standard'
        },
        {
          name: 'Airbnb (https://github.com/airbnb/javascript)',
          value: 'airbnb',
          short: 'Airbnb'
        },
        {
          name: 'none (configure it yourself)',
          value: 'none',
          short: 'none'
        }
      ]
    },
    tsConfig: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Install typescript ?'
    },
    tslintConfig: {
      when: 'isNotTest && tsConfig',
      type: 'confirm',
      message: 'set typeLint config ?'
    },
    unit: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'Set up unit tests'
    },
    runner: {
      when: 'isNotTest && unit',
      type: 'list',
      message: 'Pick a test runner',
      choices: [
        {
          name: 'Jest',
          value: 'jest',
          short: 'jest'
        },
        {
          name: 'none',
          value: 'noTest',
          short: 'noTest'
        }
      ]
    },
    smoke: {
      when: 'isNotTest && unit',
      type: 'confirm',
      message: 'Set up smoke unit'
    },
    commitLint: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'set commit lint && eslint'
    },
    pwa: {
      when: 'isNotTest',
      type: 'confirm',
      message: 'set workbox'
    }
  },
  filters: {
    'tsconfig.json': 'tsConfig',
    'src/currency.ts': 'tsConfig',
    'src/components/typescript/**/*': 'tsConfig',
    'src/components/HelloWorld.vue': '!tsConfig',
    'tslint.json': 'tsConfig && tslintConfig',
    'src/registerServiceWorker.js': 'pwa',
    'commitlint.config.js': 'commitLint',
    'tests/unit/**/*': 'unit',
    'tests/unit/typescript/**/*': 'unit && tsConfig',
    'jest.config.js': "unit && runner === 'jest'",
    'tests/unit/smoke/**/*': "unit && runner === 'jest' && smoke",
    '.eslintrc.js': 'eslint',
    '.eslintignore': 'eslint',
    'src/**/router/**/*': 'router',
    'src/**/store/**/*': 'vuex'
  }
};
