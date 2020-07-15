import React from "react";
import ReactDOM from "react-dom";
import Thread from "./containers/Thread";
import "./index.css";
import App from './App';
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from "@material-ui/core";

ReactDOM.render(
  <React.StrictMode>
    <CssBaseline />
    <Thread />
  </React.StrictMode>,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
