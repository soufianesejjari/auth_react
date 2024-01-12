// TestLogin.js
import React, { useState } from 'react';

const TestLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [response, setResponse] = useState('');

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ user: username, password }),
      });

      const data = await response.json();
      setResponse(JSON.stringify(data, null, 2));
    } catch (error) {
      console.error('Erreur lors de la requête:', error);
      setResponse('Erreur lors de la requête.');
    }
  };

  return (
    <div>
      <h2>Test de Connexion</h2>
      <div>
        <label>Username:</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
      </div>
      <div>
        <label>Password:</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>
      <button onClick={handleLogin}>Login</button>
      <div>
        <h3>Réponse du Serveur:</h3>
        <pre>{response}</pre>
      </div>
    </div>
  );
};

export default TestLogin;
