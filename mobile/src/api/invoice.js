import { request } from './client';

export const fetchInvoiceList = (q = '') => request('/invoices?q=' + encodeURIComponent(q));
export const fetchInvoice = (id) => request('/invoices/' + id);
