/* // server.js
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// IMPORTANT
const cors = require('cors');


const app = express();
// Enable CORS for all routes
app.use(cors());

const PORT = process.env.PORT || 5000;

// Connexion à MongoDB
mongoose.connect('mongodb://localhost/db', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', console.error.bind(console, 'Erreur de connexion à MongoDB :'));
db.once('open', () => {
  console.log('Connecté à MongoDB');
});

// Schéma de modèle pour la collection auth_react
const userSchema = new mongoose.Schema({
  user: String,
  password: String,
});

// Modèle pour la collection auth_react
const User = mongoose.model('User', userSchema);

app.use(express.json());

// Route pour l'authentification
app.post('/login', async (req, res) => {
  const { user, password } = req.body;
  try {
    // Vérifie si l'utilisateur existe dans la base de données
    const existingUser = await User.findOne({ user });

    if (!existingUser) {
      return res.status(200).json({ success: false, message: 'Utilisateur non trouvé.' });
    }
    // Vérifie si le mot de passe est correct
    const passwordMatch = await bcrypt.compare(password, existingUser.password);
    // Génère un token JWT
    const token = jwt.sign({ user: existingUser.user }, 'votre_clé_secrète', { expiresIn: '60s' });

    res.json({ success: true, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, message: 'Erreur lors de l\'authentification.' });
  }
});
// ...

// Middleware pour valider le token
app.post('/verif', async (req, res) => {
 
  // Récupère le token depuis les en-têtes de la requête
  const {token} =  req.body;


  if (!token) {
    return res.status(200).json({ success: true, message: 'Token manquant. Authentification requise.' });
  }
  

  try {
    // Vérifie la validité du token
    const decoded = jwt.verify(token, 'votre_clé_secrète');
      // Vérifie si le token a expiré
      if (Date.now() >= decoded.exp * 1000) {
        return res.status(401).json({ success: false, message: 'Token expiré. Authentification requise.' });
      }
    // Ajoute les informations du token à la requête pour une utilisation ultérieure si nécessaire
    user = decoded.user;

    // Si le token est valide, renvoyer une réponse réussie
 // Le token est valide, renvoie une réponse réussie
 return res.status(200).json({ success: true, message: 'Token valide.', user: user ,exp:decoded.exp});
  }
   catch (error) {
    console.error(error);
    return res.status(401).json({ success: false, message: token});
  }
});




app.listen(PORT, () => {
  console.log(`Serveur en cours d'exécution sur le port ${PORT}`);
});
 */



// server.js
const express = require('express');
const cors = require('cors'); // Pour gérer les problèmes de CORS

const app = express();
const port = 3001; // Vous pouvez changer le port si nécessaire

app.use(cors()); // Activez CORS pour permettre à votre application React d'accéder à l'API

// --------------------------------------- Project List
const projectList = ProjectList = [
    {
      img: "https://github.com/soufianesejjari/covInfo/blob/master/covInfo.png?raw=true",
      title: "COVID-19 Awareness and Statistics Android App",
      description:
        "An Android app that helps people understand COVID-19 in Morocco by providing real-time statistics and information about vaccines, as well as a machine learning model that predicts the risk of infection.",
      tech_stack: "Kotlin, Android API, Python, Scala, machine learning algorithms",
      github_url: "https://github.com/soufianesejjari/covInfo",
      demo_url: "https://github.com/soufianesejjari/covInfo/tree/master/demo",
    },
  
    {
      img: "https://github.com/soufianesejjari/datawarehouse_projet/blob/main/ImageResult/image1.png?raw=true",
      title: "Data Visualization with Power BI and MySQL",
      description: "A project that showcases my ability to extract, transform and load data from an OLTP database to an OLAP database, and to create visually appealing and informative dashboards with Power BI.",
      tech_stack: "Power BI, MySQL, ETL process",
      github_url: "https://github.com/soufianesejjari/datawarehouse_projet",
      demo_url: "https://github.com/soufianesejjari/datawarehouse_projet#readme",
    },
    {
      img: "https://github.com/soufianesejjari/stageCommuneProjet/blob/main/images_pdf/web1.png?raw=true",
      title: "Data Visualization and Analysis Project",
      description:
        "This project involves the use of various tools and technologies to visualize and analyze data for a specific business or research question.",
      tech_stack: " Python, SPSS, Talend, Streamlit, API",
      github_url: "https://github.com/soufianesejjari/stageCommuneProjet",
      demo_url: "https://github.com/soufianesejjari/stageCommuneProjet/blob/main/images_pdf/soufiane%20sejjari%20rapport%20(1).pdf",
    },
        {
      img: "https://github.com/soufianesejjari/Data-scraping-and-Analysis-LinkedIn-Profiles-Students/blob/main/image.png?raw=true",
      title: "Data Analysis on LinkedIn Profiles of ENSIAS Students",
      description:
        "n this project, I conducted data analysis on LinkedIn profiles of ENSIAS students, I uncovered trends in skills and experiences to enhance education and career opportunities for students.",
      tech_stack: "web scraping, JSON, Python, MongoDB",
      github_url: "https://github.com/soufianesejjari/Data-scraping-and-Analysis-LinkedIn-Profiles-Students",
      demo_url: "https://github.com/soufianesejjari/Data-scraping-and-Analysis-LinkedIn-Profiles-Students",
    },
      {
      img: "https://user-images.githubusercontent.com/81421925/212548688-93895b90-62a6-41d4-b677-6fc75b918100.png",
      title: "Interactive Sales Dashboard: A JavaFX/Scala POS System",
      description:
        "A robust Point of Sale system that allows users to efficiently manage sales data and analyze it in an interactive dashboard using JavaFX, Scala and MySQL.",
      tech_stack: " JavaFX, Scala, MySQL,sbt, launch4j",
      github_url: "https://github.com/soufianesejjari/ScalaProjet",
      demo_url: "https://www.canva.com/design/DAFXGbwDHdY/zosmLGJResbQaeBfbwv8gA/view?mode=prototype",
    },
        {
      img: "https://github-production-user-asset-6210df.s3.amazonaws.com/81421925/260799596-9f49b8ff-1ccb-4863-a3ee-d7a6f50a4170.png",
      title: "Dynamic Performance Analytics API: Leveraging MySQL and FastAPI",
      description:
        "Develop a powerful API for dynamic performance analysis, utilizing MySQL and FastAPI. Access, filter, and visualize user performance data with caching for optimized performance.",
      tech_stack: " Python, FastApi , MySQL, Json",
      github_url: "https://github.com/soufianesejjari/Dynamic-Performance-Analytics-API-Leveraging-MySQL-and-FastAPI/",
      demo_url: "https://soufianesejjari.hashnode.dev/api-de-visites-pour-lanalyse-des-performances-des-utilisateurs",
    },
  ];

