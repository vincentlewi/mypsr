import './register.css'
import { Link } from "react-router-dom";

export default function Login(props) {
    return (
        <div className="register">
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
                    {/* <Link to='/mypsr' state={{loc: loc}} onClick={() => setToLoc('/mypsr')}>back</Link><br/> back button */}
                    <Link to='/mypsr/login' state={false}>Register</Link><br/>
                    Already have an account? <Link to='/mypsr/login' state={false}>Login</Link>
                </form>
            </div>
        </div>
    )
}