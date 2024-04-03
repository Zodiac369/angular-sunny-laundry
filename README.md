# Business Case MEAN Stack - Aydogan Emre
## Pré-requis 
1. Création du dossier de l'app : bc_v6
2. Installer @angular/cli
3. Création de l'app coté front : ng new frontend --skip-tests (les fichiers de tests ne seront pas utilisés)
## Header
1. Générer le Component header dans le dossier frontend.
2. `ng g c components/partials/header` (création de dossiers afin de mieux s'y retrouver).
3. Appelé le component header dans le fichier `app.component.html` afin de créer la vue header. 
`<app-header></app-header>`
  I. HTML : 
  ![header-html-part1](/assets/header-html-part1.png)
4. Ajouter du CSS pour le style.
  I. Visuellement : 
  ![header-naviguateur](/assets/header-navigateur.png)
## Models
1. Model Produits
2. Création de data.ts histoire d'avoir des datas pour l'instant avec quoi travailler.
    1. Ajouter les produits
3. Ajouter les images dans le dossier `assets`
4. Création du Service Produits : `ng g s services/product`
    I. Méthode Get afin de récupérer tous les produits => `getAll():Product[] {
    return sample_products;
  }`
    II. Injecter le Service Product dans le contructor du component dont je veux utiliser : `products:Product[] = [];
  constructor(private productService:ProductService) { 
    this.products = productService.getAll();
  }`
5. Création du Component Home `ng g c component/pages/home`, appelé la vue comme précédemment dans le fichier `app.component.html`.
5. Installer un package afin d'avoir les étoiles pour un petit coté visuel `npm i ng-starrating` 
6. Créer un premier visuel dans le component Home en appelant les données du fichier `data.ts` en se basant sur le model `Product.ts` :
![data-product-html](/assets/data-product-html.png)
Visuellement avec du css : 
![product-navigateaur](/assets/product-navigateur.png)
## Barre de recherche et Routing Angular
1. Ajouter cette méthode à Product Service
    I. `  getAllProductsSearchTerm(searchTerm:string) { 
    return this.getAll().filter(
      product => product.name.toLowerCase().
      includes(searchTerm.toLowerCase()))
  }`
    Pour chaque produit cela vérifie le nom du produit contient bien le mot recherché sans se soucier si les lettres sont en majuscules ou minuscules.
2. Ajouter les routes
    I. Dans le fichier app-routing.module.ts nous déclarons les routes de l'application:
   `const routes: Routes = [
        {path: '', component:HomeComponent},
        {path: 'search/:searchTerm', component:HomeComponent}
    ];`
    II. Plus Besoin d'appeler le component Home dans l'app.component.ts : 
    `<app-header></app-header>
    <router-outlet></router-outlet>`
    Les routes seront gérés dans le fichier app-routing.module.ts : 
    ![app-routing-searchterm-home](/assets/app-routing-searchterm-home.png)
    III. `{path: 'recherche/:rechercheTerm', component:HomeComponent}` : Lorsque l'on navigue à "recherche/quelquechose" dans l'URL, cela charge le component Home. 
    Le "quelquechose" est ce que nous cherchons.
    
IV. `activatedRoute.params.subscribe((params) => {...})` : Cela écoute les changements dans les paramètres de l'URL. Chaque fois que l'URL change, cette fonction est déclenchée avec les nouveaux paramètres.
    
    `if(params.rechercheTerm) {...}` : Vérifie si un terme de recherche est présent dans les paramètres de l'URL. Si oui, cela signifie que quelqu'un a entré un terme de recherche.
    
    `this.products = this.productService.getAllProductsSearchTerm(params.rechercheTerm);` : Si le terme de recherche est présent cela appelle une fonction `getAllProductsSearchTerm()` du service `productService` pour obtenir une liste de produits qui correspondent.
    
    Sinon (`else`), cela charge simplement tous les produits en utilisant `productService.getAll()`.

3. Afficher les résultats 
![recherche-pull-url](/assets/recherche-pull-url.png)
4. Création du component Search : `ng g c components/partials/search` 
5. Ajouter le component Search dans le component Home tout en haut : `<app-search></app-search>`
6. Search Component : 
![search-component-ts](/assets/search-component-ts.png)

`activatedRoute` permet d'accéder aux paramètres de l'URL, tandis que `router` est utilisé pour la navigation vers une autre page.
Écoute des changements dans l'URL:

Dans le constructor, le component écoute les changements dans les paramètres de l'URL à l'aide de `activatedRoute.params.subscribe(...)`.
Permettant de mettre à jour le terme de recherche (searchTerm) chaque fois que l'utilisateur modifie le terme de recherche dans l'URL.
Méthode `search(term: string)`:

Cette méthode est déclenchée lorsque l'utilisateur effectue une recherche.
Elle prend le terme de recherche en tant qu'argument.
Si le terme de recherche n'est pas vide, elle utilise le `router` pour naviguer vers une nouvelle URL qui contient le terme de recherche, par exemple /recherche/t-shirt.
7. HTML :
![input-simple-recherche-exemple](/assets/input-simple-recherche-exemple.png)
  I. Résultat avec une faute: 
  ![recherche-chemi-naviguateur](/assets/recherche-chemi-navigateur.png)
  II. Résultat avec du CSS : 
  ![recherche-veste-naviguateur-avec-css](/assets/recherche-veste-navigateur-avec-css.png)
# Tags des Produits
1. Création de Model Tag
  I. Ajouter des données d'exemple pour l'instant dans data.ts
  II. `const sample_tags: Tag[] = [
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
  ]`
2. Ajouter 2 méthodes au Product Service
  I. méthode getAll tags
  II. getAll Products avec la méthode getAll tags


