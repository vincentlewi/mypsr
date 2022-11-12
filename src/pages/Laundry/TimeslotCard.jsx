import './TimeslotCard.css'
import {format} from 'date-fns'


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}


export default function TimeslotCard(props){
    console.log("==RENDER in TimeslotCard.jsx==")
    let today = new Date()
    let nowHour = today.getHours()
    let dayNow = format(today, 'yyyy-MM-dd')

    return (
        <div className="timeslot-card container-sm p-3">
            <h3>{props.name}</h3>
            {props.timings ? props.timings.map((hourSlot)=>{
            let time = hourSlot[0]
            let hour = time.split(":")[0]
            return(
            <div className="col-lg-2 col-md-4 col-sm-6 timeslot-buttons" key={time}>
                <button
                    className = { //if either of this is TRUE returns 'laundrybtn'
                        (parseInt(hour) >= nowHour || // returns TRUE when timing slot >= hour NOW
                        dayNow !== props.dateID) && //returns TRUE when 
                        !Object.values(hourSlot[1]).every((slot) => slot[0]) //if not all the slot is filled return true
                        ?'laundrybtn':'disabledbtn'}
                    
                        disabled = {
                        Object.values(hourSlot[1]).every((slot) => slot[0]) //klaau semua ad nama org == true
                        || 
                        (parseInt(hour) < nowHour && dayNow === props.dateID)
                    }    
                    id={time}
                    key={time}
                    style={{width:'100%'}}
                    onClick = {(e) => props.getTimeSlot(e.target.id)}
                >
                    {time}
                </button>
            </div>
            )

            }):null}
        </div>
    )
}