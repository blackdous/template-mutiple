module.exports = {
  plugins: [
    require('autoprefixer'),
  	// require('autoprefixer')({
    //   browsers: ['last 2 versions'] // https://browserl.ist/?q=last+2+version
    // }),
    require('postcss-import'),
    require('postcss-flexbugs-fixes')
  ]
};