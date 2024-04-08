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
  * méthode getAllTags : 
  ` getAllTags(): Tag[]{
    return sample_tags;
  }`
  Elle utilise une variable appelée sample_tags qui contient tous les tags
  
  * méthode getAllProductsByTag :
  ` getAllProductsByTag(tag: string): Product[]{
    return tag == "All"?
    this.getAll():
    this.getAll().filter(
      product => product.tags?.
      includes(tag));
 }` 
  Si le tag est "All" alors tous les produits doivent être retournés donc la fonction renvoie simplement tous les produits en utilisant `this.getAll()`
  Sinon la fonction filtre les produits en fonction du `tag` spécifié
  Elle parcourt tous les produits et vérifie si le `tag` spécifié est inclus dans les `tags` du produit
  Si c'est le cas, le produit est ajouté à un tableau qui sera retournS
  
3.  Ajouter la Route Tags
  I. `{path: 'tag/:tag', component: HomeComponent}` (Similaire à la route Recherche)
4. Afficher les résultats dans le component Home
  I. Si un paramètre appelé tag est présent dans l'URL cela signifie qu'un tag spécifique a été sélectionné. Dans ce cas il utilise la méthode `getAllProductsByTag()` du service `productService` pour obtenir les produits correspondants.
  II. Test dans l'URL : 
  ![tag-url-navigateur](/assets/tag-url-navigateur.png)
5. Générer le component Tags
  `ng g c components/partials/tags`
  I. l'ajouter au Home component
  <app-tags></app-tags>
  II. TS-HTML-CSS :
  TS: `tags?:Tag[];`
  `constructor(productService: ProductService) {
    this.tags = productService.getAllTags();
   }`
  Récupèrons tous les tags à partir du service `productService` en appelant la méthode `getAllTags()`.
  Afin de les stocké dans la variable tags du composant, les tags seront disponibles pour être utilisés dans le template HTML.
  HTML: ![tag-comp-html](/assets/tag-comp-html.png)
  Visuellement : ![tag-html-navigateur](/assets/tag-html-navigateur.png)
  CSS + Tag Formel :
  Résulat de Chemise :
  ![tag-avec-css-navigateur-formel](/assets/tag-avec-css-navigateur-formel.png)

  # Page du Produit
  1. Ajouter la méthode `getProductById` au fichier product.service.ts :
   `getProductById(productId: string){
    return this.getAll().find(product => product.id == productId) ?? new Product();
  }`
    I. La métode `getAll` récupère tous les produits, la méthode `find()` recherche le produit dont l'id correspond à l'identifiant passé en argument `productId`, si le produit est trouvé il est renvoyé, si rien n'est trouvé elle renverra `undefined` une valeur par défaut `new Product()` est renvoyé. Cela me garantit que la méthode renvoie toujours quelque chose même si aucun produit n'est trouvé. 
  2. Générer le component Page Produit
    I. `ng g c components/pages/product-page` (respecter l'arborescance du projet afin de s'y retrouver au mieux)
  3. Ajouter la route
    I. `{ path: 'product/:id', component: ProductPageComponent }` dans le fichier `app-routing.module.ts`
    II. Lorsque l'on clique sur un produit : 
    ![product-compo-working-navigateur](/assets/product-compo-working-navigateur.png)
  4. TS-HTML-CSS 
    TS : 
    ` product!: Product;`
    La variable product est déclarée avec le type Product. Le ! garantie que cette variable sera initialisée avant qu'elle soit utilisée

    Le constructeur prend deux arguments : 
    `constructor(activatedRoute: ActivatedRoute, productService: ProductService)`
    Il écoute les changements dans les paramètres de l'URL à l'aide de:
    `activatedRoute.params.subscribe(...)`.

    `{
      activatedRoute.params.subscribe((params) =>{
        if (params.id)
        this.product = productService.getProductById(params.id);
      })
    }`

  Lorsqu'un nouvel id de produit est fourni dans les paramètres de l'URL, la méthode `getProductById()` du service `productService` est appelée pour récupérer les détails du produit.

  Le produit récupéré est alors assigné à la variable product.

  II. HTML-CSS Résultat : 
  ![product-page-navigateur](/assets/product-page-navigateur.png)

# Page Panier 
1. Création d'un model de Structure Panier 
  I. `import { Product } from "./Product";
      export class CartItem{
          constructor(public product: Product){ }
          quantity: number = 1;
          price: number = this.product.price;
      }`
