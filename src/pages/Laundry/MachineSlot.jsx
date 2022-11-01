import './TimeslotCard.css';
export default function MachineSlot(props){
    return(
        <div className="machine-slot row">
            <h3>{props.name}</h3>
            {props.slots ? props.slots.map((slot) => {
                console.log(slot[1])
                if(slot[1].length > 0){    
                    return <button className = "btn col-6 btn-success" id={slot[0]} key={slot}>{slot[0]}</button>
                }
                else{
                    return <button className = "btn col-6" id={slot[0]} disabled key={slot}>{slot[0]}</button>
                }
            }): console.log("NO DATA")
            }
        </div>
    )
}   