const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js', // Ensure this matches your script in index.html
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/', // Required for webpack-dev-server
  },
  mode: 'development',
  devServer: {
    static: {
      directory: path.resolve(__dirname, 'dist'), // Serve files from 'dist'
    },
    port: 8080, // Optional: Change the port if needed
    open: true, // Opens the browser automatically
  },
};

