import { Router } from "express";
import jwt from "jsonwebtoken";
import { sample_users } from "../data";
import asyncHandler from 'express-async-handler';
import { User, UserModel } from "../models/user.model";
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import bcrypt from 'bcryptjs';


const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const usersCount = await UserModel.countDocuments();
        if (usersCount > 0){
            res.send("L'initialisation est déjà effectuée")
            return;
        }

        await UserModel.create(sample_users);
        res.send("L'initialisation est effectuée")
    }
))

// Route Api de tous les users
router.get("/",asyncHandler(
    async (req, res) => {
        const users = await UserModel.find();
        res.send(users);
    }
))

// Le Server reçoit les données du formulaire de connexion dans req.body (email&password)
router.post("/login", asyncHandler(
    async (req, res) => {
        const {email, password} = req.body;
        // Le serveur recherche un utilisateur correspondant au donées des samples
        const user = sample_users.find(user => user.email === email && user.password === password);  
        // const user = await UserModel.findOne({email, password});
        
        // Si trouvé = le serveur renvoie une réponse avec le token d'auth à l'aide de la fonction genereateTokenResponse
        if (user){
            res.send(generateTokenResponse(user))
        }else{
            res.status(HTTP_BAD_REQUEST).send("Identifiant ou Mot de passe non valide !");
        }
    }
))

router.post('/register', asyncHandler(
    async (req, res) => {
        // Extraction des champs du corps de la requête
        const {name, email, password, address} = req.body;

        // Recherche un utilisateur avec l'email fourni dans la base de données
        const user = await UserModel.findOne({email});

        // Vérification si un utilisateur avec cet email existe déjà
        if (user){
            // Si un utilisateur avec cet email existe déjà renvoie ce message
            res.status(HTTP_BAD_REQUEST)
            .send("Un utilisateur du meme email existe déjà.");
            return;
        }
        
        // Hashage du mot de passe 
        const encryptedPassword = await bcrypt.hash(password, 10);

        // Création d'un nouvel utilisateur avec les informations fournies
        const newUser: User = {
            id: '',
            name,
            email: email.toLowerCase(),
            password: encryptedPassword,
            address,
            isAdmin: false
        }

        // Enregistrement du nouvel utilisateur dans la base de données
        const dbUser = await UserModel.create(newUser);

        // Envoi de la réponse avec le token d'authentification généré pour le nouvel utilisateur
        res.send(generateTokenResponse(dbUser));
    }
))


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

export default router;