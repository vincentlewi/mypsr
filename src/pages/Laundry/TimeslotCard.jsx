import './TimeslotCard.css'

export default function TimeslotCard(props){
    return (
<div className="timeslot-card container-sm p-3">
            <h3>{props.name}</h3>
            {props.timings ? props.timings.map((hourSlot)=>{
            let time = hourSlot[0]
            return <button
                className = 'btn col-2 btn-success'
                disabled = {Object.values(hourSlot[1]).every((slot) => slot[0])}
                id={time}
                key={time}
                onClick = {(e) => props.getTimeSlot(e.target.id)}
            >
                {time}
            </button>

        }):null}
        </div>
    )
}