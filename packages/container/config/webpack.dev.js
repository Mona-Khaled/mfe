// merge, a fn used to merge 2 different webpack config objects, so we can take what is in the common config file and merge it into the config inside dev here
const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const devConfig = {
  mode: "development",
  devServer: {
    port: 8080,
    // related to navigation
    historyApiFallback: {
      index: "index.html",
    },
  },
  plugins: [
    // setup the container as the 'host', host that makes use of some modules coming from other parts of the app
    // so here we need to specify our different remote options
    new ModuleFederationPlugin({
      // not strictly required since we are already in the host
      name: "container",
      // keys are the names of the different modules that we will require/import inside the container project
      // values are where the remoteEntry file is for that module
      remotes: {
        // the word 'marketing' before the @ symbol matches up with the name attr that we wrote inside the marketing webpack dev file
        // for the 'marketing' key itself, is used whenever we write an import statement inside of the container and ask for something called 'marketing' then we will load up that remoteEntry file and look inside there for it
        marketing: "marketing@http://localhost:8081/remoteEntry.js",
      },
      // shared: ["react", "react-dom"],
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, devConfig); // devConfig listed second to override any other similar options that we assigned in the commonConfig
