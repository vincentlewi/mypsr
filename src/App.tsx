import React from 'react';
import './App.css';
import House from './components/House';
import NavbarPreLogin from './components/NavbarPreLogin';
import PreLoginContent from './components/PreLoginContent';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Login from './pages/login';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={
          <div className="App">
            <NavbarPreLogin />
            <House />
            <PreLoginContent />
          </div>
        }/>
        <Route path='/login' element={<Login />}/>
        {/* <Route path='/home' element={<Home />}/> */}
      </Routes>
    </BrowserRouter>
  );
}

export default App;