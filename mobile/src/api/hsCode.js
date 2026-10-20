import { request } from './client';

export const fetchHsCodeList = (q = '') => request('/hs-codes?q=' + encodeURIComponent(q));
export const fetchHsCode = (id) => request('/hs-codes/' + id);
