import MachineSlot from './MachineSlot'
import StripeButton from './StripeButton'
import TimeslotCard from './TimeslotCard'
import WelcomeButton from '../../components/WelcomeButton'
import CalendarNew from './CalendarNew'
import React, { useState, useRef } from 'react'
import Navbar from '../../components/Navbar'

export default function Laundry(){
    const [dateID, setDateID] = useState('')
    const [timeSlot, setTimeSlot] = useState('')
    const machineSlot = useRef([])
    
    
    const getDateID = (date) =>    {
       setDateID(date)
    }
    const getTimeSlot = (time) => {
        setTimeSlot(time)
    }

    let laundryData = {
        '': {},
        '2022-11-01': {
            '10:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: ['avlewi'],
                laundry3: ['jordih'],
                laundry4: ['vittosuryat.2021']
            },
            '11:00' : {
                laundry1: ['vit'],
                laundry2: ['emil'],
                laundry3: ['wilson'],
                laundry4: ['vittosuryat.202']
            },
            '12:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: [],
                laundry3: [],
                laundry4: ['vittosuryat.2021']
            }
        },
        '2022-11-02': {
            '23:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: ['avlewi'],
                laundry3: [],
                laundry4: ['jordhi']
            }
        }}

    let laundryTimings = Object.entries(laundryData[dateID])
    laundryTimings ? laundryTimings.map((slot) => {
        if(slot[0] === timeSlot){
            machineSlot.current = Object.entries(slot[1])
        }
    }): console.log("NO DATA YET")

    return(
       <>
        <Navbar/>
        <WelcomeButton loc="laundry"/>
        <CalendarNew getDateID={getDateID}/>
        <TimeslotCard name="Laundry" timings={laundryTimings} getTimeSlot={getTimeSlot}/>
        <TimeslotCard name="Dryer"/>
        <MachineSlot name="Laundry" slots = {machineSlot.current}/>
        <MachineSlot name="Dryer"/>
        <StripeButton/>
       </> 
    )
}