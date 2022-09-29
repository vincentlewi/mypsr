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

  const html = document.documentElement

  const frameCount = 82;
  const currentFrame = index => (
    require(`./prelogin/house/${index.toString().padStart(4, 0)}.png`)
  )
  
  const preloadImages = () => {
    for (let i = 1; i < frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
    }
  };
  preloadImages()

  const img = new Image()
  const [image, setImage] = useState(img.src = currentFrame(1))

  useEffect(() => {
    window.addEventListener('scroll', scrollProgress)
    return () => window.removeEventListener('scroll', scrollProgress)
  })

  const scrollProgress = () => {
    const scrollPx = html.scrollTop
    const winHeightPx = document.getElementsByClassName('App-header')[0].scrollHeight - html.clientHeight
    const scrollLen = Math.min(82, Math.ceil(scrollPx / winHeightPx * 100) + 1)
    
    requestAnimationFrame(() => setImage(img.src = currentFrame(scrollLen)))
  }
  
  return (
    <div className="App">
      <NavbarPreLogin />
      <header id='home' className="App-header">
        <div className='main'>
          <img className='logo' src={require('./logoblack.png')}  />
          <img className='house' src={image} /> 
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
      <div id='maintenance' className='screen'>
        <h1 className='break'>Maintenance</h1>
        <img src={require('./prelogin/laundry.png')} />
        <div className='content'>
          <h2>get your shit done in a minute</h2>
        </div>
      </div>
    </div>
  );
}

export default App;