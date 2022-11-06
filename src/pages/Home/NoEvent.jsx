import { useNavigate } from "react-router-dom";




export default function NoEvent(){
    const navigate = useNavigate()
    return(
        <>
            <img src= 'schedule.png'/>
            <h2>You have not joined any events</h2>
            <button className="createbtn" onClick={() => {
                navigate("/mypsr/events")
            }}>Join an event Now</button>
        </>
    )
}
