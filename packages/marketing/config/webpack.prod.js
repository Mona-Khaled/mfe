const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

const prodConfig = {
  mode: "production", // causes webpack to run differently, will ensure all JS files that are built gets optimized/minified.. takes longer to run webpack in prod mode, however, it's gonna make sure we get a much more production-specific build coming out
  output: {
    filename: "[name].[contenthash].js", // ensures some files that are built for prod will use this as a template to figure out how to name them.. done for caching issues
  },
  plugins: [
    // ensue remoteEntry files URL will point to actual production domain, as opposed to the local hosts that we pointed at inside the development webpack config file
    new ModuleFederationPlugin({
      name: "marketing",
      filename: "remoteEntry.js",
      exposes: {
        "./MarketingApp": "./src/bootstrap",
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
