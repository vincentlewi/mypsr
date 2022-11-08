import React from 'react';
import CalendarLanding from './CalendarLanding';
import { motion } from "framer-motion"
import { useState } from 'react';

export default function PreLoginContent() {
  const x = 0
  // const y = -document.documentElement.clientHeight
  const [y, setY] = useState(0)

  const next = () => {
    setY(y - document.documentElement.clientHeight + 56)
  }
  const back = () => {
    setY(y + document.documentElement.clientHeight - 56)
  }

  return (
    <>
      <div id='laundry' className='laundry screen'>
        <h1 className='break'>Laundry</h1>
        <div className='hole'></div>
        <div className='inner'>
          <motion.div animate={{ x, y }}>
          <CalendarLanding click={next}/>
          <div className='content'>
            <h5>Pick a date!</h5>
          </div>
          </motion.div>
        </div>
        <div className='inner'>
          <motion.div animate={{ x, y }}>
          <CalendarLanding click={next}/>
          <div className='content'>
            <h5 onClick={back}>Choose a timing!</h5>
          </div>
          </motion.div>
        </div>
        <div className='inner'>
          <motion.div animate={{ x, y }}>
          <CalendarLanding click={next}/>
          <div className='content'>
            <h5 onClick={back}>Select a machine!</h5>
          </div>
          </motion.div>
        </div>
        <div className='inner' onClick={back}>
          <motion.div animate={{ x, y }}>
          <div className='content'>
            <h1>Yay! You got your laundry booked. Easy right?</h1>
          </div>
          </motion.div>
        </div>
      </div>
      <div id='events' className='screen'>
        <h1 className='break'>Events</h1>
        <img src={require('../../assets/laundry.png')} alt='test'/>
        <div className='content'>
          <h2>get your shit done in a minute</h2>
        </div>
      </div>
      <div id='chats' className='chats screen'>
        <h1 className='break'>Chats</h1>
        <img src={require('../../assets/laundry.png')} alt='test'/>
        <div className='content'>
          <h2>get your shit done in a minute</h2>
        </div>
      </div>
      <div id='maintenance' className='screen'>
        <h1 className='break'>Maintenance</h1>
        <img src={require('../../assets/laundry.png')} alt='test'/>
        <div className='content'>
          <h2>get your shit done iWn a minute</h2>
        </div>
      </div>
    </>
  );
}