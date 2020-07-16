import React from "react";
import Message from "../components/message";
import Header from "../components/header.js";
import Input from "../components/input";
import { RealTime, RandomNumber } from "../utils/utils";
import DialogBox from "../components/dialogBox";

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
    possibleWords: ["thank", "later", "bye"],
    response: "Yeah whatever, now let me watch my stories in peace!",
    optional: false
  }
];

const person = {
  name: "",
  phone: "(907) 555-4323"
};

function Thread() {
  const [messages, setMessages] = React.useState([]);
  const [messageQueue, setMessageQueue] = React.useState([]);
  const [textCopy, setTextCopy] = React.useState("")
  

  React.useEffect(() => {
    window.scrollTo({ top: document.body.scrollHeight, behavior: "smooth" });

    if (messages.length > 0)
      if (messages[messages.length - 1].from === "Me") {
        let res = checkResponse(messages[messages.length - 1].message);
        if (res) {
          let msg = {
            from: person.name || person.phone,
            message: res.response,
            date: RealTime()
          };

          let timer = setTimeout(() => {
            let m = messageQueue.shift();
            setMessageQueue(messageQueue);
            addMessage(m.msg);
          }, RandomNumber(3, 6) * 1000);

          let q = { timer, msg };
          messageQueue.push(q);
        }
      }
  }, [messages, messageQueue]);

  React.useEffect(() => {
    if(messages.length)
    setTextCopy(JSON.stringify(messages))
  }, [messages])

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

  function addMessage(msg) {
    setMessages(prevState => [...prevState, msg]);
  }

  const allMessages = messages.map((msg, i) => (
    <Message key={i} from={msg.from} date={msg.date} message={msg.message} />
  ));

  return (
    <div>
      <Header contact={person.name || person.phone} textCopy={textCopy} />
      <div style={{ height: "75px" }}>&nbsp;</div>
      {allMessages}
      <div style={{ height: "75px" }}>&nbsp;</div>
      <Input action={addMessage} />
    </div>
  );
}

export default Thread;
