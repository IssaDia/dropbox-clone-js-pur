import path from "path";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
export default {
  entry: "./src/index.ts", // Point d'entrée de ton application
  output: {
    filename: "bundle.js", // Nom du fichier de sortie
    path: path.resolve("dist"), // Répertoire de sortie
    clean: true, // Nettoyer le répertoire de sortie avant chaque build
  },
  resolve: {
    extensions: [".ts", ".js"], // Extensions à traiter
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
        loader: "handlebars-loader",
      },
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html",
      inject: false,
    }),
    new MiniCssExtractPlugin({
      filename: "styles.css",
    }),
  ],

  mode: "development", // Mode de développement
  devServer: {
    static: path.resolve("dist"), // Répertoire de contenu statique
    compress: true,
    port: 8080,
  },
};
