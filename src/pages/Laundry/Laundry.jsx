import MachineSlot from './MachineSlot'
import StripeButton from './StripeButton'
import TimeslotCard from './TimeslotCard'
import WelcomeButton from '../../components/WelcomeButton'
import CalendarNew from './CalendarNew'
import React, { useState } from 'react'
import Navbar from '../../components/Navbar'

export default function Laundry(){
    const [dateData, setDateData] = useState("")
    
    const value = (date) => {
        setDateData(date)
    }

    return(
       <>
        <Navbar/>
        <WelcomeButton loc="laundry"/>
        <CalendarNew value={value}/>
        <p>{dateData}</p>
        <TimeslotCard name="Laundry"/>
        <TimeslotCard name="Dryer"/>
        <MachineSlot name="Laundry"/>
        <MachineSlot name="Dryer"/>
        <StripeButton/>
       </> 
    )
}