import { request } from './client';

export const fetchCountryList = (q = '') => request('/countries?q=' + encodeURIComponent(q));
export const fetchCountry = (id) => request('/countries/' + id);
