import { verify } from "jsonwebtoken"; // Importation de la fonction verify pour décoder les tokens JWT
import { HTTP_UNAUTHORIZED } from "../constants/http_status"; // Importation du code d'état HTTP_UNAUTHORIZED

// Middleware pour vérifier et décoder les tokens JWT inclus dans les en-têtes de requête
export default (req: any, res: any, next: any) => {
    // Extraction du token JWT de l'en-tête 'access_token' de la requête HTTP
    const token = req.headers.access_token as string;

    // Vérification de la présence du token dans l'en-tête de la requête
    if (!token) return res.status(HTTP_UNAUTHORIZED).send();

    try {
        // Tentative de décodage du token JWT
        const decodedUser = verify(token, process.env.JWT_SECRET!);
        
        // Si le décodage réussit ajoute le payload du token à l'objet de requête (req.user)
        req.user = decodedUser;

    } catch (error) {
        // Gestion des erreurs lors du décodage du token JWT
        // Envoie une réponse d'erreur HTTP avec le code d'état HTTP_UNAUTHORIZED (401)
        res.status(HTTP_UNAUTHORIZED).send();
    }

    // Appel à la fonction middleware suivante dans la pile de middleware
    return next();
}