2. Création d'un model de Panier 
  I.`import { CartItem } from "./CartItem";
    export class Cart{
        items: CartItem[] = [];
        totalPrice: number = 0;
        totalCount: number = 0;
    }`
3. Générer un service Panier 
  I. `ng g s services/cart`
4. Permettre d'ajouter/supprimer/modifier/changer la quantité d'un ou plusieurs Produit(s) dans son panier :

  I. `addToCart(product: Product): void:` Ajoute un produit au panier. Vérifie si le produit est déjà dans le panier. Si c'est le cas il fait rien. Sinon il ajoute un nouvel élément au panier avec ce produit.

  II. `removeFromCart(productId: string): void` Supprime un produit du panier en filtrant les éléments du panier pour ne garder que ceux dont l'ID du produit ne correspond pas à celui fourni.

  III. `changeQuantity(productId: string, quantity: number):`: Modifie la quantité d'un produit dans le panier en cherchant l'élément correspondant dans le panier et en mettant à jour sa quantité et son prix en conséquence

  IV. `clearCart()`: Vide à zéro le panier en le réinitialisant à un nouveau panier vide

  V. `getCartObservable(): Observable<Cart>`: Renvoie un Observable qui émet des mises à jour du panier. Les composants peuvent s'abonner à cet Observable pour être informés des changements dans le panier

  VI. `setCartToLocalStorage(): void:` Met à jour le panier dans le localStorage du navigateur. Calcul le prix total et le nombre total d'articles dans le paniers puis sauvegarde le panier dans le localStroage et notifie les abonnés à l'Observable

  VII. `getCartFromLocalStorage(): Cart:` Récupère le panier à partir du stockage local du navigateur. S'il n'existe pas, il crée un nouveau panier vide

5. Générer un component page Panier 
  I. Ajouter la route
    `{ path: 'panier', component: CartComponent },`
  II. TS-HTML-CSS

  TS. 
  Properties :
  `cart!: Cart;`
  Stock les données du panier actuel.
  `Constructor:` :
  Injection du service de panier `CartService`

Abonnement à l'Observable du panier: Lorsque le composant est initialisé il s'abonne à l'Observable du panier à l'aide de la méthode `getCartObservable()` du service `CartService`. À chaque mise à jour du panier il met à jour la propriété cart du composant

`removeFromCart(cartItem: CartItem):` Cette méthode est appelée lorsqu'un utilisateur souhaite supprimer un élément du panier,elle utilise le service `CartService` pour supprimer l'élément du panier en fonction de l'ID du produit

`changeQuantity(cartItem: CartItem, quantityInString: string):` Cette méthode est appelée lorsqu'un utilisateur souhaite modifier la quantité d'un élément dans le panier, elle prend la nouvelle quantité (fournie sous forme de chaîne de caractères) et la convertit en nombre entier. Ensuite, elle utilise le service `CartService` pour mettre à jour la quantité de l'élément dans le panier en fonction de l'ID du produit associé à cet élément

HTML & CSS, Résultat :
 ![navigateur-panier](/assets/navigateur-panier.png)

Plus qu'a rendre dynamique l'affichage des éléments présents dans le panier situé dans le header :
dans le fichier `header.component.ts` :
Propriété :
`cartQuantity`: Stock le nombre total d'articles dans le panier.
Au début elle est initialisée à 0

Constructor :
Injection du cartService
Abonnement à l'Observable du panier, lorsque le composant est initialisé il s'abonne à l'Observable du panier avec la méthode `getCartObservable()` du service `CartService`
À chaque mise à jour du panier la fonction de rappel est déclenchée avec le nouveau panier

Mise à jour de `cartQuantity` A chaque fois qu'une mise à jour du panier est reçue le nombre total d'articles dans le panier (newCart.totalCount) est assigné à la propriété cartQuantity. Cela met à jour dynamiquement le nombre d'articles affiché dans le header 

HTML : `<li>
            <a routerLink="/panier">
              Panier <span *ngIf="cartQuantity">{{ cartQuantity }}</span>
            </a>
          </li>`
![header-panier-navigateur](/assets/header-panier-navigateur.png)
# NOT FOUND Barre de Recherche & Panier
1. Générer le component dans le dossier partials
  I.  `ng g c components/partials/not-found`
  II. dans le fichier TS : 
  Initialisation de 4 décorateurs `@Input()` sont utilisés pour définir des propriétés d'entrée, ces valeurs peuvent être passées au composant depuis son parent. 
  Les propriétés `visible`, `notFoundMessage`, `resetLinkText`, `resetLinkRoute` sont toutes des propriétés d'entrée qui peuvent être définies à partir du composant parent lors de l'utilisation du composant `NotFoundComponent` dans le template.

  Les propriétés d'entrée permettent de personnaliser l'apparence et le comportement du component selon les besoins, dans mon cas un message et un lien.

