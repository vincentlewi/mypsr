import React from 'react'
import Navbar from "./Navbar"
import Search from "./Search"
import Chats from "./Chats"

export const Sidebar = () => {
  return (
    <div className='sidebar'>
      <Navbar />
      <Search />
      <div className='needscroll'>
      <Chats />
      </div>
    </div>
  )
}

export default Sidebar