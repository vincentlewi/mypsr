import './TimeslotCard.css';
export default function MachineSlot(props){
    return(
        <div className="machine-slot row">
            <h3>{props.name}</h3>
            {props.slots ? props.slots.map((slot) => {
                if(slot[1].length == 0){    
                    return <button
                    className = "createbtn col-6"
                    id={slot[0]}
                    key={slot}
                    onClick={(e) => {props.name == "Laundry" ? 
                    props.getChosenLaundry(e.target.id):
                    props.getChosenDryer(e.target.id)}}
                    >{slot[0]}</button>
                }
                else{
                    return <button className = "disabledbtn col-6" id={slot[0]} disabled key={slot}>{slot[0]}</button>
                }
            }): console.log("NO DATA")
            }
        </div>
    )
}   