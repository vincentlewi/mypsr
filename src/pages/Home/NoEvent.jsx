import { useNavigate } from "react-router-dom";
import Lottie from "react-lottie";
import animationData from "./104954-calendar.json"




export default function NoEvent(){
    console.log("==RENDER in NoEvent.jsx==")
    const navigate = useNavigate()

    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    return(
        <div className="noevent">
            <Lottie options={defaultOptions} height={400} width={400}/>
            <h2>You have not joined any events</h2>
            <button className="createbtn" onClick={() => {
                navigate("/mypsr/events")
            }}>Join an event Now</button>
        </div>
    )
}
