import { useEffect, useState } from 'react';
import './App.css';

function App() {
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

  const [scrolled, setScrolled] = useState(1)

  useEffect(() => {
    window.addEventListener('scroll', scrollProgress)

    return () => window.removeEventListener('scroll', scrollProgress)
  })

  const scrollProgress = () => {
    const scrollPx = document.documentElement.scrollTop
    const winHeightPx = document.documentElement.scrollHeight - document.documentElement.clientHeight

    const scrollLen = Math.ceil(scrollPx / winHeightPx * 100) + 1

    setScrolled(scrollLen)
  }

  return (
    <div className="App">
      <header className="App-header">
        <div class='main'>
          <div class='login'>
            <h1>myPSR</h1>
            <h3>home away from home</h3>
          </div>
          <img src={require(`./house_compressed/${scrolled.toString().padStart(4, 0)}.jpg`)} />
        </div>
      </header>
      <div class='content'>
        test
      </div>
    </div>
  );
}

export default App;