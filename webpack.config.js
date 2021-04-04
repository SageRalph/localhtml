const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const ScriptExtHtmlWebpackPlugin = require("script-ext-html-webpack-plugin");
const WebpackAutoInject = require("webpack-auto-inject-version");

module.exports = {
  entry: "./src/index.js",
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./src/index.html"
    }),
    new ScriptExtHtmlWebpackPlugin({
      inline: "bundle.min.js",
    }),
    new WebpackAutoInject(),
  ],
  output: {
    filename: "bundle.min.js",
    path: path.resolve(__dirname, "docs")
  },
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(jpe?g|png|ttf|eot|svg|woff(2)?)(\?[a-z0-9=&.]+)?$/,
        use: ["base64-inline-loader"],
      },
    ],
  },
};
