import { request } from './client';

export const fetchProductList = (q = '') => request('/products?q=' + encodeURIComponent(q));
export const fetchProduct = (id) => request('/products/' + id);
