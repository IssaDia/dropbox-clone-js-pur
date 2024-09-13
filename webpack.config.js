import path from "path";
import { fileURLToPath } from "url";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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
        test: /\.css$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./public/index.html",
      inject: false,
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/templates", to: "templates" }, // Copie les templates dans le répertoire de sortie
      ],
    }),
  ],
  mode: "development", // Mode de développement
  devServer: {
    static: path.resolve(__dirname, "dist"), // Où sont tes fichiers statiques
    compress: true, // Active la compression gzip
    port: 8080, // Le port où le serveur sera lancé
    open: true, // Ouvre automatiquement le navigateur
    hot: true, // Active le Hot Module Replacement
  },
};
