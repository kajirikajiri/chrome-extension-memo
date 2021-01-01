const {join, resolve} = require('path')

module.exports = {
  mode: process.env.NODE_ENV,
  devtool: 'inline-source-map',
  resolve: {
    extensions: ['.ts', '.tsx'],
    modules: [resolve(__dirname, 'src'), 'node_modules']
  },
  entry: {
    contentscript: join(__dirname, 'src/contentscript/index.ts'),
    background: join(__dirname, 'src/background/index.ts'),
  },
  output: {
    path: join(__dirname, 'dist'),
    filename: '[name].js',
  },
}
