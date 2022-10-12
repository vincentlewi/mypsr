import React from 'react';
import { useEffect, useState } from 'react';
import './House.css';

export default function House() {
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
    require(`../prelogin/house/${index.toString().padStart(4, 0)}.png`)
  )
  
  // Preload images
  for (let i = 1; i < frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }

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
    <header id='home' className="App-header">
        <div className='main'>
            <img className='logo' src={require('../logoblack.png')} alt='logo' />
            <img className='house' src={image} alt='house'/> 
        </div>
    </header>
  );
}