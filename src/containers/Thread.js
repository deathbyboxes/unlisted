import React from "react";
import Message from "../components/message";
import Header from "../components/header.js";
import Input from "../components/input";
import { formatDate, formatNumber, RandomNumber } from "../utils/utils";
import { makeStyles } from "@material-ui/core";
import {deepPurple, green, deepOrange, blueGrey} from '@material-ui/core/colors';

const responses = [
  {
    possibleWords: ["hey", "yo", "sup", "hello"],
    response: "Whatya want!? I'm busy watchin my General Hospitals!",
    optional: true
  },
  {
    possibleWords: ["sorry", "apolog", "bad"],
    response: "Oh boo hoo, get to the point!",
    optional: true
  },
  {
    possibleWords: ["where", "someone", "looking", "info"],
    response: "Can yous be more specific? As I said, I'm very busy right nows!",
    optional: true
  },
  {
    possibleWords: ["tony"],
    response:
      "I don't know no one by dat name! And even if I did, i ain't no RAT.",
    optional: false
  },
  {
    possibleWords: [""],
    response:
      "I'm just messin, I hate Tony, so I'll tell ya's. but first you gotta answer a question for me...",
    optional: false
  },
  {
    possibleWords: [""],
    response: "Now listen up... who would win in a fight, a taco or a grilled cheese sandwich?",
    optional: false
  },
  {
    possibleWords: [""],
    response: "Well, when you have an actual answer, I'll be here.",
    optional: true
  },
  {
    possibleWords: ["taco", "grilled cheese"],
    response: "Ayyy, good answer! Tony was hangin out at that Frolics joint last I saws",
    optional: false
  },
  {
    possibleWords: ["where", "location"],
    response: "On the corner of 10th and Sawyer",
    optional: true
  },
  {
    possibleWords: ["when", "time"],
    response: "What do i look like, an encyclopedia? That's all i know, ok? ",
    optional: true
  },
  {
    possibleWords: ["thank", "later", "bye", "ok"],
    response: "Yeah whatever, now let me watch my stories in peace!",
    optional: false
  }
];

function Thread({closeMsg, containerRef, thread, addMessage}) {
  const [messageQueue, setMessageQueue] = React.useState([]);
  const [textCopy, setTextCopy] = React.useState("")
  const threadWindowRef = React.useRef(null);
  
  //effect once just to get to the bottom of the thread if messages exist
  React.useEffect(() => {
    containerRef.current.scrollTo({ top: threadWindowRef.current.scrollHeight });
  }, [])

  React.useEffect(() => {
    if (thread.messages.length){
      containerRef.current.scrollTo({ top: threadWindowRef.current.scrollHeight, behavior: "smooth" });
      let data = JSON.stringify(thread.messages)
      setTextCopy(data)
      
      if (thread.messages[thread.messages.length - 1].from === "Me") {
        let res = checkResponse(thread.messages[thread.messages.length - 1].text);
        if (res) {
          let msg = {
            from: thread.name || thread.phone,
            text: res.response,
            date: new Date()
          };

          let timer = setTimeout(() => {
            let m = messageQueue.shift();
            setMessageQueue(messageQueue);
            addMessage(thread.phone, m.msg);
          }, RandomNumber(2, 6) * 1000);

          let q = { timer, msg };
          messageQueue.push(q);
        }
      }
    }
  }, [JSON.stringify(thread)]);

  function checkResponse(msg) {
    let i, tmpI, res;
    let iter = 0;
    while (!res) {
      if (
        responses[iter]?.possibleWords.filter(
          w => msg.toLowerCase().indexOf(w) > -1
        ).length > 0
      )
        tmpI = iter;
      if (responses[iter]?.optional) iter++;
      else {
        i = tmpI;
        if (Number.isInteger(i)) res = responses.splice(0, i + 1).pop();
        break;
      }
    }
    return res;
  }

  const allMessages = thread.messages.map((msg, i) => (
    <Message key={i} from={msg.from} date={formatDate(msg.date)} message={msg.text} />
  ));

  return (
    <div ref={threadWindowRef}>
      <Header contact={thread.name || formatNumber(thread.phone)} textCopy={textCopy} closeMsg={closeMsg} color={thread.color} />
      <div style={{ height: "75px" }}>&nbsp;</div>
      {allMessages}
      <div style={{ height: "75px" }}>&nbsp;</div>
      <Input phone={thread.phone} action={addMessage} />
    </div>
  );
}

export default Thread;
