const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");
const TerserPlugin = require("terser-webpack-plugin");
const ESLintPlugin = require("eslint-webpack-plugin"); // Importer le plugin ESLint

const env = process.env.NODE_ENV;
const devMode = process.env.NODE_ENV !== "production";
console.log("env : ", env);
console.log("env : ", devMode);
const plugins = [
  new MiniCssExtractPlugin({
    filename: "./css/[name].css",
    chunkFilename: "[id].css",
  }),
  new ESLintPlugin({
    // Ajouter ESLintPlugin
    extensions: ["js"], // Fichiers à vérifier
    exclude: "node_modules", // Exclure le dossier node_modules
    fix: true, // Corrige automatiquement les erreurs simples
  }),
];

module.exports = {
  plugins,
  mode: env || "development",
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
              presets: [
                [
                  "@babel/preset-env",
                  {
                    useBuiltIns: "usage",
                    corejs: 3,
                  },
                ],
              ],
            },
          },
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: [
          // 1/2 permet d'injecter directeent le style dans le navigateur.
          //          devMode
          //            ? "style-loader"
          //            : {
          //                loader: MiniCssExtractPlugin.loader,
          //                options: {
          //                  publicPath: "../",
          //                },
          //              },
          // 2/2 Permet de modifier directement les fichiers css.
          // On doit desactiver la premiere approche, car on a pour abitude de fonctionner avec la seconde.
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              publicPath: "../", // Ajustez selon votre structure de dossiers
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
    static: {
      directory: path.resolve(__dirname, "./public"),
    },
    port: 3008,
    hot: true,
    watchFiles: ["./js/**/*", "./scss/**/*"],
  },
  optimization: {
    minimizer: [new CssMinimizerPlugin(), new TerserPlugin()],
  },
};
