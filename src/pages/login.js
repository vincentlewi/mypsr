import './login.css'

export default function Login() {
    return (
        <div className="login">
            <div className='leftText'>
                <h1>Hello!</h1>
                <h2>Welcome to myPSR, your one-stop booking website!</h2>
            </div>
            <div className='form'>
                <img src={require('../logowhite.png')} alt='logowhite'/>
                <form>
                    <p>Username:</p>
                    <input type='text' />
                    <p>Password:</p>
                    <input type='password' />
                    <a href='/mypsr'>Login</a>
                </form>
            </div>
        </div>
    )
}