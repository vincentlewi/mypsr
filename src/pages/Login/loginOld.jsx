import './login.css'
import PageTransition from "../../components/PageTransition"
import { useLocation, useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'
import { useAuth } from "../../components/contexts/AuthContext"
import { Alert } from "react-bootstrap"

export default function Login() {
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

    // user auth
    const emailRef = useRef()
    const passwordRef = useRef()
    const { login } = useAuth()
    const [error, setError] = useState()
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError("")
            setLoading(true)
            await login(emailRef.current.value, passwordRef.current.value)
            setAnimate(true)
            navigate('/home', {state:1})
        }
        catch {
            setError('GABISA LOGIN JANCOK')
        }
        setLoading(false)

    }

    return (
        <div className="login">
            <PageTransition animated={animate}/>
            {error && <Alert variant ="danger">{error}</Alert>}
            <div className='back' onClick={() => {setAnimate(true); setDestination('/')}}>back</div>
            <div className='leftText'>
                <h1>Hello!</h1>
                <h2>Welcome to myPSR, your one-stop booking website!</h2>
            </div>
            <div className='form'>
                <img src={require('../../assets/logowhite.png')} alt='logowhite'/>
                <form>
                    <p>Email:</p>
                    <input type='email' ref={emailRef}/>
                    <p>Password:</p>
                    <input type='password' ref={passwordRef}/>
                    <div disabled={loading} onClick={handleSubmit}>Login</div>
                    Need an account? 
                    <div onClick={() => {setAnimate(false); setDestination('/register')}}>Register</div>
                </form>
            </div>
        </div>
    )
}


