import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export default {
  entry: "./src/index.ts",
  output: {
    filename: "bundle.js",
    path: path.resolve("dist"),
    clean: true,
  },
  resolve: {
    extensions: [".ts", ".js", ".hbs", ".scss"],
  },
  module: {
    rules: [
      {
        test: /\.ts$/, // Traiter les fichiers TypeScript
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.hbs$/,
        use: "handlebars-loader",
      },
      {
        test: /\.scss$/, // Traiter les fichiers SCSS
        use: [
          MiniCssExtractPlugin.loader, // Extrait le CSS dans un fichier séparé
          "css-loader", // Interprète le CSS
          "sass-loader", // Compile SCSS en CSS
        ],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/presentation/templates/login/index.hbs",
      filename: "index.html",
      inject: "body",
    }),
    new MiniCssExtractPlugin({
      filename: "styles.min.css", // Generate `login.css`, etc.
    }),

    new CopyWebpackPlugin({
      patterns: [
        { from: "public/images", to: "images" }, // Copy images to dist folder
      ],
    }),
  ],
  optimization: {
    minimizer: [
      "...", // Utiliser les minimizers par défaut (terser pour JS)
      new CssMinimizerPlugin(), // Minifier le CSS
    ],
  },

  mode: "development", // Mode de développement
  devServer: {
    static: path.resolve(__dirname, "dist"), // Où sont tes fichiers statiques
    compress: true, // Active la compression gzip
    port: 8080, // Le port où le serveur sera lancé
    open: true, // Ouvre automatiquement le navigateur
    hot: true, // Active le Hot Module Replacement
    watchFiles: ["src/**/*", "public/**/*"],
    historyApiFallback: true,
  },
};
