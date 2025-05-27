import { mount } from "marketing/MarketingApp";
import React, { useRef, useEffect } from "react";

export default () => {
  // create a ref for a div that resides in the continer/Host, to be passed to the mount funciton

  /* the div is passed to the mount function so that the marketing app starts to create 
  an instance of the marketing app and render it inside of that div/reference from the container app */

  const ref = useRef(null);

  useEffect(() => {
    /**
    we're going to call our mount function and we'll pass in 'ref.current'.
    So that is the reference to the HTML element. We are passing that into the mount function.
    Mount is gonna take it, it's gonna try to create an instance of our MarketingApp and render it into that div.

    it is pretty much fully reusable. We can use this exact same approach with just about any other framework
    that we ever use inside of a child application as long as that framework can render itself
    or render its app into some arbitrary HTML element. So you should probably be able to use this kind of pattern,
    with say, an Angular app or vue.
     */
    mount(ref.current);
  });

  return <div ref={ref} />;
};
