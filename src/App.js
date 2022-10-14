import React from 'react';
import './App.css';
import House from './components/House';
import NavbarPreLogin from './components/NavbarPreLogin';
import PreLoginContent from './components/PreLoginContent';
import {Routes, Route} from 'react-router-dom';
import Login from './pages/login';

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
      </Routes>
  );
}

export default App;