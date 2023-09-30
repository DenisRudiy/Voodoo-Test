const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.js",
  mode: "development",
  devServer: {
    watchFiles: ["src/**/*"],
  },
  module: {
    rules: [
      {
        test: /\.js$/i,
        use: "babel-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.css$/i,
        include: path.resolve(__dirname, "src"),
        use: ["style-loader", "css-loader", "postcss-loader"],
      },
      {
        test: /\.html$/,
        use: [
          {
            loader: "html-loader",
          },
        ],
      },
    ],
  },
  resolve: {
    extensions: [".js", ".ts"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        { from: "src/index.html", to: "index.html" },
        { from: "src/assets", to: "assets" },
      ],
    }),
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "dist"),
    clean: true,
  },
};
