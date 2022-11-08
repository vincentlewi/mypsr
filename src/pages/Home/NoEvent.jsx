import { useNavigate } from "react-router-dom";




export default function NoEvent(){
    console.log("==RENDER in NoEvent.jsx==")
    const navigate = useNavigate()
    return(
        <div className="noevent">
            <img src= {require('./schedule.png')} alt="No schedule" style = {{width: 200}}/>
            <h2>You have not joined any events</h2>
            <button className="createbtn" onClick={() => {
                navigate("/mypsr/events")
            }}>Join an event Now</button>
        </div>
    )
}
