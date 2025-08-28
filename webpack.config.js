const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isDev = process.env.NODE_ENV !== 'production';

module.exports = {
  entry: {
    block: path.resolve(__dirname, 'src/js/block.js'),
    style: path.resolve(__dirname, 'src/scss/style.scss'),
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js',
    clean: true,
  },
  externals: {
    '@wordpress/blocks': 'wp.blocks',
    '@wordpress/block-editor': 'wp.blockEditor',
    '@wordpress/components': 'wp.components',
    '@wordpress/data': 'wp.data',
    '@wordpress/element': 'wp.element',
    '@wordpress/i18n': 'wp.i18n',
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: [ [ '@babel/preset-env', { targets: { esmodules: true } } ] ],
            plugins: [ [ '@babel/plugin-transform-react-jsx', { pragma: 'wp.element.createElement', pragmaFrag: 'wp.element.Fragment' } ] ],
          },
        },
      },
      {
        test: /\.(scss|css)$/,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: 'css-loader', options: { sourceMap: isDev } },
          { loader: 'postcss-loader', options: { sourceMap: isDev } },
          { loader: 'sass-loader', options: { sourceMap: isDev } },
        ],
      },
    ],
  },
  plugins: [ new MiniCssExtractPlugin({ filename: '[name].css' }) ],
  devtool: isDev ? 'source-map' : false,
  mode: isDev ? 'development' : 'production',
};

 