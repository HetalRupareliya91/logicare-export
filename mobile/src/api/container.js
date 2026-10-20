import { request } from './client';

export const fetchContainerList = (q = '') => request('/containers?q=' + encodeURIComponent(q));
export const fetchContainer = (id) => request('/containers/' + id);
