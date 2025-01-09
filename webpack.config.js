const HtmlWebpackPlugin = require('html-webpack-plugin');
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
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html', // Path to your HTML file in src/
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },      
    ],
  },
};

