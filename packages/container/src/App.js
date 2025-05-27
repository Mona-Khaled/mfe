import React from "react";
// marketing means go and get the remoteEntry.js file
// then ask for a specific file out of that marketing remoteEntry file, which is the actual thing we exposed from marketing
import { mount } from "marketing/MarketingApp";

console.log(mount);
export default () => {
  return <h1>Hi there!</h1>;
};
