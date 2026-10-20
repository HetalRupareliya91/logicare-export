import { request } from './client';

export const fetchShipmentList = (q = '') => request('/shipments?q=' + encodeURIComponent(q));
export const fetchShipment = (id) => request('/shipments/' + id);
