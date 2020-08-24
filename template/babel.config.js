module.exports = {
  // 业务代码babel
  presets: [
    [
      '@babel/preset-env',
      {
        modules: false,
        useBuiltIns: 'usage',
        targets: {
          chrome: '58'
        },
        corejs: 2
      }
    ]
  ],
  plugins: [
    {{#tsConfig}}
    'transform-es2015-modules-commonjs',
    {{/tsConfig}}
    // 公用代码库
    // ["@babel/plugin-transform-runtime", {
    // "corejs": 2,
    // "absoluteRuntime": false,
    // "helpers": true,
    // "regenerator": true,
    // "useESModules": false
    // }],
    '@babel/plugin-syntax-dynamic-import'
  ]
};
