// eslint-disable-next-line @typescript-eslint/no-var-requires
const path = require('path');

module.exports = {
  target: 'node',
  entry: './src/server.ts',
  devtool: 'inline-source-map',
  externals: {
    _http_common: 'commonjs2 _http_common',
  },
  module: {
    rules: [
      {
        test: /\.ts?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: ['.ts', '.js'],
    modules: [path.resolve(__dirname, 'src'), 'node_modules'],
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
  },
};
