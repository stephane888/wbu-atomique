const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");

// On récupère la valeur de NODE_ENV
const env = process.env.NODE_ENV;

const devMode = process.env.NODE_ENV !== "production";

const plugins = [];

// Enable in production only
plugins.push(
  new MiniCssExtractPlugin({
    filename: "./css/[name].css",
    chunkFilename: "[id].css",
  })
);

module.exports = {
  plugins,
  mode: env || "development", // On définit le mode en fonction de la valeur de NODE_ENV.
  entry: {
    "global-style": "./src/js/global-style.js",
    "vendor-style": "./src/js/vendor-style.js",
    "mail-style": "./src/js/mail-style.js",
  },
  output: {
    path: path.resolve(__dirname, "../"),
    filename: "./js/[name].js",
  },
  devtool: devMode ? "inline-source-map" : false,
  module: {
    rules: [
      // Règles de compilation pour les fichiers .js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
      // Règles de compilation pour les fichiers SCSS/CSS
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../",
            },
          },
          {
            loader: "css-loader",
            options: {
              importLoaders: 1,
              url: false, // Désactive le traitement des URLs
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true, // Indispensable pour que postcss fonctionne correctement
              implementation: require("sass"),
            },
          },
        ],
      },
      // Règles de compilation pour les fonts
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[hash].[ext]",
        },
      },
      // Règles de compilation pour les images
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./images/",
            },
          },
          { loader: "image-webpack-loader" },
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "./icons/",
            },
          },
          { loader: "image-webpack-loader" },
        ],
      },
    ],
  },
  devServer: {
    contentBase: path.resolve(__dirname, "./public"),
    port: 3000,
    publicPath: "/dist/",
    watchContentBase: true,
    hot: true,
  },
  optimization: {
    minimizer: [
      new CssMinimizerPlugin({
        minimizerOptions: {
          preset: [
            "default",
            {
              discardComments: { removeAll: true },
            },
          ],
        },
      }),
      new TerserPlugin(),
    ],
  },
};
