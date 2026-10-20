import { request } from './client';

export const fetchCurrencyList = (q = '') => request('/currencies?q=' + encodeURIComponent(q));
export const fetchCurrency = (id) => request('/currencies/' + id);
