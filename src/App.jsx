import React from 'react';
import {Routes, Route, useLocation} from 'react-router-dom';
import { AnimatePresence } from "framer-motion";
import Landing from './pages/Landing/Landing';
import Login from './pages/Login/Login';
import Register from './pages/Register/Register';
import Home from './pages/Home/Home';
import Laundry from './pages/Laundry/Laundry';
import Events from './pages/Events/Events';
import Services from './pages/Services/Services';
import Profile from './pages/Profile/Profile';
import Error404 from './pages/Error404';
import PrivateRoutes from "./components/PrivateRoutes"
import Chats from './pages/Chats/Chats'
import './App.css';
import './components/Components.css'
import './components/buttons.css'
import Maintenance from './pages/Services/Maintenance';
import GuestRegistration from './pages/Services/GuestRegistration';

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
            {/* <Route path='services' element={<Services />}/> */}
            <Route path='profile' element={<Profile/>}/>
            <Route path='chats' element={<Chats/>}/>
            <Route path='maintenance' element={<Maintenance/>}/>
            <Route path='guestregistration' element={<GuestRegistration/>}/>
          </Route>
        </Route>
        <Route path='*' element={<Error404/>}/>
      </Routes>
    </AnimatePresence>
  );
}

export default App;