// --------------------------------------- Skills
const stackList =  [
    {
      img: "https://github.com/soufianesejjari/portfolio-react/blob/master/src/data/visua.jpg?raw=true",
      name: "Data Visualization",
    },
    {
      img: "https://github.com/soufianesejjari/portfolio-react/blob/master/src/data/etl.png?raw=true",
      name: "Data Cleaning",
    },
    {
      img: "https://github.com/soufianesejjari/portfolio-react/blob/master/src/data/python.png?raw=true",
      name: "Python",
    },
    {
      img: "https://github.com/soufianesejjari/portfolio-react/blob/master/src/data/r.png?raw=true",
      name: "R",
    },
    {
      img: "https://github.com/soufianesejjari/portfolio-react/blob/master/src/data/sql.png?raw=true",
      name: "SQL & NoSql",
    },
    {
      img: "https://github.com/soufianesejjari/portfolio-react/blob/master/src/data/st.jpg?raw=true",
      name: "Advanced Statistics",
    },
    {
      img: "https://github.com/soufianesejjari/portfolio-react/blob/master/src/data/ml.png?raw=true",
      name: "Machine Learning",
    },
    {
      img: "https://github.com/soufianesejjari/portfolio-react/blob/master/src/data/power.png?raw=true",
      name: "PowerBi",
    },
  ];
  

// Route pour obtenir la liste des projets
app.get('/projects', (req, res) => {
  res.json(projectList);
});

// Route pour obtenir la liste des compétences
app.get('/skills', (req, res) => {
  res.json(stackList);
});

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});

/* 
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose'); // Ajout de mongoose

const app = express();
const port = 3001;

app.use(cors());

// Connexion à la base de données MongoDB
mongoose.connect('mongodb://localhost:27017/local', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// Définition du schéma pour les projets
const projectSchema = new mongoose.Schema({
  img: String,
  title: String,
  description: String,
  tech_stack: String,
  github_url: String,
  demo_url: String,
});

// Définition du modèle pour les projets
const Project = mongoose.model('Project', projectSchema);

// Définition du schéma pour les compétences
const skillSchema = new mongoose.Schema({
  img: String,
  name: String,
});

// Définition du modèle pour les compétences
const Skill = mongoose.model('Skill', skillSchema);

// Route pour obtenir la liste des projets depuis MongoDB
app.get('/projects/:nom', async (req, res) => {
  const nom = req.params.nom;

  try {
    const projects = await Project.find({ username: nom });
    console.log(projects);
    // Transformez le format des projets pour correspondre à votre structure JSON
    const formattedProjects = projects.map(project => ({
      img: project.img,
      title: project.title,
      description: project.description,
      tech_stack: project.tech_stack,
      github_url: project.github_url,
      demo_url: project.demo_url
    }));

    res.json(formattedProjects);
  } catch (error) {
    console.error("Erreur lors de la récupération des projets depuis MongoDB :", error);
    res.status(500).send("Erreur serveur");
  }
});


// Route pour obtenir la liste des compétences depuis MongoDB
app.get('/skills/:nom', async (req, res) => {
  const nom = req.params.nom;

  try {
    const skills = await Skill.find({ username: nom });
    res.json(skills);
  } catch (error) {
    console.error("Erreur lors de la récupération des compétences depuis MongoDB :", error);
    res.status(500).send("Erreur serveur");
  }
});

app.listen(port, () => {
  console.log(`Le serveur est en écoute sur le port ${port}`);
});
 */