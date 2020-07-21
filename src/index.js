import React from "react";
import ReactDOM from "react-dom";
import AllMessages from "./containers/AllMessages";
import "./index.css";
import * as serviceWorker from './serviceWorker';
import { CssBaseline, ListItemAvatar } from "@material-ui/core";
import axios from 'axios';
import { createDate, RandomNumber } from "./utils/utils";

//TODO: get rid of this line
localStorage.clear();

function PhoneStorage () {
  const [allMessages, setAllMessages] = React.useState([])
  const colors = ["orange", "purple", "green", "blue", "cyan"]
  // uncomment when you create contacts feature
  //const [contacts, setContacts] = React.useState([])

  //creates backlog message history (and eventually contacts list)
  React.useEffect( () => {
    axios.get('http://localhost:3000/unlisted/static/messageHistory.json')
    .then(res => {
      if (!res.status === 200) {
        throw new Error("HTTP error", res.status);
      }
      // formats dates of messages 
      res.data = res.data.map(thread => {
        thread.messages = thread.messages.map(message => ({
          from: message.from,
          date: createDate(message.date, message.hour, message.minute),
          text: message.text,
          state: message.state
        }))
        thread.color = colors[ RandomNumber(1, colors.length - 1, true) - 1]
        localStorage.setItem(thread.phone, JSON.stringify(thread))
        return thread
      })
      setAllMessages(res.data)
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
