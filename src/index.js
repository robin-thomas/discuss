import React from "react";
import { hydrate, render } from "react-dom";
import "./index.css";
import * as serviceWorker from "./serviceWorker";

import App from "./components/app";

import DataProvider from "./components/utils/DataProvider";

import "bootstrap/dist/css/bootstrap.min.css";

const Discuss = props => (
  <DataProvider>
    <App />
  </DataProvider>
);

const rootElement = document.getElementById("root");
if (rootElement.hasChildNodes()) {
  hydrate(<Discuss />, rootElement);
} else {
  render(<Discuss />, rootElement);
}

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
