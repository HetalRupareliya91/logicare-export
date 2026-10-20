import { request } from './client';

export const fetchQuotationList = (q = '') => request('/quotations?q=' + encodeURIComponent(q));
export const fetchQuotation = (id) => request('/quotations/' + id);
