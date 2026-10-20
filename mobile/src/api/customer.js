import { request } from './client';

export const fetchCustomerList = (q = '') => request('/customers?q=' + encodeURIComponent(q));
export const fetchCustomer = (id) => request('/customers/' + id);
