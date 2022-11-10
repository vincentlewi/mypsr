import Lottie from "react-lottie"
import animationData from "./84048-404-page-not-found.json"

export default function Error404() {
    const defaultOptions = {
        loop: true,
        autoplay: true,
        animationData: animationData,
        rendererSettings: {
          preserveAspectRatio: "xMidYMid slice"
        }
      };

    const divStyle = {
        height: "100vh",
        width: "100vw", 
        backgroundColor: "#e5f9ff"
    }

    return (
        <>  
        <div style={divStyle}>
            <Lottie options={defaultOptions} style={{width: "100vh"}} />
        </div>
            
        </>

    )
}
