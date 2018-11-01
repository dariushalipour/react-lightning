const path = require('path')
const CopyWebpackPlugin = require('copy-webpack-plugin')

const jsRule = {
  test: /\.jsx?$/,
  resolve: { extensions: ['.js', '.jsx'] },
  exclude: /node_modules/,
  loader: 'babel-loader',
}

const frontendConfig = {
  target: 'web',
  entry: './src/clientside.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build/public'),
  },
  plugins: [
    new CopyWebpackPlugin([{ from: 'public', to: '.' }]),
  ],
  module: {
    rules: [
      jsRule,
    ],
  },
}

const backendConfig = {
  target: 'node',
  entry: './src/serverside.js',
  output: {
    filename: 'serverside.js',
    path: path.resolve(__dirname, 'build'),
  },
  module: {
    rules: [jsRule],
  },
  node: {
    __dirname: false,
  },
}

module.exports = [backendConfig, frontendConfig]
