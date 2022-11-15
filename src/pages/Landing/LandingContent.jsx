import React from 'react';
import CalendarLanding from './CalendarLanding';
import { motion } from "framer-motion"
import { useState, useEffect } from 'react';
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"
import Lottie from 'react-lottie';
import eventAnimation from "./29774-dance-party.json"
import chatAnimation from "./74908-girl-chatting-with-online-friends.json"
import maintainenceAnimation from "./52676-meditating-mechanic.json"
import registrationAnimation from "./112454-form-registration.json"
import laundryAnimation from "./108241-laundry.json"

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

  const registrationDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: registrationAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  const laundryDefaultOptions = {
    loop: true,
    autoplay: true,
    animationData: laundryAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice"
    }
  };

  return (
    <>
      <div id='laundry' className='laundry screen'>
        <h1 className='break'>Laundry</h1>
          <div className='content mx-auto'>
            <Row className="d-flex align-items-center">
              <Col> <Lottie options={laundryDefaultOptions} speed={0.7}/> </Col>
              <Col> <h2>Book washing and dryer machines to do you laundry !</h2> </Col>
            </Row>
          </div>
      </div>

      <div id='events' className='screen row'>
        <h1 className='break'>Events</h1>
        <div className='content mx-auto'>
          <Row className="d-flex align-items-center">
            <Col> <h2>Join or create events for fellow PSR residents</h2> </Col>
            <Col> <Lottie options={eventDefaultOptions} /> </Col>
          </Row>
        </div>
      </div>

      <div id='services' className='services screen'>
        <h1 className='break'>Services</h1>
        <div className='content mx-auto'>
          <Row className="d-flex align-items-center">
            <Col> <h3>Report faulty utilities and get them fixed</h3> </Col>
            <Col> <Lottie options={maintainenceDefaultOptions} width={'70%'}/> </Col>
          </Row>
          <Row className="d-flex align-items-center">
            <Col> <Lottie options={registrationDefaultOptions} width={'70%'} /> </Col>
            <Col> <h3>Register your favourite guests seamlessly</h3> </Col>
          </Row>
        </div>
      </div>

      <div id='chats' className='chats screen'>
        <h1 className='break'>Chats</h1>
        <div className='content mx-auto'>
          <Row className="d-flex align-items-center">
            <Col> <Lottie options={chatsDefaultOptions} width={'100%'}/> </Col>
            <Col> <h2>Chat with some of your fellow residents </h2> </Col>
          </Row>
        </div>
      </div>

    </>
  );
}