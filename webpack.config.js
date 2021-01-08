const path = require("path");

const mode = process.env.MODE === "development" ? "development" : "production";

module.exports = {
  entry: "./src/front/main.ts",
  output: {
    filename: "main.js",
    path: path.resolve(__dirname, "public"),
  },
  mode,
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        exclude: /node_modules/,
        options: {
          configFile: "tsconfig.front.json",
        },
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
