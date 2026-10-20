import { request } from './client';

export const fetchCustomsDeclarationList = (q = '') => request('/customs-declarations?q=' + encodeURIComponent(q));
export const fetchCustomsDeclaration = (id) => request('/customs-declarations/' + id);
