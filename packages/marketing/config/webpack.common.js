module.exports = {
  module: {
    // define loaders that tells webpack to process some files as we import them into the project
    rules: [
      // 1st loader to wire up is, Babel
      // Babel processes all of our code from the ES2015, ES2016,... and turn it into regular ES5 code that can be executed inside all browsers
      {
        test: /\.m?js$/, // whenever importing a file with an extension of mjs or js then process it by babel
        exclude: /node_modules/, // do not run babel on any file inside node_modules directory
        use: {
          loader: "babel-loader",
          options: {
            // @babel/preset-react, babel will process all JSX tags
            // @babel/preset-env, transform our code in variety of ways, taking ES2015, ES2016,.. so on and convert it down to ES5
            presets: ["@babel/preset-react", "@babel/preset-env"],
            // below plugin, to add additional code to enable features inside the browser, ex: async/await syntax
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
    ],
  },
};
