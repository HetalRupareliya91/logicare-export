import { request } from './client';

export const fetchCarrierList = (q = '') => request('/carriers?q=' + encodeURIComponent(q));
export const fetchCarrier = (id) => request('/carriers/' + id);
