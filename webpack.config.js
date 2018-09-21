const path = require('path');

module.exports = {
  entry: './app/game.js',
  output: {
    filename: 'js/bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      },
      {
        test: /test\.js$/,
        use: 'mocha-loader',
        exclude: /node_modules/,
      }
    ]
  }
};
