import React, { useRef, useState, useEffect } from "react"
import { useAuth } from "../../components/contexts/AuthContext"
import { Alert } from "react-bootstrap"
import { Link, useNavigate, useLocation } from "react-router-dom"
import './login.css'
import PageTransition from "../../components/PageTransition"

export default function LoginNew() {
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()

    // animations
    let ani = useLocation().state
    const [animate, setAnimate] = useState(ani)
    const [destination, setDestination] = useState('')
    useEffect(() => {
        if(ani !== animate){
            navigate(destination)
        }
    }, [destination, navigate, ani, animate])


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            setAnimate(true)
            navigate('/mypsr/home', {state:1})
        }
        catch {
            setError('Something went wrong! Please try again!')
        }
        setLoading(false)

    }
    return (
        <>
            <PageTransition animated={animate}/>
            <div id="login">
                {error && <Alert variant ="danger">{error}</Alert>}
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
                        <button id="sign-in" disabled={loading} onClick={handleSubmit}>Login</button>
                        <div id="new_account">
                            Do not have an account?
                            <Link
                            to="/register"
                            onClick={() => {setAnimate(false); setDestination('/mypsr/register')}}
                            >
                                Sign Up
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            

        </>

    )
}