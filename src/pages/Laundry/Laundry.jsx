import MachineSlot from './MachineSlot'
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
import Calendar from './WeeklyCalendar'
// import { CalendarPicker } from './WeeklyCalendar/calendar/CalendarPicker'


export default function Laundry(){
    let today = new Date()
    let dateToday = format(today, 'yyyy-MM-dd')

    const [data, setData] = useState(null);
    

    const showDetailsHandle = (dayStr) => {
        setData(dayStr);
      };

    
    const [dateID, setDateID] = useState(dateToday)
    const [laundryDateObject, setLaundryDateObject] = useState([])
    const [dryerDateObject, setDryerDateObject] = useState([])
    const [laundryTimeSlotList, setLaundryTimeSlotList] = useState([])
    const [laundryMachineSlotList, setLaundryMachineSlotList] = useState([])
    const [dryerTimeSlotList, setDryerTimeSlotList] = useState([])
    const [dryerMachineSlotList, setDryerMachineSlotList] = useState([])
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
        setLaundryTimeSlotList([])
        setDryerTimeSlotList([])  
        setLaundryMachineSlotList([])  
        setDryerMachineSlotList([])  
        machineSlot.current = []
        dryerSlot.current = []
    }

    const getLaundryTimeSlot = (time) => {
        setLaundryTimeSlot(time)
        setLaundryTimeSlotList([])
        setLaundryMachineSlotList([])  
        machineSlot.current = []
        setChosenLaundry('')
    }

    const getDryerTimeSlot = (time) => {
        setDryerTimeSlot(time)
        setDryerTimeSlotList([])
        setDryerMachineSlotList([]) 
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
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '01:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '02:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '03:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '04:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '05:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '06:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '07:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '08:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '09:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '10:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '11:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '12:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '13:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '14:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '15:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '16:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '17:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '18:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '19:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '20:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '21:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '22:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
                },
                '23:00' : {
                    washer1: [],
                    washer2: [],
                    washer3: [],
                    washer4: []
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
            <div className="top d-flex justify-content-center">
                {/* <CalendarNew getDateID={getDateID}/> */}
                <Calendar showDetailsHandle={showDetailsHandle} getDateID={getDateID}/>
                {/* <CalendarPicker/> */}
            </div>
            <div className="washer">
                <TimeslotCard name="Laundry" timings={laundryTimings} getTimeSlot={getLaundryTimeSlot} setSlotList = {setLaundryTimeSlotList} slotList = {laundryTimeSlotList} dateID={dateID} currentSlot = {laundryTimeSlot}/>
                {laundryTimeSlot?<MachineSlot name="Laundry" slots = {machineSlot.current} timeslot = {laundryTimeSlot} setSlotList = {setLaundryMachineSlotList} slotList = {laundryMachineSlotList} getChosenLaundry = {getChosenLaundry} currentMachine = {chosenLaundry}/>: null}
            </div>
            <div className="dryer">
                <TimeslotCard name="Dryer" timings={dryerTimings} getTimeSlot={getDryerTimeSlot} setSlotList = {setDryerTimeSlotList} slotList = {dryerTimeSlotList} dateID = {dateID} currentSlot = {dryerTimeSlot}/>
                {dryerTimeSlot?<MachineSlot name="Dryer" slots = {dryerSlot.current} timeslot = {dryerTimeSlot} setSlotList = {setDryerMachineSlotList} slotList = {dryerMachineSlotList} getChosenDryer = {getChosenDryer} currentMachine = {chosenDryer}/>:null}
            </div>
            <div className="bottom-part">
                {(chosenLaundry || chosenDryer) ?
                <OrderSummary
                laundryTimeSlot = {laundryTimeSlot}
                laundrySlot = {chosenLaundry}
                dryerSlot = {chosenDryer}
                dryerTimeSlot = {dryerTimeSlot}
                dateID = {dateID}
                getDateID={getDateID} />: null}
            </div>
        </div>
       </> 
    )
}