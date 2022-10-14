import React from 'react';
import './App.css';
import {Routes, Route, useLocation} from 'react-router-dom';
import Login from './pages/login';
import { AnimatePresence } from "framer-motion";
import Landing from './pages/Landing';

function App() {
  const location = useLocation();
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <Routes location={location} key={location.pathname}>
        <Route path='/mypsr'>
          <Route index element={<Landing />}/>
          <Route path='login' element={<Login />}/>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;