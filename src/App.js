import React from 'react';
import './App.css';
import House from './components/House';
import NavbarPreLogin from './components/NavbarPreLogin';
import PreLoginContent from './components/PreLoginContent';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/login';
import Calendar from './pages/Calendar'

function App() {
  return (
      <Routes>
        <Route path='/mypsr'>
          <Route index element={
            <div className="App">
              <NavbarPreLogin />
              <House />
              <PreLoginContent />
            </div>
          }/>
          <Route path='login' element={<Login />}/>
          {/* <Route path='/home' element={<Home />}/> */}
        </Route>
        <Route path='/calendar' element={<Calendar />}/>
      </Routes>
  );
}

export default App;