import { request } from './client';

export const fetchPortList = (q = '') => request('/ports?q=' + encodeURIComponent(q));
export const fetchPort = (id) => request('/ports/' + id);
