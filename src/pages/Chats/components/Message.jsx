import React, { useContext, useEffect, useRef } from "react";
import { useAuth } from "../../../components/contexts/AuthContext";
import { ChatContext } from "../context/ChatContext";

const Message = ({ message }) => {
  const { user } = useAuth();
  const { data } = useContext(ChatContext);

  const ref = useRef();

  useEffect(() => {
    ref.current?.scrollIntoView({ behavior: "smooth" });
  }, [message]);

  return (
    <div
      ref={ref}
      className={`message ${message.senderId === user.uid && "owner"}`}
    >
      <div className="messageInfo">
        <img
          src={
            message.senderId === user.uid
              ? user.photoURL
              : data.user.photoURL
          }
          alt=""
        />
        
      </div>
      <div className="messageContent">
        <p>{message.text && message.text}
        {message.img && <img src={message.img} alt=""/>}
        <div className="timestamp">
        <span>just now</span>
        </div>
        </p>
      </div>
    </div>
  );
};

export default Message;