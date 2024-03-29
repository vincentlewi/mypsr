import React, { useContext, useEffect, useRef } from "react";
import { useAuth } from "../../../components/contexts/AuthContext";
import { ChatContext } from "../context/ChatContext";
import { format } from 'date-fns'

const Message = ({ message }) => {
  const { user } = useAuth();
  const { data } = useContext(ChatContext);

  const ref = useRef();
  const today = new Date()
  const tanggal = new Date(message.date.seconds*1000)
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
        <div className='contents'>
          {message.text && message.text}
          {message.img && <img src={message.img} alt="" />}
          <div className="timestamp">{today.toDateString() === tanggal.toDateString()
            ? format(tanggal, 'HH:mm')
            : format(tanggal, 'MMM dd, HH:mm')
          }</div>
        </div>
      </div>
    </div>
  );
};

export default Message;