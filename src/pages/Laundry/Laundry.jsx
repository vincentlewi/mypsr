import MachineSlot from './MachineSlot'
import StripeButton from './StripeButton'
import TimeslotCard from './TimeslotCard'
import WelcomeButton from '../../components/WelcomeButton'
import CalendarNew from './CalendarNew'
import React, { useState, useRef } from 'react'
import Navbar from '../../components/Navbar'
import OrderSummary from './OrderSummary'

export default function Laundry(){
    console.log("==RENDER in Laundry.jsx==")
    const [dateID, setDateID] = useState('')
    const [laundryTimeSlot, setLaundryTimeSlot] = useState('')
    const [dryerTimeSlot, setDryerTimeSlot] = useState('')
    const [chosenLaundry, setChosenLaundry] = useState('')
    const [chosenDryer, setChosenDryer] = useState('')
    const machineSlot = useRef([])
    const dryerSlot = useRef([])
    
    const getDateID = (date) => {
        setDateID(date)
        setLaundryTimeSlot('')
        setDryerTimeSlot('')
        setChosenLaundry('')
        setChosenDryer('')
        machineSlot.current = []
        dryerSlot.current = []
    }

    const getLaundryTimeSlot = (time) => {
        setLaundryTimeSlot(time)
        machineSlot.current = []
        setChosenLaundry('')
    }

    const getDryerTimeSlot = (time) => {
        setDryerTimeSlot(time)
        dryerSlot.current = []
        setChosenDryer('')
    }

    const getChosenLaundry = (laundry) => setChosenLaundry(laundry)

    const getChosenDryer = (dryer) => setChosenDryer(dryer)


    

    let laundryData = {
        '': {},
        '2022-11-08': {
            '00:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: ['avlewi'],
                laundry3: ['jordih'],
                laundry4: ['vittosuryat.2021']
            },
            '01:00' : {
                laundry1: ['vit'],
                laundry2: ['emil'],
                laundry3: ['wilson'],
                laundry4: ['vittosuryat.202']
            },
            '02:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: ['wilsonsetiawan'],
                laundry3: [],
                laundry4: ['vittosuryat.2021']
            },
            '03:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: ['avlewi'],
                laundry3: ['jordih'],
                laundry4: ['vittosuryat.2021']
            },
            '04:00' : {
                laundry1: ['vit'],
                laundry2: ['emil'],
                laundry3: ['wilson'],
                laundry4: ['vittosuryat.202']
            },
            '05:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: [],
                laundry3: [],
                laundry4: ['vittosuryat.2021']
            },
            '06:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: ['avlewi'],
                laundry3: ['jordih'],
                laundry4: ['vittosuryat.2021']
            },
            '07:00' : {
                laundry1: ['vit'],
                laundry2: ['emil'],
                laundry3: ['wilson'],
                laundry4: ['vittosuryat.202']
            },
            '08:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: [],
                laundry3: [],
                laundry4: ['vittosuryat.2021']
            },
            '09:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: ['avlewi'],
                laundry3: ['jordih'],
                laundry4: ['vittosuryat.2021']
            },
            '10:00' : {
                laundry1: ['vit'],
                laundry2: ['emil'],
                laundry3: ['wilson'],
                laundry4: ['vittosuryat.202']
            },
            '11:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: [],
                laundry3: [],
                laundry4: ['vittosuryat.2021']
            },
            '12:00' : {
                laundry1: ['vit'],
                laundry2: ['emil'],
                laundry3: ['wilson'],
                laundry4: ['vittosuryat.202']
            },
            '13:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: [],
                laundry3: [],
                laundry4: ['vittosuryat.2021']
            },
            '14:00' : {
                laundry1: ['vit'],
                laundry2: ['emil'],
                laundry3: ['wilson'],
                laundry4: ['vittosuryat.202']
            },
            '15:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: [],
                laundry3: [],
                laundry4: ['vittosuryat.2021']
            },
            '16:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: [],
                laundry3: [],
                laundry4: ['vittosuryat.2021']
            },
            '17:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: ['avlewi'],
                laundry3: ['jordih'],
                laundry4: ['vittosuryat.2021']
            },
            '18:00' : {
                laundry1: ['vit'],
                laundry2: ['emil'],
                laundry3: ['wilson'],
                laundry4: ['vittosuryat.202']
            },
            '19:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: [],
                laundry3: [],
                laundry4: ['vittosuryat.2021']
            },
            '20:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: ['avlewi'],
                laundry3: ['jordih'],
                laundry4: ['vittosuryat.2021']
            },
            '21:00' : {
                laundry1: ['vit'],
                laundry2: ['emil'],
                laundry3: ['wilson'],
                laundry4: ['vittosuryat.202']
            },
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
            }
        },
        '2022-11-09': {
            '23:00' : {
                laundry1: ['vittosuryat.2021'],
                laundry2: ['avlewi'],
                laundry3: [],
                laundry4: ['jordhi']
            }
        }}

    let dryerData = {
            '': {},
            '2022-11-08': {
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
                    dryer1: ['vittosuryat.2021'],
                    dryer2: ['hello'],
                    dryer3: ['kyong'],
                    dryer4: ['vittosuryat.2021']
                }
            },
            '2022-11-09': {
                '23:00' : {
                    laundry1: ['vittosuryat.2021'],
                    laundry2: ['avlewi'],
                    laundry3: [],
                    laundry4: ['jordhi']
                }
        }}

    let laundryTimings = laundryData[dateID] ? Object.entries(laundryData[dateID]):null
    laundryTimings ? laundryTimings.map((slot) => {
        if(slot[0] === laundryTimeSlot){
            machineSlot.current = Object.entries(slot[1])
        }
        return machineSlot.current
    }): machineSlot.current = []

    let dryerTimings = dryerData[dateID] ? Object.entries(dryerData[dateID]):null
    dryerTimings ? dryerTimings.map((slot) => {
        if(slot[0] === dryerTimeSlot){
            dryerSlot.current = Object.entries(slot[1])
        }
        return dryerSlot.current
    }): dryerSlot.current = []

    return(
       <>
        <Navbar/>
        <WelcomeButton loc="laundry"/>
        <div className="top-part">
            <CalendarNew getDateID={getDateID}/>
            <div className="timeslot-area">
                <TimeslotCard name="Laundry" timings={laundryTimings} getTimeSlot={getLaundryTimeSlot}/>
                <TimeslotCard name="Dryer" timings={dryerTimings} getTimeSlot={getDryerTimeSlot}/>
            </div>
        </div>
        <div className="bottom-part">
            <MachineSlot name="Laundry" slots = {machineSlot.current} getChosenLaundry = {getChosenLaundry}/>
            <MachineSlot name="Dryer" slots = {dryerSlot.current} getChosenDryer = {getChosenDryer}/>
        </div>
        {(chosenLaundry || chosenDryer) ?<OrderSummary laundrySlot = {chosenLaundry} dryerSlot = {chosenDryer}/>: null}
        <StripeButton/>
       </> 
    )
}