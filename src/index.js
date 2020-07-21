import React from "react";
import ReactDOM from "react-dom";
import AllMessages from "./containers/AllMessages";
import "./index.css";
import * as serviceWorker from './serviceWorker';
import { CssBaseline, ListItemAvatar } from "@material-ui/core";
import axios from 'axios';

//TODO: get rid of this line
localStorage.clear();

function PhoneStorage () {
  const [allMessages, setAllMessages] = React.useState([])
  //const [contacts, setContacts] = React.useState([])

  React.useEffect( () => {
    axios.get('http://localhost:3000/unlisted/static/messageHistory.json')
    .then(res => {
      if (!res.status === 200) {
        throw new Error("HTTP error", res.status);
      }
      setAllMessages(res.data)
      res.data.forEach(thread => {
        localStorage.setItem(thread.phone, JSON.stringify(thread))
      })
    })
    .catch(err => { throw new Error(err) })
  }, [])

  function addMessage (phone, msg) {
    let thread = allMessages.filter(thread => thread.phone === phone)[0]
    thread.messages.push(msg)
    localStorage.setItem(`${phone}`, thread)
    setAllMessages(threads => 
      threads.map(t => 
        t.phone === phone
        ? { ...t, messages: thread.messages }
        : t
      )  
    )
  }

  return (
    <>
      <CssBaseline />
      <AllMessages addMessage={addMessage} allMessages={allMessages} />
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
