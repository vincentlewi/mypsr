import './login.css'
import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition";
import { useLocation } from 'react-router-dom';
// import { useState } from 'react';
import { useRef } from 'react';

export default function Login(props) {
    // const [animate, setAnimate] = useState(useLocation().state)
    const animate = useRef(useLocation().state)

    return (
        <div className="login">
            <PageTransition animated={animate.current}/>
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
                    {/* <Link to='/mypsr' onClick={() => setAnimate(true)} >back</Link><br/>
                    <Link to='/mypsr/home' onClick={() => setAnimate(true)}>Login</Link><br/>
                    Need an account? <Link to='/mypsr/register' onClick={() => setAnimate(false)}>Register</Link> */}
                    <Link to='/mypsr' onClick={() => animate.current = true}>back</Link><br/>
                    <Link to='/mypsr/home' onClick={() => animate.current = true}>Login</Link><br/>
                    Need an account? <Link to='/mypsr/register' onClick={() => animate.current = false}>Register</Link>
                </form>
            </div>
        </div>
    )
}