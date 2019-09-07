const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = "../src/";

module.exports = {
  entry: {
    background: path.join(__dirname, srcDir + "background.ts")
  },
  output: {
    path: path.join(__dirname, "../dist"),
    filename: "[name].js"
  },
  optimization: {
    splitChunks: {
      name: "vendor",
      chunks: "initial"
    }
  },
  module: {
    rules: [
      {
        use: "ts-loader",
        exclude: /node_modules/
      }
    ]
  },
  resolve: {
    extensions: [".ts"]
  },
  plugins: [new CopyPlugin([{ from: ".", to: "." }], { context: "public" })]
};
