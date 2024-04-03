import { Product } from "./app/shared/models/Product";
import { Tag } from "./app/shared/models/Tag";

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
    material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim'],
    tags: ['Décontracté', 'Sportif', 'Été', 'Printemps']
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
    material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim'],
    tags: ['Formel', 'Élégant']
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
    material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim'],
    tags: ['Décontracté', 'Hiver', 'Printemps']
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
    material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim'],
    tags: ['Élégant', 'Décontracté', 'Printemps']
  },
  {
    id:'5',
    name: 'Jupe',
    price: 20,
    favorite: false,
    stars: 4,
    imageUrl: 'assets/jupe.jpg',
    categorys: ['Bas'],
    description: 'Jupe desc',
    state: ['Neuf', 'Bon état', 'Abîmé'],
    material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim'],
    tags: ['Printemps', 'Automne', 'Élégant', 'Moderne', 'Décontracté']
  },
  {
    id:'6',
    name: 'Manteau',
    price: 45,
    favorite: false,
    stars: 4.5,
    imageUrl: 'assets/manteau.jpeg',
    categorys: ['Haut'],
    description: 'Manteau desc',
    state: ['Neuf', 'Bon état', 'Abîmé'],
    material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim'],
    tags: ['Hiver', 'Moderne', 'Printemps']
  },
  {
    id:'7',
    name: 'Jean',
    price: 30,
    favorite: false,
    stars: 4,
    imageUrl: 'assets/jean.jpg',
    categorys: ['Bas'],
    description: 'Jean desc',
    state: ['Neuf', 'Bon état', 'Abîmé'],
    material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim'],
    tags: ['Printemps', 'Automne', 'Élégant', 'Moderne', 'Décontracté', 'Hiver']
  },
  {
    id:'8',
    name: 'Robe',
    price: 50,
    favorite: true,
    stars: 5,
    imageUrl: 'assets/robe.jpg',
    categorys: ['Haut'],
    description: 'Robe desc',
    state: ['Neuf', 'Bon état', 'Abîmé'],
    material: ['Cuir', 'Daim', 'Velours', 'Cotton', 'Soie', 'Laine', 'Satin', 'Denim'],
    tags: ['Été', 'Élégant', 'Moderne']
  },
]

const sample_tags: Tag[] = [
  { name: 'All', count: 8 },
  { name: 'Été', count: 2 },
  { name: 'Automne', count: 2 },
  { name: 'Hiver', count: 3 },
  { name: 'Printemps', count: 6 },
  { name: 'Décontracté', count: 5 },
  { name: 'Sportif', count: 1 },
  { name: 'Formel', count: 1 },
  { name: 'Élégant', count: 5 },
  { name: 'Moderne', count: 4 },
]