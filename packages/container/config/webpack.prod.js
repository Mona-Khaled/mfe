const { merge } = require("webpack-merge");
const ModuleFederationPlugin = require("webpack/lib/container/ModuleFederationPlugin");
const commonConfig = require("./webpack.common");
const packageJson = require("../package.json");

// environment variable, will be defined when we build the app through CI/CD pipeline
// it will contain a string that says where our production app is hosted
// so now we can make sure we get the correct remoteEntry url inside of here
// when we deploy the app and create all of the infrastructure on AWS, we will know what our prod domain is, then we can go back to our CI/CD pipeline and set up this env variable, and then whenever we run our webpack prod build that value for the domain will automaticallu put into this string
const domain = process.env.PRODUCTION_DOMAIN;

const prodConfig = {
  mode: "production", // causes webpack to run differently, will ensure all JS files that are built gets optimized/minified.. takes longer to run webpack in prod mode, however, it's gonna make sure we get a much more production-specific build coming out
  output: {
    filename: "[name].[contenthash].js", // ensures some files that are built for prod will use this as a template to figure out how to name them.. done for caching issues
  },
  plugins: [
    // ensue remoteEntry files URL will point to actual production domain, as opposed to the local hosts that we pointed at inside the development webpack config file
    new ModuleFederationPlugin({
      // not strictly required since we are already in the host module, just recommended
      name: "container",
      // where should we go to get the source code ?
      remotes: {
        // making an assumption, that remoteEntry file will be nested inside of a folder called 'maketing', to make sure different remoteEntry files of different subprojects don't override eachother
        marketing: `marketing@${domain}/marketing/remoteEntry.js`,
      },
      shared: packageJson.dependencies,
    }),
  ],
};

module.exports = merge(commonConfig, prodConfig);
