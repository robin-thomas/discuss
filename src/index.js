import React from "react";
import ReactDOM from "react-dom";
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

ReactDOM.render(<Discuss />, document.getElementById("root"));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
