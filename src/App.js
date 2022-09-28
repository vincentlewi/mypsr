import { useEffect, useState } from 'react';
import './App.css';
import NavbarPreLogin from './components/NavbarPreLogin';

function App() {
  // Change with time
  // const [count, setCount] = useState(1)

  // useEffect(() => {
  //   if(count < 120) {
  //     setTimeout(() => {
  //       setCount(count + 1)
  //     }, 12)
  //   } else {
  //     setCount(1)
  //   } 
  // }, [count])

  // function importAll(r) {
  //   let images = {};
  //   r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
  //   return images;
  // }
  
  // const images = importAll(require.context('./house', false, /\.(png|jpe?g|svg)$/));

  var images = new Array()
  for (let i = 1; i <= 82; i++) {
    images[i] = require(`./prelogin/house/${i.toString().padStart(4, 0)}.png`)
  }

  const [scrolled, setScrolled] = useState(1)

  useEffect(() => {
    window.addEventListener('scroll', scrollProgress)
    return () => window.removeEventListener('scroll', scrollProgress)
  })

  const scrollProgress = () => {
    const scrollPx = document.documentElement.scrollTop
    const winHeightPx = document.getElementsByClassName('App-header')[0].scrollHeight - document.documentElement.clientHeight

    const scrollLen = Math.min(82, Math.ceil(scrollPx / winHeightPx * 100) + 1)
    setScrolled(scrollLen)
  }

  document.title = 'myPSR'
  return (
    <div className="App">
      <NavbarPreLogin />
      <header id='home' className="App-header">
        <div className='main'>
          {/* <div class='login'>
            <h1>myPSR</h1>
            <h3>home away from home</h3>
          </div> */}
          <img className='logo' src={require('./logoblack.png')}  />
          <img className='house' src={images[scrolled]} /> 
        </div>
      </header>
      <div id='laundry' className='laundry screen'>
        <h1 className='break'>Laundry</h1>
        <img src={require('./prelogin/laundry.png')} />
        <div className='content'>
          <h2>get your shit done in a minute</h2>
        </div>
      </div>
      <div id='events' className='screen'>
        <h1 className='break'>Events</h1>
        <img src={require('./prelogin/laundry.png')} />
        <div className='content'>
          <h2>get your shit done in a minute</h2>
        </div>
      </div>
      <div id='chats' className='chats screen'>
        <h1 className='break'>Chats</h1>
        <img src={require('./prelogin/laundry.png')} />
        <div className='content'>
          <h2>get your shit done in a minute</h2>
        </div>
      </div>
    </div>
  );
}

export default App;