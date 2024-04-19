import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';

import productRouter from './routers/product.router';
import userRouter from './routers/user.router';
import { dbConnect } from './configs/database.config';
dbConnect();

// NOTE req : C'est l'objet "request" (requête) qui représente les données envoyées par le client au serveur lorsqu'une requête HTTP est effectuée.
// NOTE res :  C'est l'objet "response" (réponse) qui est utilisé pour renvoyer une réponse HTTP du serveur au client après avoir traité une requête.

const app = express(); // Importation du module Express
app.use(express.json());
app.use(cors({
    credentials: true, // Inclus les infos d'auth dans les requetes CORS
    origin: ["http://localhost:4200"]
})); // Configuration des CORS pour permettre les requêtes provenant de l'origine (4200), autorise l'accès aux ressources du serveur

// NOS API'S
app.use("/api/produits", productRouter)
app.use("/api/users", userRouter)

// Port Serveur
const port = 5000;
app.listen(port, () => {
    console.log("Le serveur est hébergé sur http://localhost:" + port);
})