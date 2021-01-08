const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const nodeExternals = require("webpack-node-externals");

const mode = process.env.MODE === "development" ? "development" : "production";

module.exports = [
  {
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
    plugins: [
      new CleanWebpackPlugin(),
      new CopyPlugin({
        patterns: [{ from: "src/front/assets", to: "assets" }],
      }),
    ],
  },
  {
    entry: "./src/back/server.ts",
    output: {
      filename: "server.js",
      path: path.resolve(__dirname, "back"),
    },
    target: "node",
    externals: [nodeExternals()],
    mode: "development",
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          loader: "ts-loader",
          exclude: /node_modules/,
          options: {
            configFile: "tsconfig.json",
          },
        },
      ],
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    plugins: [new CleanWebpackPlugin()],
  },
];
