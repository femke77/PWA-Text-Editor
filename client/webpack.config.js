const HtmlWebpackPlugin = require("html-webpack-plugin");
const WebpackPwaManifest = require("webpack-pwa-manifest");
const path = require("path");
const { InjectManifest } = require("workbox-webpack-plugin");

// TODO: Add and configure workbox plugins for a service worker and manifest file.
// TODO: Add CSS loaders and babel to webpack.

module.exports = () => {
  return {
    mode: "development",
    entry: {
      main: "./src/js/index.js",
      install: "./src/js/install.js",
    },
    output: {
      filename: "[name].bundle.js",
      path: path.resolve(__dirname, "dist"),
    },
    plugins: [
      new InjectManifest({
        swSrc: "./src-sw.js",
        swDest: "./src-sw.js",
      }),
      new HtmlWebpackPlugin({
        template: "./index.html",
        title: "PWA Text Editor",
      }),
      new WebpackPwaManifest({
        inject: true,
        fingerprints: false,
        publicPath: "./",
        name: "PWA Text Editor",
        short_name: "Text Editor",
        description: "My awesome Text Editor App!",
        background_color: "#272822",
        icons: {
          src: path.resolve("src/images/logo.png"),
          sizes: [96, 128, 192, 256, 384, 512], // multiple sizes
        },
      }),
    ],

    module: {
      rules: [
        {
          test: /\.css$/i,
          use: ["style-loader", "css-loader"],
        },
        {
          test: /\.m?js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
              plugins: [
                "@babel/plugin-proposal-object-rest-spread",
                "@babel/transform-runtime",
              ],
            },
          },
        },
      ],
    },
  };
};
