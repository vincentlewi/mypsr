import Navbar from '../../components/Navbar';
import WelcomeButton from '../../components/WelcomeButton'


import { useLocation, useNavigate } from "react-router-dom"
import { useIsPresent } from "framer-motion";
import PageTransition from '../../components/PageTransition'
import './Home.css'
import { useEffect } from 'react';
import { useState } from 'react';
import HomeEvents from './HomeEvents';


export default function Home(){
    console.log("==RENDER in Home.jsx==")
    const isPresent = useIsPresent()
    const location = useLocation()
    const [animate, setAnimate] = useState(location.state)
    
    useEffect(() => {
        setAnimate(0)
    }, [])
    
    return(
        <div className='home'>
            <PageTransition animated={animate} isPresent={isPresent}/>
            <Navbar/>
            <WelcomeButton loc="home"/>
            <h2>Recent updates for you</h2>
            <HomeEvents/>
        </div>
    )
}
