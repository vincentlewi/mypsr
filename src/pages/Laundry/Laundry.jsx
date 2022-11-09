import MachineSlot from './MachineSlot'
import StripeButton from './StripeButton'
import TimeslotCard from './TimeslotCard'
import WelcomeButton from '../../components/WelcomeButton'
import CalendarNew from './CalendarNew'
import React, { useState, useRef } from 'react'
import Navbar from '../../components/Navbar'
import OrderSummary from './OrderSummary'
import { db } from '../../components/firebase'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { useEffect } from 'react'
import { format } from 'date-fns'

export default function Laundry(){
    console.log("==RENDER in Laundry.jsx==")
    let today = new Date()
    let dateToday = format(today, 'yyyy-MM-dd')

    const [dateID, setDateID] = useState(dateToday)
    const [laundryDateObject, setLaundryDateObject] = useState([])
    const [dryerDateObject, setDryerDateObject] = useState([])
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
 
    async function getLaundryDate(dateID){
        const docRef = doc(db, "laundry", dateID)
        const docSnap = await getDoc(docRef)

        if (docSnap.exists()){
            setLaundryDateObject(docSnap.data()) 
        }
        else{
            await setDoc(docRef,
            {
                '00:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '01:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '02:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '03:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '04:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '05:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '06:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '07:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '08:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '09:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '10:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '11:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '12:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '13:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '14:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '15:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '16:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '17:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '18:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '19:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '20:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '21:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '22:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                },
                '23:00' : {
                    laundry1: [],
                    laundry2: [],
                    laundry3: [],
                    laundry4: []
                }
            })
            getLaundryDate(dateID)
        }
    }

    async function getDryerDate(dateID){
        const docRef = doc(db, "dryer", dateID)
        const docSnap = await getDoc(docRef)
        if (docSnap.exists()){
            setDryerDateObject(docSnap.data()) 
        }
        else{
            await setDoc(docRef,
            {
                '00:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '01:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '02:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '03:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '04:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '05:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '06:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '07:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '08:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '09:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '10:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '11:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '12:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '13:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '14:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '15:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '16:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '17:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '18:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '19:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '20:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '21:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '22:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                },
                '23:00' : {
                    dryer1: [],
                    dryer2: [],
                    dryer3: [],
                    dryer4: []
                }
            })
            getDryerDate(dateID)
        }

    }

    useEffect(()=>{
        getLaundryDate(dateID)
        getDryerDate(dateID)
    },[dateID])

    let laundryTimings = Object.entries(laundryDateObject).sort()
    laundryTimings ? laundryTimings.map((slot) => {
        if(slot[0] === laundryTimeSlot){
            machineSlot.current = Object.entries(slot[1]).sort()
        }
        return machineSlot.current
    }): machineSlot.current = []

    let dryerTimings = Object.entries(dryerDateObject).sort()
    dryerTimings ? dryerTimings.map((slot) => {
        if(slot[0] === dryerTimeSlot){
            dryerSlot.current = Object.entries(slot[1]).sort()
        }
        return dryerSlot.current
    }): dryerSlot.current = []

    return(
       <>
        <Navbar/>
        <div className="container">
            <WelcomeButton loc="laundry"/>
            <div className="top-part">
                <CalendarNew getDateID={getDateID}/>
                <div className="timeslot-area">
                    <TimeslotCard name="Laundry" timings={laundryTimings} getTimeSlot={getLaundryTimeSlot} dateID={dateID}/>
                    <TimeslotCard name="Dryer" timings={dryerTimings} getTimeSlot={getDryerTimeSlot} dateID = {dateID}/>
                </div>
            </div>
            <div className="bottom-part">
                {laundryTimeSlot?<MachineSlot name="Laundry" slots = {machineSlot.current} getChosenLaundry = {getChosenLaundry}/>: null}
                {dryerTimeSlot?<MachineSlot name="Dryer" slots = {dryerSlot.current} getChosenDryer = {getChosenDryer}/>:null}
            </div>

            {/* LaundryTimeSlot = 10:00 chosenLaundry = laundry 2 */}
            {(chosenLaundry || chosenDryer) ?
                <OrderSummary
                laundryTimeSlot = {laundryTimeSlot}
                laundrySlot = {chosenLaundry}
                dryerSlot = {chosenDryer}
                dryerTimeSlot = {dryerTimeSlot}/>: null}
            <StripeButton/>
        </div>
       </> 
    )
}