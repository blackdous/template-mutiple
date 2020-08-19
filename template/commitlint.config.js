/*
 * @Descripttion: commitlint 配置文件
 * @Author: all
 * @Date: 2020-07-17 17:00:40
 * @LastEditors: blackdous
 * @LastEditTime: 2020-07-23 10:26:07
 */

module.exports = {
  // 继承默认配置
  extends: ['@commitlint/config-angular'],
  // 自定义规则
  rules: {
    'type-enum': [
      2,
      'always',
      [
        'feat',
        'fix',
        'docs',
        'style',
        'build',
        'ci',
        'chore',
        'revert',
        'test',
        'refactor'
      ]
    ],
    'header-max-length': [0, 'always', 72]
  }
};
