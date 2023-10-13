/* eslint-disable no-unused-vars */

const path = require('path');
const webpack = require('webpack');
const nodeExternals = require('webpack-node-externals');

const mode = process.env.NODE_ENV || 'development';

module.exports = [
  {
    name: 'server',
    mode: mode,
    entry: './server/server.js',
    output: {
      path: path.resolve(__dirname, 'build-server'),
      filename: 'server.js',
    },
    target: 'node',
    externals: [nodeExternals()], // Exclude node_modules from the bundle
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          use: 'babel-loader',
          exclude: /node_modules/,
        },
        {
          test: /\.css$/,
          use: 'null-loader', // Use null-loader for CSS in SSR
        },
        {
          test: /\.(png|jpe?g|gif|svg)$/i,
          use: 'null-loader', // Use null-loader for images in SSR
        },
      ],
    },
  },
];
