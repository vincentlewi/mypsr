import './TimeslotCard.css';

export default function MachineSlot(props){

    const handleClick=(id, checked) => {
        if(checked){
          props.setSlotList([])
        } else {
          props.setSlotList(id)
        }
      }

    return(
        <div className="machine-slot">
            <h3>{props.name} at {props.timeslot}</h3>
            {props.slots ? props.slots.map((slot) => {
                // console.log(slotList)
                const checked = props.slotList.includes(slot[0])
                // console.log(slot[0])
                if(slot[1].length === 0){    
                    return (
                        <div className="timeslot-buttons" key={slot}>
                        <button
                        className = {`laundrybtn ${checked ? 'active' : 'inactive'}`}
                        id={slot[0]}
                        key={slot}
                        onClick={(e) => 
                        {   
                            if(props.currentMachine !== e.target.id){
                                props.name === "Laundry" ? props.getChosenLaundry(e.target.id):props.getChosenDryer(e.target.id)
                            }
                            else{
                                props.name === "Laundry" ? props.getChosenLaundry(''):props.getChosenDryer('')
                            }
                            handleClick(slot[0], checked)
                        }
                    }
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