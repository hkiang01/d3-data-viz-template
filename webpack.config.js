const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
      filename: 'index.html',
      inject: 'body'
    }),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery'
    })
  ],
  module: {
    rules: [
      {
          test: /\.csv$/,
          loader: 'csv-loader',
          options: {
              header: true,
          }
      },
      {
          test: /\.scss$/,
          use: [ 'style-loader', 'css-loader', 'sass-loader' ]
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
        exclude: /nodes_modules/
      },
      {
        test: /\.js$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.jsx$/,
        use: 'babel-loader',
        exclude: /node_modules/
      },
      {
        test: /\.(jpg|svg|png|eot|ttf|woff|woff2)$/,
        use: 'file-loader',
        exclude: /node_modules/
      }
    ]
  }
};
