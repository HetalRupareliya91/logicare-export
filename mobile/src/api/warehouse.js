import { request } from './client';

export const fetchWarehouseList = (q = '') => request('/warehouses?q=' + encodeURIComponent(q));
export const fetchWarehouse = (id) => request('/warehouses/' + id);
