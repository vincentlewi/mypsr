import React from 'react';

export default function PreLoginContent() {
  return (
    <>
      <div id='laundry' className='laundry screen'>
        <h1 className='break'>Laundry</h1>
        <img src={require('../../assets/laundry.png')} alt='test'/>
        <div className='content'>
          <h2>get your shit done in a minute</h2>
        </div>
      </div>
      <div id='events' className='screen'>
        <h1 className='break'>Events</h1>
        <img src={require('../../assets/laundry.png')} alt='test'/>
        <div className='content'>
          <h2>get your shit done in a minute</h2>
        </div>
      </div>
      <div id='chats' className='chats screen'>
        <h1 className='break'>Chats</h1>
        <img src={require('../../assets/laundry.png')} alt='test'/>
        <div className='content'>
          <h2>get your shit done in a minute</h2>
        </div>
      </div>
      <div id='maintenance' className='screen'>
        <h1 className='break'>Maintenance</h1>
        <img src={require('../../assets/laundry.png')} alt='test'/>
        <div className='content'>
          <h2>get your shit done iWn a minute</h2>
        </div>
      </div>
    </>
  );
}