import './TimeslotCard.css';
import { useState } from 'react';

export default function MachineSlot(props){
    const [checked, setChecked] = useState(false)
    let machine = props.name + "check"


    return(

        <div className="machine-slot row">
            <div className="machine-choice col-6">
                <h3>{props.name}</h3>
                <button className="btn col-6" id={props.name + "-m1"}>Machine 1</button>
                <button className="btn col-6" id={props.name + "-m2"}>Machine 2</button>
                <button className="btn col-6" id={props.name + "-m3"}>Machine 3</button>
                <button className="btn col-6" id={props.name + "-m4"}>Machine 4</button>
                <label htmlFor={props.name + "-comment-check"}>
                    <input type="checkbox" className = {machine} name="" id={props.name + "-comment-check"} onClick= {() =>
                    {
                        setChecked(document.querySelector("."+ machine).checked)
                    }}/>
                    Open for Sharing
                </label>
            </div>
            <div className="comment-area col-6">
                <h4>Comments</h4>
                <textarea
                className="resize-none rounded-md w-80 h-40"
                name=""
                id={props.name + "-comment"}
                placeholder="Insert your comment here"
                disabled = {!checked}
                ></textarea>
            </div>
        </div>
    )
}   