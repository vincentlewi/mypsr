import Button from 'react-bootstrap/Button';

export default function WelcomeButton(){
    let name = "Vitto Surya TEDJA";
    let subtitle = "Let's keep you updated with everything PSR related";
    let today = new Date();


    function getTiming(){
        let time = "";
        if(today.getHours() < 12){
            time = "Good Morning"
        }
        else if (today.getHours() > 12 && today.getHours() < 17){
            time = "Good Afternoon"
        }
        else if (today.getHours() >= 17){
            time = "Good Evening"
        }
        else{
            time = "~This is your lunch time~"
        }
        return time;
    }


    return (
        <div className="frontpage my-3">
            <div className="welcome-img">
                <img src={require("../../assets/logoblack.png")} alt="" />
            </div>
            <div className="welcome_msg">
                <h3><span className = "username"><b>{getTiming()}, {name}</b></span></h3>
                <h3 className = "subtitle py-2">{subtitle}</h3>
                <div className="profile-btn">
                    <Button variant="danger">
                        Go To My Profile
                    </Button>
                </div>
            </div>  
        </div>
    );
}

