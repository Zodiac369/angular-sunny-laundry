import { Product } from "./app/shared/models/Product";

export const sample_products: Product[] = [
    {
        id:'1',
        name: 'T-Shirt',
        price: 5,
        favorite: true,
        stars: 4.5,
        imageUrl: 'assets/tshirt.jpeg',
        categorys: ['Haut'],
        description: 'T-Shirt manche courte desc',
        state: ['Neuf', 'Bon état', 'Abîmé'],
        material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim']
      },
      {
        id:'2',
        name: 'Chemise',
        price: 15,
        favorite: false,
        stars: 3.5,
        imageUrl: 'assets/chemise.jpeg',
        categorys: ['Haut'],
        description: 'Chemise desc',
        state: ['Neuf', 'Bon état', 'Abîmé'],
        material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim']
      },
      {
        id:'3',
        name: 'Pull',
        price: 20,
        favorite: true,
        stars: 4.5,
        imageUrl: 'assets/pull.jpeg',
        categorys: ['Haut'],
        description: 'Pull desc',
        state: ['Neuf', 'Bon état', 'Abîmé'],
        material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim']
      },
      {
        id:'4',
        name: 'Veste',
        price: 30,
        favorite: false,
        stars: 4.5,
        imageUrl: 'assets/veste-cuir.jpeg',
        categorys: ['Haut'],
        description: 'Veste desc',
        state: ['Neuf', 'Bon état', 'Abîmé'],
        material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim']
      },
      {
        id:'5',
        name: 'Manteau',
        price: 45,
        favorite: false,
        stars: 4.5,
        imageUrl: 'assets/manteau.jpeg',
        categorys: ['Haut'],
        description: 'Manteau desc',
        state: ['Neuf', 'Bon état', 'Abîmé'],
        material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim']
      },
      {
        id:'6',
        name: 'Sneaker',
        price: 40,
        favorite: true,
        stars: 4.5,
        imageUrl: 'assets/basket-daim.jpeg',
        categorys: ['Chaussures'],
        description: 'Sneakers desc',
        state: ['Neuf', 'Bon état', 'Abîmé'],
        material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim']
      },
]