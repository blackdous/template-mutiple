module.exports = {
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'vue'],
  // rootDir: path.resolve(__dirname),
  transform: {
    '^.+\\.vue$': 'vue-jest',
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$':
      'jest-transform-stub',
      {{#tsConfig}}
      '^.+\\.tsx?$': 'ts-jest',
      {{/tsConfig}}
    '^.+\\.jsx?$': 'babel-jest'
  },
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    // '^vue$': 'vue/dist/vue.esm.js',
    '^@com/(.*)$': '<rootDir>/src/components/$1'
  },
  transformIgnorePatterns: ['/node_modules/(?!vue)'],
  snapshotSerializers: ['jest-serializer-vue'],
  testMatch: [
    'src/**/*.{js,ts,vue}',
    '!src/components/**/*.{js,ts}',
    '**/tests/**/**/*.spec.(js|jsx|ts|tsx)|**/__tests__/*.(js|jsx|ts|tsx)'
  ],
  testURL: 'http://localhost/',
  collectCoverage: true,
  collectCoverageFrom: [
    '**/*.{js,ts,vue,jsx}',
    '!**/node_modules/**',
    '!**/dist/**',
    '!**/(test|tests|examples|config|build|coverage|static)/**',
    {{#if_eq runner "jest"}}
    '!**/jest.config.js',
    {{/if_eq}}
    {{#commitLint}}
    '!**/commitlint.config.js',
    {{/commitLint}}
    {{#eslint}}
    '!**/babel.config.js',
    {{/eslint}}
    '!**/src/main.js',
    {{#pwa}}
    '!**/src/registerServiceWorker.js',
    {{/pwa}}
    {{#tsConfig}}
    '!**/src/currency.ts',
    {{/tsConfig}}
    '!**/src/App.vue',
    '!**/postcss.config.js'
  ],
  coverageThreshold: {
    global: {
      branches: 0,
      functions: 0,
      lines: 0,
      statements: 0
    }
  }
};
