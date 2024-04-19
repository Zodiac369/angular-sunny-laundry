import { Router } from "express";
import { sample_products, sample_tags } from "../data";
import asyncHandler from 'express-async-handler';
import { ProductModel } from "../models/product.model";

const router = Router();

router.get("/seed", asyncHandler(
    async (req, res) => {
        const productsCount = await ProductModel.countDocuments();
        if (productsCount > 0){
            res.send("L'initialisation est déjà effectuée")
            return;
        }
        await ProductModel.create(sample_products);
        res.send("L'initialisation est effectuée")
    }
))

// Route API de tous les produits
router.get("/", asyncHandler(
    async (req, res) => {
        const products = await ProductModel.find();
        res.send(products);
    }
))

// Route API pour la recherche des produits
router.get("/recherche/:searchTerm",asyncHandler(
    async (req, res) => {
        const searchRegex = new RegExp(req.params.searchTerm, 'i')
        const products = await ProductModel.find({name: { $regex:searchRegex }})
        res.send(products);
    }
))

// Route API de tous les tags
router.get("/tags", asyncHandler(
    async (req, res) => {
        const tags = await ProductModel.aggregate([
            {
                $unwind: '$tags'
            },
            {
                $group:{
                    _id: '$tags',
                    count: {$sum: 1}
                }
            },
            {
                $project:{
                    _id: 0,
                    name: '$_id',
                    count: '$count'
                }
            }
        ]).sort({count: -1});

        const all = {
            name: 'Tous',
            count: await ProductModel.countDocuments()
        }
        
        tags.unshift(all);
        res.send(tags);
    }
    // $unwind, groupe les tags 
))

// Route des produits spécifique à leur tags associés 
router.get("/tag/:tagName", asyncHandler(
    async (req, res) => {
        const products = await ProductModel.find({ tags: req.params.tagName })
        res.send(products);
}
))

// Route du single produit référé à son ID
router.get("/:produitId", asyncHandler(
    async (req, res) =>{
        const product = await ProductModel.findById(req.params.produitId);
        res.send(product); // ENvois au client
    }
))

export default router;