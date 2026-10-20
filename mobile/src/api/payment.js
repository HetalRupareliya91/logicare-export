import { request } from './client';

export const fetchPaymentList = (q = '') => request('/payments?q=' + encodeURIComponent(q));
export const fetchPayment = (id) => request('/payments/' + id);
