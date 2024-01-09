const path = require('path');
const nodeExternals = require('webpack-node-externals');

const mode = process.env.NODE_ENV || 'production';
const isInDevelopment = mode === 'development';

module.exports = {
  mode,
  target: 'node',
  entry: './src/index.ts',
  output: {
    filename: './index.js',
    path: path.resolve(__dirname, 'dist'),
  },
  module: {
    rules: [
      {
        test: /\.[mc]?tsx?$/,
        exclude: /node_modules/,
        use: 'ts-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '...'], // enables users to leave off the extension when importing
    alias: {
      '@controllers': path.resolve(__dirname, 'src/controllers/'),
      '@lib': path.resolve(__dirname, 'src/lib/'),
      '@models': path.resolve(__dirname, 'src/models/'),
      '@routes': path.resolve(__dirname, 'src/routes/'),
      '@services': path.resolve(__dirname, 'src/services/'),
      '@utils': path.resolve(__dirname, 'src/utils/'),
    },
  },
  plugins: [],
  externals: [nodeExternals()], // in order to ignore all modules in node_modules folder
  devtool: isInDevelopment ? 'eval-source-map' : 'source-map', // enable sourcemaps for debugging webpack's output.
  watch: isInDevelopment,
};
