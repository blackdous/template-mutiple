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
