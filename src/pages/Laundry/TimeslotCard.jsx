import './TimeslotCard.css'

export default function TimeslotCard(props){
    console.log("==RENDER in TimeslotCard.jsx==")
    return (
        <div className="timeslot-card container-sm p-3">
            <h3>{props.name}</h3>
            {props.timings ? props.timings.map((hourSlot)=>{
            let time = hourSlot[0]
            return(
            <div className="col-lg-2 col-md-4 col-sm-6 timeslot-buttons" key={time}>
                <button
                    className = {!Object.values(hourSlot[1]).every((slot) => slot[0])?'laundrybtn':'disabledbtn'}
                    disabled = {Object.values(hourSlot[1]).every((slot) => slot[0])}    
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