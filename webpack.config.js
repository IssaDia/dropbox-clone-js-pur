import path from "path";
module.exports = {
  entry: "./src/index.ts", // Point d'entrée de ton application
  output: {
    filename: "index.js", // Nom du fichier de sortie
    path: path.resolve(__dirname, "dist"), // Répertoire de sortie
  },
  resolve: {
    extensions: [".ts", ".js"], // Extensions à traiter
  },
  mode: "development",
  module: {
    rules: [
      {
        test: /\.ts$/, // Traiter les fichiers TypeScript
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/index.html", // Fichier HTML à utiliser
    }),
  ],
  devtool: "source-map",
  devServer: {
    contentBase: path.resolve(__dirname, "dist"),
    compress: true,
    port: 8080,
  }, // Générer des sourcemaps pour le débogage
};
