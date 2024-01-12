// Login.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = ({ setToken }) => {
  const navigate = useNavigate();

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const isFormValid = () => {
    return username.trim() !== '' && password.trim() !== '';
  };
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!isFormValid()) {
      alert('Veuillez remplir tous les champs.');
      return;
    }

    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: username, password }),
      });

      if (!response.ok) {
        alert(' Échec de la requête.  ');
      }

      const data = await response.json();

      if (data.success) {
        localStorage.setItem('token', data.token);
        setToken(data.token || null);
        navigate('/protected');

      } else {
        // Affichez un message d'erreur approprié
        alert('Échec de l\'authentification : '+ data.message);
      }
    } catch (error) {
      alert('Erreur lors de la communication avec le serveur', error);
      console.log(error.message+"  "+error);
      // Affichez un message d'erreur approprié
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card">
            <div className="card-header">
              <h3 className="card-title">Login</h3>
            </div>
            <div className="card-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="username" className="form-label">Username</label>
                  <input
                    type="text"
                    className="form-control"
                    id="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={handleLogin}
                >
                  Login
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
