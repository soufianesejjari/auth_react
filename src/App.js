import logo from './logo.svg';
import { useState } from 'react';

import './App.css';
// ... (importations)
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Dashboard from './components/Dashboard';
import Login from './components/Login';
import Logout from './components/LogOut';
import Home from './components/Home';
import Navbar from './components/Navbar';
import TestLogin from './components/TestLogin';
import AuthCheck from './components/useToken';
import Preferences from './components/Preferences';
import Securite from './components/Securite';


const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [user, setUser] = useState(null);
  return (
    <Router>
      <div>
        <Navbar />
        <div className="container mt-4">
          <Routes>
          <Route path="/" element={<Home />} />
            <Route
          path="/protected"
          element={<AuthCheck setToken={setToken}setUser={setUser}>
            <Preferences/>
            </AuthCheck>}
        />
             <Route
          path="/dashboard"
          element={<AuthCheck setToken={setToken} setUser={setUser}>
            <Dashboard user={user}/>
            </AuthCheck>}
        />
            <Route path="/login" element={<Login setToken={setToken}/>} />
            <Route path="/logout" element={<Logout  setToken={setToken} />} />
            <Route path="/securite" element={<Securite />} />

          </Routes>
        </div>
      </div>
    </Router>
  );
};

export default App;