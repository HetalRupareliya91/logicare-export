import { request } from './client';

export const fetchSupplierList = (q = '') => request('/suppliers?q=' + encodeURIComponent(q));
export const fetchSupplier = (id) => request('/suppliers/' + id);
