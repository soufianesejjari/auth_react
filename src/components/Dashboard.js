// Dashboard.js
import React from 'react';
import { Navigate } from 'react-router-dom';

const Dashboard = ({user}) => {


  return (
    <div>
      <h2>Dashboard d'utilisateur  {user}</h2>
      {/* Contenu du dashboard */}
    </div>
  );
};

export default Dashboard;
