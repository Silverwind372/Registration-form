import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Signup from './Signup';
import Login from './Login';
import Profile from './Profile';
import Default from './Default'

function App() {
    return (
      <div className='flex flex-col justify-center h-screen items-center bg-gradient-to-b from-slate-600 to-gray-500'>
        <Router>
            <Routes>
                <Route path="/" element={<Default />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/login" element={<Login />} />
                <Route path="/profile" element={<Profile />} />
            </Routes>
        </Router>
      </div>

    );
}

export default App;
