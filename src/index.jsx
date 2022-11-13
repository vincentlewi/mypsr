import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter as Router} from 'react-router-dom';
import { AuthProvider } from './components/contexts/AuthContext';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(

    <AuthProvider>
      <Router basename="/mypsr">
        <App />
      </Router>
    </AuthProvider>
)
// to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
