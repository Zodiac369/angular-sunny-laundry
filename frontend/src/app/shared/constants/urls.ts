const BASE_URL = 'http://localhost:5000'; // URL du serveur pour le Developpement

export const PRODUCTS_URL = BASE_URL + '/api/produits';
export const PRODUCT_BY_ID_URL = BASE_URL + '/api/produit/';
export const PRODUCTS_TAGS_URL = PRODUCTS_URL + '/tags';
export const PRODUCTS_BY_SEARCH_URL = PRODUCTS_URL + '/recherche/';
export const PRODUCTS_BY_TAG_URL = PRODUCTS_URL + '/tag/';