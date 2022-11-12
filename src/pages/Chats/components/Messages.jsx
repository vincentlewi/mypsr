import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { ChatContext } from "../context/ChatContext";
import { db } from "../../../components/firebase";
import Message from "./Message";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { data } = useContext(ChatContext);
  // const [ messageUse, setMessageUse ] = useState([])

  useEffect(() => {
    const unSub = onSnapshot(doc(db, "chats", data.chatId), (doc) => {
      doc.exists() && setMessages(doc.data().messages);
    });

    return () => {
      unSub();
    };
  }, [data.chatId]);

  // const temp = []
  // // console.log(messages)
  // messages.map((m) => {
  //   const hold = new Object()
  //   if(m.text.length === 0){
  //     if (m.img){
  //       hold.date = m.date
  //       hold.id = m.id
  //       hold.img = m.img
  //       hold.senderId = m.senderId
  //       temp.push(hold)
  //     }
  //     // for (const key in hold) {
  //     //   delete hold[key];
  //     // }
  //   }
  //   else{
  //     temp.push(m)
  //   }
  // })
  // setMessageUse(temp)

  return (
    <div className="messages">
      {messages.map((m) => (
        <Message message={m} key={m.id} />
      ))}
    </div>
  );
};

export default Messages;