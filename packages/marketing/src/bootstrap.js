import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

/****** Mount function to startup the app ******/
const mount = (el) => {
  ReactDOM.render(<App />, el);
};

/****** If running in development and isolation, call mount() immediately ******/
if (process.env.NODE_ENV === "development") {
  // assuming this dev only exists in the html file specific to marketing app.. its html is not used in prod
  // we should give that element an ID that is very unlikely to match an ID inside the container html file which is the one used in production
  const devRoot = document.querySelector("#_marketing-dev-root");

  if (devRoot) {
    mount(devRoot);
  }
}

/****** if running through container, export mount(), so container decides where to mount marketing app ******/

export { mount };
