import { findByPlaceholderText } from '@testing-library/react';
import { useEffect, useState } from 'react';
import './App.css';

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

  function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }
  
  const images = importAll(require.context('./house_transparent', false, /\.(png|jpe?g|svg)$/));

  const [scrolled, setScrolled] = useState(1)

  useEffect(() => {
    window.addEventListener('scroll', scrollProgress)
    return () => window.removeEventListener('scroll', scrollProgress)
  })

  const scrollProgress = () => {
    const scrollPx = document.documentElement.scrollTop
    const winHeightPx = document.getElementsByClassName('App-header')[0].scrollHeight - document.documentElement.clientHeight

    const scrollLen = Math.min(90, Math.ceil(scrollPx / winHeightPx * 100) + 1)
    console.log(window.pageYOffset)
    setScrolled(scrollLen)
  }

  document.title = 'myPSR'
  return (
    <div className="App">
      <header className="App-header">
        <div className='main'>
          {/* <div class='login'>
            <h1>myPSR</h1>
            <h3>home away from home</h3>
          </div> */}
          <img className='logo' src={require('./logoblack.png')}  />
          <img className='house' src={images[`${scrolled.toString().padStart(4, 0)}.png`]} style={{width: Math.max(document.documentElement.clientHeight, document.documentElement.clientWidth)}} /> 
        </div>
      </header>
      {/* <div className='testdiv'>
        <img src={require("./house_transparent/0001.png")} className='testimg'/>
      </div> */}
      <div className='content'>
        test
        <h1>Laundry</h1>
      </div>
      <h1>Events</h1>
    </div>
  );
}

export default App;