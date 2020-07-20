import React from "react";
import ReactDOM from "react-dom";
import AllMessages from "./containers/AllMessages";
import "./index.css";
import * as serviceWorker from './serviceWorker';
import { CssBaseline } from "@material-ui/core";
import { fetchMsgHistory } from "./utils/utils";
import axios from 'axios';

//TODO: get rid of this line
localStorage.clear();

function PhoneStorage () {
  const [allMessages, setAllMessages] = React.useState([])
  const [contacts, setContacts] = React.useState([])

  React.useEffect(async () => {
    const result = await axios('http://localhost:3000/unlisted/static/messageHistory.json',);
    setAllMessages(result.data)
  })

  return (
    <>
      <CssBaseline />
      <AllMessages allMessages={allMessages} />
    </>
  )
}

ReactDOM.render(
  <PhoneStorage />,
  document.querySelector("#root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
