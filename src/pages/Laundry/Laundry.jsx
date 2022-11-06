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
    const [chosenLaundry, setChosenLaundry] = useState('')
    const [chosenDryer, setChosenDryer] = useState('')
    const machineSlot = useRef([])
    const dryerSlot = useRef([])
    
    const getDateID = (date) =>    {
       setDateID(date)
    }
    const getTimeSlot = (time) => {
        setTimeSlot(time)
    }

    const getChosenLaundry = (laundry) => {
        setChosenLaundry(laundry)
    }

    const getChosenDryer = (dryer) => {
        setChosenDryer(dryer)
    }




    let laundryData = {
        '': {},
        '2022-11-06': {
            '22:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: ['avlewi'],
                laundry3: ['jordih'],
                laundry4: ['vittosuryat.2021']
            },
            '23:00' : {
                laundry1: ['vit'],
                laundry2: ['emil'],
                laundry3: ['wilson'],
                laundry4: ['vittosuryat.202']
            },
            '16:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: [],
                laundry3: [],
                laundry4: ['vittosuryat.2021']
            }
        },
        '2022-11-07': {
            '23:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: ['avlewi'],
                laundry3: [],
                laundry4: ['jordhi']
            }
        }}

    let dryerData = {
            '': {},
            '2022-11-06': {
                '10:00' : {
                    dryer1: ['wilsos'],
                    dryer2: [],
                    dryer3: ['jordih'],
                    dryer4: ['vittosuryat.2021']
                },
                '11:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '12:00' : {
                    laundry1: ['vittosuryat.2021'],
                    laundry2: ['hello'],
                    laundry3: ['kyong'],
                    laundry4: ['vittosuryat.2021']
                }
            },
            '2022-11-07': {
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

    let dryerTimings = Object.entries(dryerData[dateID])
    dryerTimings ? dryerTimings.map((slot) => {
        if(slot[0] === timeSlot){
            dryerSlot.current = Object.entries(slot[1])
        }
    }): console.log("NO DATA YET")

    return(
       <>
        <Navbar/>
        <WelcomeButton loc="laundry"/>
        <CalendarNew getDateID={getDateID}/>
        <TimeslotCard name="Laundry" timings={laundryTimings} getTimeSlot={getTimeSlot}/>
        <TimeslotCard name="Dryer" timings={dryerTimings} getTimeSlot={getTimeSlot}/>
        <MachineSlot name="Laundry" slots = {machineSlot.current} getChosenLaundry = {getChosenLaundry}/>
        <p>{chosenLaundry}</p>
        <MachineSlot name="Dryer" slots = {dryerSlot.current} getChosenDryer = {getChosenDryer}/>
        <p>{chosenDryer}</p>
        <StripeButton/>
       </> 
    )
}