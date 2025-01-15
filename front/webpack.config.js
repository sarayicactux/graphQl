import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";

module.exports = {
  context: __dirname, // to automatically find tsconfig.json
  entry: "./src/index.ts",
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: "ts-loader",
        // add transpileOnly option if you use ts-loader < 9.3.0
        // options: {
        //   transpileOnly: true
        // }
      },
    ],
  },
  plugins: [new ForkTsCheckerWebpackPlugin()],
  watchOptions: {
    // for some systems, watching many files can result in a lot of CPU or memory usage
    // https://webpack.js.org/configuration/watch/#watchoptionsignored
    // don't use this pattern, if you have a monorepo with linked packages
    ignored: /node_modules/,
  },
};
