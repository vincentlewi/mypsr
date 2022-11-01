import './register.css'
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react';
import { useRef } from 'react';
import { useAuth } from "../../components/contexts/AuthContext"
import { Alert } from "react-bootstrap"
import { motion } from "framer-motion"

export default function Register() {
    const data = useRef({fullname: '', email: '', password: '', confirm: ''})
    
    const isValid = useRef({email: false, password: false, confirm: false})
    const [fullnameWarning, setFullnameWarning] = useState('')
    const [emailWarning, setEmailWarning] = useState('')
    const [passwordWarning, setPasswordWarning] = useState('')
    const [ConfirmWarning, setConfirmWarning] = useState('')

    const [x, setX] = useState(-50)
    useEffect(() => {
        if([fullnameWarning, emailWarning, passwordWarning, ConfirmWarning].every((v) => v === '')) {
            setX(-50)
        }
    }, [fullnameWarning, emailWarning, passwordWarning, ConfirmWarning])
    
    function checkFullname() {
        if (data.current.fullname.length === 0) {
            setFullnameWarning('Please enter your name')
            isValid.current.fullname = false
        } else {
            setFullnameWarning('')
            isValid.current.fullname = true
        }
    }
    function checkEmail() {
        const year = new Date().getFullYear
        if (
            data.current.email.slice(-11) !== '.smu.edu.sg' || 
            parseInt(data.current.email.split('@')[0].slice(-4)) <= year ||
            !['scis', 'business', 'economics', 'accountancy', 'socsc', 'law'].includes(data.current.email.split('@')[1].split('.')[0])
        ) {
            setEmailWarning('Please use valid SMU email')
            isValid.current.email = false
        } else {
            setEmailWarning('')
            isValid.current.email = true
        }
    }

    function checkPassword() {
        if (data.current.password.length < 8) {
            setPasswordWarning('Password needs to be at least 8 characters')
            isValid.current.password = false
        } else {
            setPasswordWarning('')
            isValid.current.password = true
        }
        checkConfirm()
    }

    function checkConfirm() {
        if ((data.current.confirm !== data.current.password) && (data.current.password.length >= 8)) {
            setConfirmWarning('Password does not match')
            isValid.current.confirm = false
        } else {
            setConfirmWarning('')
            isValid.current.confirm = true
        }
    }

    function validateForm() {
        if (!Object.values(isValid.current).every((v) => v)) {
            setX(-x)
        } 
    }
    
    const navigate = useNavigate()
    const [error, setError] = useState()
    const { signup } = useAuth()
    const [loading, setLoading] = useState(false)
    async function handleSubmit(e) {
        e.preventDefault()
        
        setError("")
        setLoading(true)
        
        setError(await signup(
            data.current.email, 
            data.current.password, 
            data.current.fullname,
            `0${Math.ceil(Math.random()*4)}-${String(Math.ceil(Math.random()*12)).padStart(2, 0)}${'abcde'[Math.floor(Math.random()*5)]}` // address. format: level.unit + room (a to e)
        ))
        setLoading(false)
    }
    useEffect(() => {
        if (error === '') {
            navigate('/mypsr/home')
        }
    }, [error, navigate])

    return (
        <div className="register">
            {error && <Alert variant ="danger">{error}</Alert>}
            <div className='leftText'>
                <h1>Hello!</h1>
                <h2>Welcome to myPSR, your one-stop booking website!</h2>
            </div>
            <div className='form'>
                <img src={require('../../assets/logowhite.png')} alt='logowhite'/>
                <form>
                    <p>Full Name:</p>
                    <input type='text'
                    onChange={(e) => {data.current.fullname = e.target.value; checkFullname()}}
                    placeholder={fullnameWarning}/>
                    {/* <p style ={{color: "red"}}>{fullnameWarning}</p> */}

                    <p>SMU Email:</p>
                    <input type='email'
                    onChange={(e) => {data.current.email = e.target.value; checkEmail()}}
                    placeholder={emailWarning}/>
                    {/* <p>{emailWarning}</p> */}
                    
                    <p>Password:</p>
                    <input type='password'
                    onChange={(e) => {data.current.password = e.target.value; checkPassword()}}
                    placeholder={passwordWarning}/>
                    {/* <p>{passwordWarning}</p> */}
                    
                    <p>Confirm Password:</p>
                    <input type='password'
                    onChange={(e) => {data.current.confirm = e.target.value; checkConfirm()}}
                    placeholder={ConfirmWarning}/>
                    {/* <p>{ConfirmWarning}</p> */}
                    
                    <Link to='/mypsr/login' state={0}>Register</Link><br/>
                    <motion.div
                        className='submit'
                        animate={{ x }}
                        onMouseEnter={() => {checkFullname(); checkEmail(); checkPassword(); checkConfirm(); validateForm()}}>
                            <button 
                                disabled={(!Object.values(isValid.current).every((v) => v)) || (loading)}
                                onClick={(e) => handleSubmit(e)}
                            >
                                Submit
                            </button>
                    </motion.div>
                    <br/>
                    Already have an account? <Link to='/mypsr/login' state={0}>Login</Link>
                </form>
            </div>
        </div>
    )
}