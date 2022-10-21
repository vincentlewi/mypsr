import './register.css'
import { Link } from "react-router-dom";
import PageTransition from "../../components/PageTransition";

export default function Register() {
    return (
        <div className="register">
            <PageTransition animated={false}/>
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
                    <p>Confirm Password:</p>
                    <input type='password' />
                    <Link to='/mypsr/login' state={0}>Register</Link><br/>
                    Already have an account? <Link to='/mypsr/login' state={0}>Login</Link>
                </form>
            </div>
        </div>
    )
}