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
  module: {
    rules: [
      //règles de compilations pour les fichiers .js
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["babel-preset-env"],
          },
        },
      },
      //règles de compilations pour les fichiers .css
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
            },
          },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                // postcss plugins, can be exported to postcss.config.js
                plugins: function () {
                  return [require("autoprefixer")];
                },
              },
            },
          },
          {
            test: /\.css$/,
            use: ["style-loader", "css-loader"],
          },
          {
            loader: "resolve-url-loader", // améliore la résolution des chemins relatifs
            // (utile par exemple quand une librairie tierce fait référence à des images ou des fonts situés dans son propre dossier)
            options: {
              publicPath: "../images",
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true, // il est indispensable d'activer les sourcemaps pour que postcss fonctionne correctement
              implementation: require("sass"),
            },
          },
        ],
      },
      //règles de compilations pour les fonts
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        loader: "file-loader",
        options: {
          name: "fonts/[name].[hash].[ext]",
        },
      },
      //règles de compilations pour les images
      {
        test: /\.(gif|png|jpe?g)$/i,
        use: [
          {
            // Using file-loader for these files
            loader: "file-loader?name=[name].[ext]&outputPath=./images/",

            // In options we can set different things like format
            // and directory to save
            // options: {
            //     outputPath: (__dirname, '../images')
            // }
          },
          { loader: "image-webpack-loader" },
        ],
      },
      {
        test: /\.svg$/i,
        use: [
          {
            // Using file-loader for these files
            loader: "file-loader?name=[name].[ext]&outputPath=./icons/",
            // In options we can set different things like format
            // and directory to save
            // options: {
            //     outputPath: (__dirname, '../images')
            // }
          },
          { loader: "image-webpack-loader" },
        ],
      },
    ],
  },
  devServer: {
    port: 3000,
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
      // new TerserPlugin(),
    ],
  },
};
