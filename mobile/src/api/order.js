import { request } from './client';

export const fetchOrderList = (q = '') => request('/orders?q=' + encodeURIComponent(q));
export const fetchOrder = (id) => request('/orders/' + id);
