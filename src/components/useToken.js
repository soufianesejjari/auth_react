// AuthCheck.js 
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const AuthCheck = ({ setToken ,setUser ,children }) => {
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // Récupère le token depuis localStorage
        const token = localStorage.getItem('token');

        if (!token) {
          // Aucun token trouvé, redirige l'utilisateur vers la page d'authentification
          navigate('/login');
          return;
        }

        // Envoie une requête au serveur pour vérifier la validité du token
        const response = await fetch('http://localhost:5000/verif', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          }, 
          body: JSON.stringify({ token :token }),
        });
  

        const data = await response.json();

        if (!data.success) {
          // Le token est invalide, déconnecte l'utilisateur et redirige vers la page d'authentification
          console.log(data)
          localStorage.removeItem('token');
         setToken(null);
          navigate('/login');
          return;
        }

        // Le token est valide, l'utilisateur est authentifié
        setLoading(false)
        setUser(data.user);
      } catch (error) {
       
        alert("pas bien error  fait errrr"+error)

        // En cas d'erreur, redirige l'utilisateur vers la page d'authentification
        navigate('/login');
      }
    };

    verifyToken();
  }, [setToken, navigate,setUser]);

  // Affiche un message de chargement pendant la vérification
 
  return loading ? <p>Vérification en cours...</p> : children;
};

export default AuthCheck;
