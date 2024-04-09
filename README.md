# Business Case MEAN Stack - Aydogan Emre

## Pré-requis 
1. Création du dossier de l'app : `bc_v6`
2. Installer `@angular/cli`
3. Création de l'app côté front : `ng new frontend --skip-tests` (les fichiers de tests ne seront pas utilisés)

## Header
1. Générer le Component header dans le dossier `frontend`.
   - `ng g c components/partials/header` (création de dossiers afin de mieux s'y retrouver).
2. Appeler le component header dans le fichier `app.component.html` afin de créer la vue header.
   ```html
   <app-header></app-header>
   ```
   - **HTML :**
     ![header-html-part1](/assets/header-html-part1.png)
3. Ajouter du CSS pour le style.
   - **Visuellement :**
     ![header-navigateur](/assets/header-navigateur.png)

## Models
1. Model Produits
   - Création de `data.ts` pour avoir des données de travail.
     - Ajouter les produits.
2. Ajout des images dans le dossier `assets`.
3. Création du Service Produits : `ng g s services/product`.
   - **Méthode Get :**
     ```typescript
     getAll(): Product[] {
       return sample_products;
     }
     ```
   - Injecter le Service Product dans le constructeur du component : 
     ```typescript
     products: Product[] = [];
     constructor(private productService: ProductService) { 
       this.products = productService.getAll();
     }
     ```
4. Création du Component Home : `ng g c component/pages/home`, puis appel de la vue dans `app.component.html`.
5. Installation de `ng-starrating` pour les étoiles.
6. Création d'un premier visuel dans le component Home en utilisant les données du fichier `data.ts` basées sur le modèle `Product.ts`.
   - **HTML :**
     ![data-product-html](/assets/data-product-html.png)
   - **Visuellement avec CSS :**
     ![product-navigateaur](/assets/product-navigateur.png)

## Barre de recherche et Routing Angular
1. Ajout d'une méthode à Product Service.
   - **Méthode :**
     ```typescript
     getAllProductsSearchTerm(searchTerm: string) { 
       return this.getAll().filter(
         product => product.name.toLowerCase().includes(searchTerm.toLowerCase())
       );
     }
     ```
   - Cette méthode filtre les produits en fonction du terme de recherche fourni.
2. Ajout des routes dans `app-routing.module.ts` :
   ```typescript
   const routes: Routes = [
     { path: '', component: HomeComponent },
     { path: 'search/:searchTerm', component: HomeComponent }
   ];
   ```
   - Plus besoin d'appeler le component Home dans `app.component.ts`.
3. Utilisation des paramètres d'URL pour la recherche.
   - **Gestion des changements d'URL :**
     - Utilisation de `activatedRoute.params.subscribe(...)` pour écouter les changements dans les paramètres de l'URL.
     - Vérification si un terme de recherche est présent dans les paramètres de l'URL.
     - Utilisation de `productService.getAllProductsSearchTerm()` pour obtenir une liste de produits correspondant au terme de recherche.
4. Affichage des résultats.
   ![recherche-pull-url](/assets/recherche-pull-url.png)
5. Création du component Search : `ng g c components/partials/search`.
6. Ajout du component Search dans le component Home.
7. Implementation du Search Component :
   - **TS :**
     ![search-component-ts](/assets/search-component-ts.png)
   - Méthode `search(term: string)` :
     - Cette méthode est déclenchée lorsqu'un utilisateur effectue une recherche.
     - Elle prend le terme de recherche en argument et utilise le `router` pour naviguer vers une nouvelle URL contenant le terme de recherche.
8. HTML :
   ![input-simple-recherche-exemple](/assets/input-simple-recherche-exemple.png)
   - **Résultat :**
     ![recherche-chemi-navigateur](/assets/recherche-chemi-navigateur.png)
   - **Résultat avec CSS :**
     ![recherche-veste-navigateur-avec-css](/assets/recherche-veste-navigateur-avec-css.png)

# Tags des Produits

1. **Création du Model Tag**
   - Ajout de données d'exemple dans `data.ts`
   - Déclaration de `sample_tags` :
     ```typescript
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
     ];
     ```
2. **Ajout de 2 méthodes au Product Service**
   - Méthode `getAllTags()` :
     ```typescript
     getAllTags(): Tag[] {
       return sample_tags;
     }
     ```
   - Méthode `getAllProductsByTag(tag: string): Product[]` :
     ```typescript
     getAllProductsByTag(tag: string): Product[] {
       return tag == "All" ?
         this.getAll() :
         this.getAll().filter(
           product => product.tags?.includes(tag)
         );
     }
     ```
3. **Ajout de la Route Tags**
   - `{ path: 'tag/:tag', component: HomeComponent }`
4. **Affichage des résultats dans le component Home**
   - Utilisation de `getAllProductsByTag()` lorsque le paramètre `tag` est présent dans l'URL
5. **Génération du component Tags**
   - `ng g c components/partials/tags`
   - Ajout de `<app-tags></app-tags>` au Home component
   - **TS-HTML-CSS** :
     - **TS** :
       ```typescript
       tags?: Tag[];
       constructor(productService: ProductService) {
         this.tags = productService.getAllTags();
       }
       ```
     - **HTML** :
       ![tag-comp-html](/assets/tag-comp-html.png)
     - **Visuellement** :
       ![tag-html-navigateur](/assets/tag-html-navigateur.png)
       CSS + Tag Formel :
       ![tag-avec-css-navigateur-formel](/assets/tag-avec-css-navigateur-formel.png)

# Page du Produit

1. **Ajout de la méthode `getProductById` au fichier product.service.ts :**
   ```typescript
   getProductById(productId: string): Product {
     return this.getAll().find(product => product.id == productId) ?? new Product();
   }
   ```

      La méthode `getAll` récupère tous les produits, et la méthode `find()` recherche le produit dont l'ID correspond à l'identifiant passé en argument `productId`. Si le produit est trouvé, il est renvoyé. Sinon, elle renvoie `undefined`, et une valeur par défaut `new Product()` est renvoyée. Cela garantit que la méthode renvoie toujours quelque chose même si aucun produit n'est trouvé.

2. **Générer le component Page Produit**

   - `ng g c components/pages/product-page` (respecter l'arborescence du projet pour s'y retrouver au mieux)

3. **Ajouter la route**

   - `{ path: 'product/:id', component: ProductPageComponent }` dans le fichier `app-routing.module.ts`

   - Lorsque l'on clique sur un produit : ![product-compo-working-navigateur](/assets/product-compo-working-navigateur.png)

4. **TS-HTML-CSS**

   - **TS** :

     ```typescript
     product!: Product;
     // La variable product est déclarée avec le type Product. Le ! garantie que cette variable sera initialisée avant qu'elle soit utilisée

     // Le constructeur prend deux arguments : 
     constructor(activatedRoute: ActivatedRoute, productService: ProductService) {
       // Il écoute les changements dans les paramètres de l'URL à l'aide de:
       activatedRoute.params.subscribe((params) => {
         // Si un nouvel ID de produit est fourni dans les paramètres de l'URL
         if (params.id)
           // La méthode `getProductById()` du service `productService` est appelée pour récupérer les détails du produit.
           this.product = productService.getProductById(params.id);
       });
     }
     ```

   - **HTML-CSS Résultat :** 

     ![product-page-navigateur](/assets/product-page-navigateur.png)


# Page Panier 

1. **Création d'un modèle de Structure Panier**

   - Importer le modèle de Produit : 
     ```typescript
     import { Product } from "./Product";

     export class CartItem {
       constructor(public product: Product) { }
       quantity: number = 1;
       price: number = this.product.price;
     }
     ```

2. **Création d'un modèle de Panier**

   - Importer le modèle d'Article Panier :
     ```typescript
     import { CartItem } from "./CartItem";

     export class Cart {
       items: CartItem[] = [];
       totalPrice: number = 0;
       totalCount: number = 0;
     }
     ```

3. **Génération d'un service Panier**

   - Générer le service Panier :
     ```
     ng g s services/cart
     ```

4. **Fonctionnalités du Panier**

   - **Ajout / Suppression / Modification / Vidage du Panier :**

     - `addToCart(product: Product): void`: Ajoute un produit au panier. Vérifie si le produit est déjà dans le panier. Si c'est le cas, il ne fait rien. Sinon, il ajoute un nouvel élément au panier avec ce produit.

     - `removeFromCart(productId: string): void`: Supprime un produit du panier en filtrant les éléments du panier pour ne garder que ceux dont l'ID du produit ne correspond pas à celui fourni.

     - `changeQuantity(productId: string, quantity: number)`: Modifie la quantité d'un produit dans le panier en cherchant l'élément correspondant dans le panier et en mettant à jour sa quantité et son prix en conséquence.

     - `clearCart()`: Vide le panier en le réinitialisant à un nouveau panier vide.

     - `getCartObservable(): Observable<Cart>`: Renvoie un Observable qui émet des mises à jour du panier. Les composants peuvent s'abonner à cet Observable pour être informés des changements dans le panier.

     - `setCartToLocalStorage(): void`: Met à jour le panier dans le localStorage du navigateur. Calcule le prix total et le nombre total d'articles dans le panier, puis sauvegarde le panier dans le localStorage et notifie les abonnés à l'Observable.

     - `getCartFromLocalStorage(): Cart`: Récupère le panier à partir du stockage local du navigateur. S'il n'existe pas, il crée un nouveau panier vide.

5. **Génération d'un composant Page Panier**

   - **Ajout de la route** :
     ```typescript
     { path: 'panier', component: CartComponent }
     ```

   - **TS-HTML-CSS** :

     - **TS** :

       - Propriétés :
         ```typescript
         cart!: Cart;
         ```

       - Constructeur :
         - Injection du service de panier `CartService`.
         - Abonnement à l'Observable du panier : Lorsque le composant est initialisé, il s'abonne à l'Observable du panier à l'aide de la méthode `getCartObservable()` du service `CartService`. À chaque mise à jour du panier, il met à jour la propriété `cart` du composant.

       - Méthodes :
         - `removeFromCart(cartItem: CartItem)`: Supprime un élément du panier.
         - `changeQuantity(cartItem: CartItem, quantityInString: string)`: Modifie la quantité d'un élément dans le panier.
       
     - **HTML & CSS, Résultat** :
       ![navigateur-panier](/assets/navigateur-panier.png)

6. **Rendre dynamique l'affichage des éléments du Panier dans le Header**

   - Dans le fichier `header.component.ts` :

     - Propriété :
       ```typescript
       cartQuantity: number = 0;
       ```

     - Constructeur :
       - Injection du `cartService`.
       - Abonnement à l'Observable du panier : Lorsque le composant est initialisé, il s'abonne à l'Observable du panier avec la méthode `getCartObservable()` du service `CartService`. À chaque mise à jour du panier, la fonction de rappel est déclenchée avec le nouveau panier.

       - Mise à jour de `cartQuantity` : À chaque fois qu'une mise à jour du panier est reçue, le nombre total d'articles dans le panier `(newCart.totalCount)` est assigné à la propriété `cartQuantity`. Cela met à jour dynamiquement le nombre d'articles affiché dans le header.

   - **HTML** :
     ```html
     <li>
       <a routerLink="/panier">
         Panier <span *ngIf="cartQuantity">{{ cartQuantity }}</span>
       </a>
     </li>
     ```
     ![header-panier-navigateur](/assets/header-panier-navigateur.png)

# NOT FOUND Barre de Recherche & Panier

1. **Générer le composant dans le dossier partials**

   - Utiliser la commande :
     ```
     ng g c components/partials/not-found
     ```

   - Dans le fichier TypeScript :

     - Initialisation de 4 décorateurs `@Input()` pour définir des propriétés d'entrée.
     - Ces propriétés (`visible`, `notFoundMessage`, `resetLinkText`, `resetLinkRoute`) peuvent être définies depuis le composant parent lors de l'utilisation du composant `NotFoundComponent` dans le template.
     - Les propriétés d'entrée permettent de personnaliser l'apparence et le comportement du composant selon les besoins, par exemple en affichant un message et un lien.

2. **Ajout aux pages nécessaires**

   - **HTML du composant `notFound`** :
     ```html
     <div *ngIf="visible">
       {{ notFoundMessage }}
       <a [routerLink]="resetLinkRoute">{{ resetLinkText }}</a>
     </div>
     ```
     - Cette balise `<div>` est affichée ou masquée en fonction de la valeur de la propriété `visible` du composant.
     - Si `visible` est évalué à `true`, le contenu à l'intérieur de la balise `<div>` sera affiché, sinon il sera masqué.

   - **HTML du Panier** :
     - `[visible]="!cart || !cart.items.length"` : Cette propriété d'entrée `visible` détermine si le composant `NotFoundComponent` est visible ou non.
       - Elle est définie en fonction de la condition si le panier est vide.
       - Si le panier est vide (`(!cart || !cart.items.length` évalué à `true`), le composant `NotFoundComponent` sera visible.
     - `notFoundMessage="Votre panier est vide."` : le message à afficher.
     - `resetLinkText="Retour à l'accueil"` : Le lien permettant à l'utilisateur de revenir à la page d'accueil.

   - **Résultat avec du CSS** :
     ![not-found-navigateur-panier](/assets/not-found-navigateur-panier.png)

   - **Page Produits** :
     Même principe que pour le panier, redirige vers la liste des produits.
     Résultat de la recherche ne donnant rien 'azerty' :
       ![test-azerty-recherche-notfound-navigateur](/assets/test-azerty-recherche-notfound-navigateur.png)

   - **Page Single Produit** :
     ![single-produit-not-found-navigateur](/assets/single-produit-not-found-navigateur.png)


  # BACK-END

## Ce Projet est MEAN STACK, Utilisation de MongoDB, Express, (Angular) et NodeJS

1. **Connexion au Back**

   I. Création du dossier backend à la racine du Projet, à côté du dossier frontend.

   II. Se situer dans le dossier backend : 
      ```
      npm init -y
      npm install typescript
      ```

   III. Création du fichier de configuration dans le dossier back : `tsconfig.json`.

   IV. Création du fichier .gitignore afin de ne pas pousser certains fichiers, notamment le dossier node_modules.

   V. Copier le fichier data.ts dans backend/src (nos samples data du début), supprimer les imports, remplacer les tableaux `Product`, `Tag`, `Service` par `any`.

   VI. Installation de express cors : 
      ```
      npm install express cors
      ```

   VII. Dans le fichier package.json, les dépendances ont été correctement installées (cors et express) : 
       ![dependance-express-ts-cors-packagejson](/assets/dependance-express-ts-cors-packagejson.png)

   VIII. Création de server.ts.

   IX. Installation de ts-node et nodemon :
       ```
       npm install ts-node --save-dev
       npm install nodemon --save-dev
       ```

   X. Ajout de notre configuration `start` dans le fichier package.json :
      ```json
      "scripts": {
        "start": "cd src && nodemon server.ts",
        "test": "echo \"Error: no test specified\" && exit 1"
      }
      ```
      Lancement du serveur avec `npm start` :
      ![serveur-run-npm-start](/assets/serveur-run-npm-start.png)

      Résultat sur l'URL : `http://localhost:5000/api/products` :
      ![serveur-run-bonjour](/assets/serveur-run-bonjour_b2rnvgepj.png)
      Tout fonctionne ! 
      À la place de ce "bonjour", nous allons implémenter nos produits.

      ```typescript
      app.get("/api/products", (req, res) => {
        res.send(sample_products);
      });
      ```
      Plus qu'à recharger la page :
      ![api-products-navigateur-json](/assets/api-products-navigateur-json.png) 
      Nos Produits sont bien là au format JSON 😀 (malgré qu'on ne voit que le T-Shirt sur la capture d'écran)

   XI. Ajout du fichier `urls.ts` au frontend dans un dossier `constants`.
       - Déclaration de nos routes API dans ce fichier.

   XII. Ajout du module HttpClient :
        - Dans le fichier `app.module.ts`, import de `HttpClientModule`.

   XIII. Modification de productService.

  # Login
  1. Générer le component `ng g c components/pages/login`
    I. Ajouter la route : `{ path: 'connexion', component: LoginComponent }`
    II. TS : 
    III. Import du Reactive Forms Module dans `app.module.ts`.
  2. Login API POST request
    - Endpoint API pour la fonctionnalité de connexion des utilisateurs :
    ![server-api-user-login-post-jwt](/assets/server-api-user-login-post-jwt.png)
    II. Ajout du JWT : `npm install jsonwebtoken`
    III. Test avec Postman : ![postman-login-1](/assets/postman-login-1.png)
    Les données de l'utilisateur sont là ainsi que le token 🤩

## Générer un Service User `ng g s services/user`

- **Installation de Toastr :** `npm install ngx-toastr`
- **Import de BrowserAnimationsModule :**
  Dans le fichier `app.module.ts`

- **Générer un Model User :**
  Dans le dossier `model`, créer le fichier `User.ts`
  - **Ajout de l'URL User dans le dossier `urls.ts`**
  - **Générer IUserLogin Interface**

### Constructeur :
- Utilisation de `HttpClient` pour effectuer les requêtes HTTP vers le serveur et `ToastrService` de `ngx-toastr` pour afficher les notifications.
- **Gestion de l'état :**
  Le service est soutenu par un `BehaviorSubject` appelé `userSubject` qui représente l'état actuel de l'utilisateur connecté. Il expose également un observable `userObservable` qui permet aux composants de s'abonner pour être informés des changements d'état de l'utilisateur.

### Méthode `login` :
- Permet d'authentifier un utilisateur en envoyant ses informations de connexion.
- Prend un argument `userLogin` de type `IUserLogin`, une interface représentant la structure des informations d'identification lors de la connexion. Cela garantit la cohérence des données attendues : un email et un mot de passe.
- Une requête HTTP POST est effectuée vers l'URL `USER_LOGIN_URL` (`http://localhost:5000/api/users/login`). Les informations d'identification fournies par l'utilisateur (`userLogin`) sont incluses dans le corps de la requête HTTP.
- Retour de l'Observable de type `Observable<User>`, qui permet aux composants de s'abonner pour être informés du succès ou de l'échec de la connexion utilisateur.

### Méthode `logut` :
```typescript
 logout() {
    this.userSubject.next(new User()); // Nouvel objet User vide et le passe à travers userSubject
    localStorage.removeItem(USER_KEY); // Supprime l'élément stocké localStroage du navigateur sous la clé USER_KEY
    window.location.reload(); // Refresh la page
  }
  ```

### Sauvegarde de l'utilisateur dans le stockage local :
```typescript
  private setUserToLocalStrorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user)); // Convertit avant de stocker
  }
  ```
### Récupération de l'utilisateur depuis le stockage local : 
```typescript
  private getUserFromLocalStoeage(): User{
    const userJson = localStorage.getItem(USER_KEY); // Récupère les infos du localStorage
    if(userJson) return JSON.parse(userJson) as User; // Si valeur trouvé, parse en Jjson et la retorune en tant qu'objet User
    return new User(); // Si aucune valeur ou erreur elle retourne un objet user vide 
  }
  ```
### header.component.ts
(Injection de service User dans le constructor)
- Méthode de déconnexion :
``` typescript
  logout() {
    this.userService.logout();
  }
  ```
La méthode logout() du service UserService, qui se charge de vider les informations de l'utilisateur et de le déconnecter.
- Propriété de vérification de l'authentification (isAuth) :
```typescript
get isAuth(){
    return this.user.token;
  }
  ```
Cette propriété est une fonction qui retourne true si un token utilisateur est présent ce qui indique qu'il est authentifié.

### header.component.html
```html
    <li *ngIf="isAuth" class="menu-container">
      <a routerLink="/dashboard">{{ user.name }}</a>
      <div class="menu">
        <a routerLink="/profile">Profil</a>
        <a routerLink="/orders">Commandes</a>
        <a routerLink="/produits" (click)="logout()">Déconnexion</a>
      </div>
    </li>
```
### Component Login
#### login.component.ts
- loginForm : Crée un formulaire de connexion avec les champs email et mot de passe.
- isSubmitted : Indique si le formulaire a été soumis.
- returnUrl : Stocke l'URL vers laquelle l'utilisateur doit être redirigé après la connexion.
- ngOnInit() : Initialise le formulaire et récupère l'URL de redirection à partir des paramètres d'URL.
- fc() : Un getter qui renvoie les contrôles de formulaire pour un accès facile dans le template.
- submit() : Soumet le formulaire de connexion. Si le formulaire est valide, envoie une demande de connexion au service utilisateur et redirige l'utilisateur vers l'URL de redirection.
### login.component.html 
```html 
<form [formGroup]="loginForm" (ngSubmit)="submit()">
``` 
Définit un formulaire avec les champs email et mot de passe, liés au modèle de formulaire.
```html 
<div class="input-container"> 
```
Conteneur pour chaque champ du formulaire.
```html 
<div class="error-list" ngIf="fc.email.errors && isSubmitted"> 
  ```
Affiche une liste d'erreurs si le champ email est invalide et le formulaire a été soumis.

```html 
<button type="submit">Connexion</button> 
```
Bouton pour soumettre le formulaire de connexion.

#### Résultat avec du CSS 
![login-navigateur-part1](/assets/login-navigateur-part1_9lk0vr8j8.png)
- Test des validators :
![login-navigateur-validators-part1](/assets/login-navigateur-validators-part1.png)
- Test de la connexion avec l'un des emails de sample_users :
![connexion-success-toast](/assets/connexion-success-toast.png)
Le résultat attendu est là 😉