import { model, Schema } from 'mongoose';

// Définition de l'interface Product pour structurer les données
export interface Product {
    id: string;
    name: string;
    price: number;
    favorite: boolean;
    stars: number;
    imageUrl: string;
    categorys: string[];
    description: string;
    state: string[];
    material: string[];
    service: string[];
    tags: string[];
}

// Création du schéma ProductSchema avec les propriétés définies dans l'interface Product
export const ProductSchema = new Schema<Product>(
    {
        name: { type: String, required: true }, 
        price: { type: Number, required: true }, 
        favorite: { type: Boolean, default: false }, 
        stars: { type: Number, required: true }, 
        imageUrl: { type: String, required: true }, 
        categorys: { type: [String], required: true },
        description: { type: String, required: true }, 
        state: { type: [String], required: true },  
        material: { type: [String], required: true },
        service: { type: [String], required: true }, 
        tags: { type: [String] }
    },
    // L'option virtuals: 
    // Le schéma indique à Mongoose d'inclure toutes les propriétés virtuelles définies dans le schéma lors de la sérialisation ou de la conversion.
    {
        toJSON: {
            virtuals: true // Inclure les propriétés virtuelles lors de la sérialisation en JSON
        },
        toObject: {
            virtuals: true // Inclure les propriétés virtuelles lors de la conversion en objet
        },
        timestamps: true // Ajouter automatiquement les horodatages createdAt et updatedAt
    }
);

// Création du modèle ProductModel basé sur le schéma ProductSchema
export const ProductModel = model<Product>('product', ProductSchema);
