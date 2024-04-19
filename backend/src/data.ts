export const sample_products: any[] = [
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
    service: ['Repassage', 'Blanchiement', 'Nettoyage à sec', 'Traitement anti-taches', 'Réparation de vêtements'],
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
    service: ['Repassage', 'Nettoyage à sec', 'Traitement anti-taches', 'Réparation de vêtements'],
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
    service: [],
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
    service: [],
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
    service: [],
    tags: ['Printemps', 'Automne', 'Élégant', 'Moderne', 'Décontracté', 'Été']
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
    service: ['Nettoyage à sec', 'Repassage', 'Réparation de vêtements', 'Traitement anti-taches' ],
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
    service: ['Repassage', 'Nettoyage à sec', 'Traitement anti-taches', 'Réparation de vêtements'],
    tags: ['Printemps', 'Automne', 'Moderne', 'Décontracté']
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
    service: [],
    tags: ['Été', 'Élégant', 'Moderne']
  },
]

export const sample_tags: any[] = [
  { name: 'Tous', count: 8 },
  { name: 'Été', count: 3 },
  { name: 'Automne', count: 2 },
  { name: 'Hiver', count: 2 },
  { name: 'Printemps', count: 6 },
  { name: 'Décontracté', count: 5 },
  { name: 'Sportif', count: 1 },
  { name: 'Formel', count: 1 },
  { name: 'Élégant', count: 4 },
  { name: 'Moderne', count: 4 },
]

export const sample_services: any[] = [
  { name: 'Nettoyage à sec', price: 10 },
  { name: 'Repassage', price: 15 },
  { name: 'Nettoyage de tissus délicats', price: 20 },
  { name: 'Nettoyage de vêtements en cuir et en daim', price: 25 },
  { name: 'Nettoyage de tapis et de rideaux', price: 30 },
  { name: 'Réparation de vêtements', price: 35 },
  { name: 'Traitement anti-taches', price: 15 },
  { name: 'Imperméabilisation de vêtements', price: 50 },
  { name: 'Blanchiment de vêtements', price: 10 },
  { name: 'Nettoyage de chaussures et de sacs à main en cuir', price: 20 },
]

export const sample_users: any[] = [
  {
    name: 'Patrick Bateman',
    email: 'patrick@gmail.com',
    password: 'mdp369',
    address: 'New York',
    isAdmin: true,
  },
  {
    name: 'Beatrix Kiddo',
    email: 'beatrix@gmail.com',
    password: 'mdp369',
    address: 'Los Angeles',
    isAdmin: false,
  },
  {
    name: 'Emre',
    email: 'emre@gmail.com',
    password: 'mdp369',
    adress: 'Lyon',
    isAdmin: true
  }
];