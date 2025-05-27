// merge, a fn used to merge 2 different webpack config objects, so we can take what is in the common config file and merge it into the config inside dev here
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin"); // injects some script tags inside our html
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8081,
    // related to navigation
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    new ModuleFederationPlugin({
      name: "marketing", // subproject name, used to declare global variable when our script loads up inside the container
      filename: "remoteEntry.js",
      // what file to make available to the outside world ? in our case bootstrap.js
      exposes: {
        // whenever someone asks for this ./Marketing we're going to give them bootstrap
        "./MarketingApp": "./src/bootstrap",
      },
      // shared: ["react", "react-dom"],
      shared: packageJson.dependencies,
    }),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); // devConfig listed second to override any other similar options that we assigned in the commonConfig
