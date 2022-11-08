import './TimeslotCard.css';
export default function MachineSlot(props){
    console.log("==RENDER in MachineSlot.jsx==")
    return(
        <div className="machine-slot">
            <h3>{props.name}</h3>
            {props.slots ? props.slots.map((slot) => {
                if(slot[1].length === 0){    
                    return (
                        <div className="timeslot-buttons" key={slot}>
                        <button
                        className = "laundrybtn"
                        id={slot[0]}
                        key={slot}
                        onClick={(e) => {props.name === "Laundry" ? 
                        props.getChosenLaundry(e.target.id):
                        props.getChosenDryer(e.target.id)}}
                        style={{width: '100%'}}
                        >{slot[0]}</button>
                        </div>          
                )
                }
                else{
                    return (
                        <div className="timeslot-buttons" key={slot}>
                            <button className = "disabledbtn" id={slot[0]} style={{width: '100%'}} disabled key={slot}>{slot[0]}</button>
                        </div>
                    )}
            }): console.log("No Machine slot")
            }
        </div>
    )
}   