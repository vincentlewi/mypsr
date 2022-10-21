import './login.css'
import PageTransition from "../../components/PageTransition";
import { useLocation, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';

export default function Login() {
    let ani = useLocation().state
    const [animate, setAnimate] = useState(ani)
    const navigate = useNavigate()
    const [destination, setDestination] = useState('')
    useEffect(() => {
        if(ani !== animate){
            navigate(destination)
        }
    }, [destination, navigate, ani, animate])

    return (
        <div className="login">
            <PageTransition animated={animate}/>
            <div className='back' onClick={() => {setAnimate(true); setDestination('/mypsr')}}>back</div>
            <div className='leftText'>
                <h1>Hello!</h1>
                <h2>Welcome to myPSR, your one-stop booking website!</h2>
            </div>
            <div className='form'>
                <img src={require('../../assets/logowhite.png')} alt='logowhite'/>
                <form>
                    <p>Username:</p>
                    <input type='text' />
                    <p>Password:</p>
                    <input type='password' />
                    <div onClick={() => {setAnimate(true); setDestination('/mypsr/home')}}>Login</div>
                    Need an account? 
                    <div onClick={() => {setAnimate(false); setDestination('/mypsr/register')}}>Register</div>
                </form>
            </div>
        </div>
    )
}