import express from 'express';
import cors from 'cors';
import { sample_products, sample_tags, sample_users } from './data';
import jwt from "jsonwebtoken";

// NOTE req : C'est l'objet "request" (requête) qui représente les données envoyées par le client au serveur lorsqu'une requête HTTP est effectuée.
// NOTE res :  C'est l'objet "response" (réponse) qui est utilisé pour renvoyer une réponse HTTP du serveur au client après avoir traité une requête.

const app = express(); // Importation du module Express
app.use(express.json());
app.use(cors({
    credentials: true, // Inclus les infos d'auth dans les requetes CORS
    origin: ["http://localhost:4200"]
})); // Configuration des CORS pour permettre les requêtes provenant de l'origine (4200), autorise l'accès aux ressources du serveur

// Route API de tous les produits
app.get("/api/produits", (req, res) => {
    res.send(sample_products);
})

// Route API pour la recherche des produits
app.get("/api/produits/recherche/:searchTerm", (req, res) => {
    // Extrait le terme de recherche 
    const searchTerm = req.params.searchTerm;

    // Filte des produits en fonction du terme de recherche, écrire 'chemi' me renverra le résulat du produit Chemise
    const products = sample_products
        .filter(product => product.name.toLowerCase()
        .includes(searchTerm.toLowerCase()));

    // Envoi des produits filtrés en réponse
    res.send(products);
})

// Route API de tous les tags
app.get("/api/produits/tags", (req, res) =>{
    res.send(sample_tags);
})

// Route des produits spécifique à leur tags associés 
app.get("/api/produits/tag/:tagName", (req, res) => {
    const tagName = req.params.tagName;
    const products = sample_products
        .filter(product => product.tags?.includes(tagName));
        res.send(products);
})

// Route du single produit référé à son ID
app.get("/api/produit/:produitId", (req, res) =>{
    const productId = req.params.produitId;
    const product = sample_products.find(product => product.id == productId)
    res.send(product); // ENvois au client
})

//  Le Server reçoit les données du formulaire de connexion dans req.body (email&password)
app.post("/api/users/login", (req, res) => {
    const {email, password} = req.body;
    const user = sample_users.find(user => user.email === email && user.password === password)  // Le serveur recherche un utilisateur correspondant au donées des samples
    
    // Si trouvé = le serveur renvoie une réponse avec le token d'auth à l'aide de la fonction genereateTokenResponse
    if (user){
        res.send(generateTokenResponse(user))
    }else{ // Si aucun trouvé = le serveur renvoie une erreur 400 avec le message ci-dessous 
        res.status(400).send("Identifiant ou Mot de passe non valide !");
    }
})

// cette fonction prend un objet user en entrée (JWT)
const generateTokenResponse = (user: any)=>{
    const token = jwt.sign({
        // le token contient son role 
        email: user.email, isAdmin: user.isAdmin
        // il est signé avec la clé secrète et expire au bout de 30j
    }, "TexteAléatoire", {
        expiresIn: "30d"
    });

    // Une fois le token généré il est ajouté a l'objet user et est retourné 
    user.token = token;
    return user;
}

// Port Serveur
const port = 5000;
app.listen(port, () => {
    console.log("Le site est hébergé sur http://localhost:" + port);
})