/*
 * @Descripttion: 
 * @Author: asyncnode
 * @Date: 2020-03-23 12:08:30
 * @LastEditors: asyncnode
 * @LastEditTime: 2020-07-01 17:41:23
 */ 
module.exports = {
  plugins: [
  	require('autoprefixer'),
  	// require('autoprefixer')({
    //   browsers: ['last 2 versions'] // https://browserl.ist/?q=last+2+version
    // }),
    require('postcss-import'),
    require('postcss-flexbugs-fixes')
  ]
}