2. l'Ajouter aux pages nécessaires...
  I. HTML du component`notFound` :
  `<div *ngIf="visible">
    {{ notFoundMessage }}
    <a [routerLink]="resetLinkRoute">{{ resetLinkText }}</a></div>`
    Celà affiche ou masque l'élément en fonction de la valeur de la propriété visible du component, si visible est évalué à true donc le contenu à l'intérieur de la balise `<div>` sera affiché sinon il sera masqué

  II. Panier HTML :
  `[visible]="!cart || !cart.items.length"` : Cette propriété d'entrée visible détermine si le component `"NotFoundComponent"` est visible ou non.
   Elle est définie en fonction de la condition si panier est vide.
    Si le panier est vide `(!cart || !cart.items.length évalué à true)` le component `"NotFoundComponent"` sera visible.
  `notFoundMessage`="Votre panier est vide." : le message à afficher.
  `resetLinkText="Retour à l'accueil"` : C'est le lien permettant à l'utilisateur de revenir à la page d'accueil


  Résultat avec du CSS :![not-found-navigateur-panier](/assets/not-found-navigateur-panier.png)

  Page Produits :
  Meme principe que le panier, redirige vers la liste des produits.
  Résultat de la recherche ne donnant rien 'azerty' : ![test-azerty-recherche-notfound-navigateur](/assets/test-azerty-recherche-notfound-navigateur.png)

  Page Single Produit :![single-produit-not-found-navigateur](/assets/single-produit-not-found-navigateur.png)

  # BACK-END
  ## Ce Projet est MEAN STACK, Utilisation de MongoDB, Express, (Angular) et NodeJS
  1. Connexion au Back
    I. Création du dossier backend à la racine du Projet, à coté du dossier frontend.
    II. Se situé dans le dossier backend : `npm init -y` dans le terminal, puis `npm install typescrit`
    III. Création du fichier de config dans le dossier back : `tsconfig.json`.
    IV. Création du fichier .gitignore afin de ne pas push certains fichiers, surtout le dossier node_modules.
    V. Copier le fichier data.ts au backend/src (nos samples data du début), suppression des imports, remplacer les tableau `Product`, `Tag`, `Service` en `any`.
    VI. Installation de express cors : `npm install express cors`
    VII. dans le fichier package.json, les dépendances ont été correctement installés (cors et express à l'instant) : 
    ![dependance-express-ts-cors-packagejson](/assets/dependance-express-ts-cors-packagejson.png)
    VIII. Création de server.ts
    IX. `npm install ts-node --save-dev`, `npm install nodemon --save-dev`
    X. En dessous de script nous ajouté notre config `start` :  
     `"scripts": {
    "start": "cd src && nodemon server.ts",
    "test": "echo \"Error: no test specified\" && exit 1"
  }` plus qu'a lancé le serveur avec ``npm start`` ! :sparkle: ![serveur-run-npm-start](/assets/serveur-run-npm-start.png)
  Résultat sur l'URL : `http://localhost:5000/api/products` :

  ![serveur-run-bonjour](/assets/serveur-run-bonjour_b2rnvgepj.png)
  Tout fonctionne ! 
  A la place de ce bonjour je vais plutot inmplémenter mes produits.
  `app.get("/api/products", (req, res) => {
    res.send(sample_products);
  })`
  Plus qu'à recharger la page :
  ![api-products-navigateur-json](/assets/api-products-navigateur-json.png) 
  Nos Produits sont bien là au format JSON 😀 (malgrè qu'on ne voit que le T-Shirt sur la screenshot) 
  
  Plus qu'à continuer le travail (se référer au fichier `product.service.ts`.)
  Une fois Toutes les routes API des `Produits` envoyés au client, passons à la seconde partie de la connexion au backend.

  Toutes les données présentes seront appelé via l'api et non plus au fichier `data.ts` du dossier `frontend`
  XI. Ajout du fichier `urls.ts` au frontend dans un dossier `constants`
    - Déclarations de nos routes API dans ce fichier.
  XII. Ajout du HttpClient Module
    - Dans le fichier `app.module.ts` import de `HttpClientModule`
  XIII. Modification de foodService











    


