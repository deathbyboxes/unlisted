import React from "react";
import ReactDOM from "react-dom";
import AllMessages from "./containers/AllMessages";
import "./index.css";
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from "@material-ui/core";

//TODO: get rid of this line
localStorage.clear();

ReactDOM.render(
  <>
    <CssBaseline />
    <AllMessages />
  </>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
