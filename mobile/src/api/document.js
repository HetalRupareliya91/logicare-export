import { request } from './client';

export const fetchDocumentList = (q = '') => request('/documents?q=' + encodeURIComponent(q));
export const fetchDocument = (id) => request('/documents/' + id);
