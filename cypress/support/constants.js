/* URLS */

const BASE_API_URL = Cypress.env('BACKEND_URL');
export const PRODUCTS_URL = BASE_API_URL + '/productos';

/* PATHS */

export const ADMIN_PATH = '/administracion';
export const PRODUCT_DETAIL_PATH = '/producto';

/* USER MENU TEXTS */

export const LOG_OUT_OPTION = 'Cerrar sesión';
export const ADMIN_PANEL_OPTION = 'Panel de administrador';

/* ADMIN ACTIONS */

export const ADD_PRODUCT_ACTION = 'Agregar producto';
