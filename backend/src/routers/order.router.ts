import { Router } from "express";
import asyncHandler from 'express-async-handler';
import { HTTP_BAD_REQUEST } from "../constants/http_status";
import { OrderModel } from "../models/order.model";
import { OrderStatus } from "../constants/order_status";
import auth from '../middlewares/auth.mid';

const router = Router();

// Utilisation du middleware d'authentification pour vérifier et décoder les tokens JWT
router.use(auth);

// Route POST pour la création d'une nouvelle commande
router.post('/create',
    asyncHandler(async (req: any, res: any) => {
        // Extraction des données de la commande à partir du corps de la requête
        const requestOrder = req.body;

        // Vérification si le panier est vide
        if (requestOrder.items.length <= 0) {
            res.status(HTTP_BAD_REQUEST).send('Le Panier est Vide');
            return;
        }

        // Suppression de toute commande en cours de traitement pour l'utilisateur actuel
        await OrderModel.deleteOne({
            user: req.user.id,
            status: OrderStatus.PROCESSING
        });

        // Création d'une nouvelle commande avec les données fournies et l'ID de l'utilisateur actuel
        const newOrder = new OrderModel({ ...requestOrder, user: req.user.id });
        await newOrder.save();

        // Envoi de la réponse avec les détails de la nouvelle commande créée
        res.send(newOrder);
    })
);

router.get('/newOrderForCurrentUser', asyncHandler( async (req: any, res)=>{
    const order = await OrderModel.findOne({user: req.user.id, status: OrderStatus.PROCESSING});
    if(order) res.send(order);
    else res.status(HTTP_BAD_REQUEST).send();
}))

export default router;
