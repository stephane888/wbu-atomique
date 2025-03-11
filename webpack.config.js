/** @format */

//webpack.config.js
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
// const TerserPlugin = require("terser-webpack-plugin");

// on récupère la valeur de NODE_ENV
const env = process.env.NODE_ENV;

const devMode = process.env.NODE_ENV !== "production";

const plugins = [];

plugins.push(
  new MiniCssExtractPlugin({
    filename: "css/[name].css",
    chunkFilename: "[id].css",
  })
);
console.log("devMode", devMode);
module.exports = {
  plugins,
  mode: env || "development", // on définit le mode en fonction de la valeur de NODE_ENV
  entry: {
    app: "./js/home-page",
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "js/[name].js",
  },
  devtool: devMode ? "inline-source-map" : false,
  cache: {
    type: "filesystem", // Active le cache
  },
    module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: ["@babel/preset-env"],
            },
          },
          {
            loader: "eslint-loader",
            options: {
              fix: true,
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          devMode
            ? "style-loader"
            : {
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
              postcssOptions: {
                plugins: [require("autoprefixer")],
              },
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
              implementation: require("sass"),
            },
          },
        ],
      },
      {
        test: /\.(gif|png|jpe?g|svg)$/i,
        type: "asset/resource",
        generator: {
          filename: "images/[name][ext]",
        },
      },
      {
        test: /\.svg$/i,
        type: "asset/resource",
        generator: {
          filename: "icons/[name][ext]",
        },
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: "asset/resource",
        generator: {
          filename: "fonts/[name][ext]",
        },
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
      new CssMinimizerPlugin(),
      new TerserPlugin(),
    ],
  },
};
