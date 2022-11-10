import React from 'react';
import CalendarLanding from './CalendarLanding';
import { motion } from "framer-motion"
import { useState } from 'react';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Lottie from 'react-lottie';
import eventAnimation from "./29774-dance-party.json"
import chatAnimation from "./74908-girl-chatting-with-online-friends.json"
import maintainenceAnimation from "./52676-meditating-mechanic.json"

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

  const eventDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: eventAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const chatsDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: chatAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const maintainenceDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: maintainenceAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <>
      <div id='laundry' className='laundry screen'>
        <h1 className='break'>Laundry</h1>
        <div className='hole'></div>
        <div className='inner'>
          <motion.div animate={{ x, y }}>
            <CalendarLanding click={next} />
            <div className='content'>
              <h5>Pick a date!</h5>
            </div>
          </motion.div>
        </div>
        <div className='inner'>
          <motion.div animate={{ x, y }}>
            <CalendarLanding click={next} />
            <div className='content'>
              <h5 onClick={back}>Choose a timing!</h5>
            </div>
          </motion.div>
        </div>
        <div className='inner'>
          <motion.div animate={{ x, y }}>
            <CalendarLanding click={next} />
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
      <div id='events' className='screen row'>
        <h1 className='break'>Events</h1>
        <div className='content'>
          <Row class="d-flex align-items-center">
            <Col> <h2>Join or create events for fellow PSR residents</h2> </Col>
            <Col> <Lottie options={eventDefaultOptions} /> </Col>
          </Row>
        </div>
      </div>
      <div id='chats' className='chats screen'>
        <h1 className='break'>Chats</h1>
        <div className='content'>
          <Row class="d-flex align-items-center">
            <Col> <Lottie options={chatsDefaultOptions} /> </Col>
            <Col> <h2>Chat with some of your fellow residents </h2> </Col>
          </Row>
        </div>
      </div>
      <div id='maintenance' className='screen'>
        <h1 className='break'>Maintenance</h1>
        <div className='content'>
          <Row class="d-flex align-items-center">
            <Col> <h2>Report faulty utilities and get them fixed</h2> </Col>
            <Col> <Lottie options={maintainenceDefaultOptions} /> </Col>
          </Row>
        </div>
      </div>
    </>
  );
}