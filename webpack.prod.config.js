const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const ReactStaticPlugin = require('react-static-webpack-plugin');
const path = require('path');
// inherit from the main config file
module.exports = require('./webpack.config.js');

// disable the hot reload
module.exports.entry = {
  app: [
    'babel-polyfill',
    path.join(__dirname, module.exports.app_root, 'index.js')
  ]
};
module.exports.output = {
  path: path.join(__dirname, 'build'),
    publicPath: '/',
    filename: 'bundle.js',
    libraryTarget: 'umd'
};

// production env
module.exports.plugins.push(new webpack.DefinePlugin({
  'process.env': {
    NODE_ENV: JSON.stringify('production'),
  },
}));

// compress the js file
module.exports.plugins.push(new webpack.optimize.UglifyJsPlugin({
  comments: false,
  compressor: {
    warnings: false,
  },
}));

// export css to a separate file
module.exports.module.loaders[1] = {
  test: /\.scss$/,
  loader: ExtractTextPlugin.extract('css!sass'),
};

module.exports.plugins.push(new ExtractTextPlugin('main.css'));
module.exports.plugins.push(new ReactStaticPlugin({
  routes: './src/routes.js',
  template: './template.js',
  reduxStore: './src/store.js'
}));
