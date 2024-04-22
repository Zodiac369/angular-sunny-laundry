const BASE_URL = 'http://localhost:5000'; // URL du serveur pour le Developpement

export const PRODUCTS_URL = BASE_URL + '/api/produits';
export const PRODUCTS_BY_ID_URL = BASE_URL + '/api/produits/';
export const PRODUCTS_TAGS_URL = PRODUCTS_URL + '/tags';
export const PRODUCTS_BY_SEARCH_URL = PRODUCTS_URL + '/recherche/';
export const PRODUCTS_BY_TAG_URL = PRODUCTS_URL + '/tag/';

export const USER_LOGIN_URL = BASE_URL + '/api/users/login';
export const USER_REGISTER_URL = BASE_URL + '/api/users/register';

export const ORDERS_URL = BASE_URL + '/api/orders';
export const ORDER_CREATE_URL = ORDERS_URL + '/create';
export const ORDER_NEW_FOR_CURRENT_URL = ORDERS_URL + '/newOrderForCurrentUser';

