import { doc, onSnapshot } from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { useAuth } from "../../../components/contexts/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { db } from "../../../components/firebase";
import { format } from "date-fns";


export const Chats = () => {
  const [chats, setChats] = useState([]);

  const { user } = useAuth()
  const { dispatch } = useContext(ChatContext);

  const [active, setActive] = useState('');

  // const tempChats = new Object();
  const tempChats = [];

  // console.log(chats)
  // cons []
  

  useEffect(() => {
    const getChats = () => {
      const unsub = onSnapshot(doc(db, "userChats", user.uid), (doc) => {
        setChats(doc.data());
        // console.log(doc.data())
        // chats.forEach(chat => {
        //   // console.log("ABECE") 
        // })
      });

      return () => {
        unsub();
        // console.log(unsub())
      };
    };

    user.uid && getChats();
  }, [user.uid]);

  // console.log(chats)

  function LastMessage(message){
    if (message.lastMessage)
      {
        // console.log(message.lastMessage)

      // const temp = new Object ()
      // temp.text = message.lastMessage.text
      // temp.img = message.lastMessage.img
      // console.log(temp)
      
      if(!message.text){
        // console.log(message.img)
        if(message.img){
          // console.log(message.userInfo.photoURL)
          return "picture was sent"
        }
      }
      else{
      message = toString(message.text) 
      // if(typeof message)
      // console.log(message)
      if(message.length >= 26){
        message = message.slice(0,25) + "..."
      }
      
      return message
    }}else{
      return ""
    }
  }

  function activeChecker(u){
    // console.log(u)
  }
  
  const handleSelect = (u) => {
    // console.log(u)
    dispatch({ type: "CHANGE_USER", payload: u });
    setActive(u.uid)
    // console.log(active)
  };
  // console.log(chats)

  function populate(){
    // console.log(chats)
    // console.log(typeof chats)
    Object.entries(chats).forEach(chat =>{
      console.log(chat[1].lastMessage)
      if(chat[1].lastMessage){
        // tempChats.push(chat[1].lastMessage)
        tempChats.push([chat[0],chat[1].lastMessage, chat[1].userInfo.uid, chat[1].userInfo.photoURL, chat[1].userInfo.displayName, chat[1].userInfo])
      }
      // console.log(chat)
    })
    console.log(tempChats)
  }
  populate()

  return (
    <div className="chats">
      {tempChats.sort((a,b)=>b[1].date - a[1].date).map((chat) => (
        <div
          className={`userChat ${active ===  chat[2] ? 'active':''}`}
          key={chat[0]}
          onClick={(e) => {
            e.target.className = 'chatSelected'
            handleSelect(chat[5])
            // activeChecker(e.target.className)
          }}
        >
        
          <img src={chat[3]} alt="" />
          <div className="userChatInfo">
            <span>{chat[4]}</span>
            {/* <p>{chat[1].lastMessage ?.text}{}</p> */}
            <p>{chat[1].text}</p>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Chats