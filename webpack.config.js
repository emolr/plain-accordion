var CopyWebpackPlugin = require('copy-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/plain-accordion.js',
  output: {
    filename: 'plain-accordion-bundled.js',
    path: path.resolve(__dirname, 'lib')
  },
  plugins: [
    new CopyWebpackPlugin([
        { 
            context: 'src',
            from: '**/*' 
        }
    ])
  ]
};