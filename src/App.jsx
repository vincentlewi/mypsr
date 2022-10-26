import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import Landing from './pages/Landing/index';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import Home from './pages/Home/index';
import './App.css';
import './components/Components.css'

function App() {
  const location = useLocation();
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path='/mypsr'>
          <Route index element={<Landing/>}/>
          <Route path='login' element={<Login />}/>
          <Route path='register' element={<Register />}/>
          <Route path='home' element={<Home />}/>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;