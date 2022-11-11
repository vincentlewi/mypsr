import React from 'react'
import Sidebar from './components/Sidebar'
import Chat from './components/Chat'
import { ChatContextProvider } from './context/ChatContext'
// import "./style.scss";
import "./chats.css";
import Navbar from "../../components/Navbar"

const Chats = () => {
  return (
    <>
      <Navbar />
      <div className='chatHome'>
        <div className="container">
          <ChatContextProvider>
            <Sidebar />
            <Chat />
          </ChatContextProvider>
        </div>
      </div>
    </>
  )
}

export default Chats