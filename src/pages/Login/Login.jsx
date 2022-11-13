import React, { useRef, useState, useEffect } from "react"
import { useAuth } from "../../components/contexts/AuthContext"
import { Alert, Col, Row, Container } from "react-bootstrap"
import { Link, useNavigate, useLocation } from "react-router-dom"
import './login.css'
import PageTransition from "../../components/PageTransition"

export default function LoginNew() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login, user } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // reroute to home if user exists
    useEffect(() => {
        if (user) {
            navigate("/mypsr/home", {state:1})
        }
    }, [])

    // animations
    let ani = useLocation().state
    const [animate, setAnimate] = useState(ani)
    const [destination, setDestination] = useState('')
    useEffect(() => {
        if(ani !== animate){
            destination === '/mypsr/home' ? navigate(destination, {state: 1}) : navigate(destination)
        }
    }, [destination, navigate, ani, animate])

    // handle form submit
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            console.log("before logging innn")
            await login(emailRef.current.value, passwordRef.current.value)
            setAnimate(true)
            setDestination('/mypsr/home')
        }
        catch {
            setError('Something went wrong! Please try again!')
        }
        setLoading(false)
    }

    return (
        <>
            <PageTransition animated={animate}/>
            <div className='back' onClick={() => {setAnimate(true); setDestination('/mypsr')}}>
                <img src={require("../../assets/arrow.png")} width="30px" alt="back"/><span>Back</span>
            </div>
            {error && <Alert variant ="danger" className="error mb-0">{error}</Alert>}
            <div className="login">
                <div className="boxx">
                    <div className="roww-login">
                        <div className="column-login">
                            <div className="cardd greeting">
                                <div>
                                    <h1>Hello!</h1>
                                    <p>Welcome to myPSR,</p>
                                    <p>your one-stop booking system.</p>
                                </div>
                            </div>
                        </div>
                        <div className="column-login">
                            <div className="cardd">
                                <div className="centerr">
                                    <h1>Login</h1>
                                    <form>
                                        <div className="inputbox">
                                            <input ref={emailRef} type="text" required/>
                                            <span>Email</span>
                                        </div>
                                        <div className="inputbox">
                                            <input ref={passwordRef} type="password" required/>
                                            <span>Password</span>
                                        </div>
                                        <div className="inputbtn">
                                            <button id="sign-in" className = "createbtn" disabled={loading} onClick={handleSubmit}>Login</button>
                                        </div>
                                        <div class="signup">
                                            <p>Do not have an account?
                                                <Link
                                                to="/register"
                                                onClick={() => {setAnimate(false); setDestination('/mypsr/register')}}
                                                className='link'>
                                                    Sign Up
                                                </Link>
                                            </p>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        {/* </div> */}
            {/* <div id="login">
                
                
                <div id="opening"> 
                    <div className="content">
                        <h1>Hello!</h1>
                        <br/>
                        <p id="welcome">Welcome to myPSR, your one-stop booking website!</p>
                    </div>
                </div>
                <div id="form">
                    <div className="content">
                        <h2><b>Log In</b></h2>
                                <label htmlFor='username' className="col-md-4 col-sm-12">Email:</label>
                                <input type="email" id="username" ref={emailRef} className="col-md-8 col-sm-12"/>
                                <label htmlFor="pwd" className="col-md-4 col-sm-12">Password:</label>
                                <input type="password" id="pwd" ref={passwordRef} className="col-md-8 col-sm-12"/>
                        <button id="sign-in" className = "createbtn" disabled={loading} onClick={handleSubmit}>Login</button>
                        <div id="new_account">
                            <span>Do not have an account? </span>
                            <Link
                            to="/register"
                            onClick={() => {setAnimate(false); setDestination('/mypsr/register')}}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div> */}
            

        </>

    )
}