import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import Landing from './pages/Landing/index';
import Login from './pages/Login/index';
import Register from './pages/Register/index';
import Home from './pages/Home/index';
import Laundry from './pages/Laundry/Laundry';
import Events from './pages/Events/Events';
import Services from './pages/Services/Services';
import PrivateRoutes from "./components/PrivateRoutes"
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
          <Route element={<PrivateRoutes />}>
            <Route path='home' element={<Home />}/>
            <Route path='laundry' element={<Laundry />}/>
            <Route path='events' element={<Events />}/>
            <Route path='services' element={<Services />}/>
          </Route>
        </Route>
      </Routes>
    </AnimatePresence>
  );
}

export default App;