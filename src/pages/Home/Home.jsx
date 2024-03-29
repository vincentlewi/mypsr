import Navbar from '../../components/Navbar';
import WelcomeButton from '../../components/WelcomeButton'


import { useLocation } from "react-router-dom"
import { useIsPresent } from "framer-motion";
import PageTransition from '../../components/PageTransition'
import './Home.css'
import { useEffect } from 'react';
import { useState } from 'react';
import HomeEvents from './HomeEvents';
import HomeLaundryEvents from './HomeLaundryEvents';


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
            <div className="container">
                <WelcomeButton loc="home"/>
                <HomeEvents/> 
                <HomeLaundryEvents />
            </div>
        </div>
    )
}
