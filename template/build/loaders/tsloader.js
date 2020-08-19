/*
 * @Descripttion: tsloader config
 * @Author: blackdous
 * @Date: 2020-07-22 16:51:56
 * @LastEditors: heidous
 * @LastEditTime: 2020-07-24 08:38:25
 */

module.exports = {
  test: /\.ts$/,
  use: [
    {
      loader: 'cache-loader'
    },
    {
      loader: 'thread-loader'
    },
    {
      loader: 'babel-loader'
    },
    {
      loader: 'ts-loader'
    }
  ],
  exclude: /node_modules/,
  options: { appendTsSuffixTo: [/\.vue$/] }
}
