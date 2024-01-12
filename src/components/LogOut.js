import React from 'react';
import { Navigate } from 'react-router-dom';


const Logout = ({ setToken }) => {

  
    localStorage.removeItem('token')

    setToken(null);
    return <Navigate replace to="/" />

 
};

export default Logout;
