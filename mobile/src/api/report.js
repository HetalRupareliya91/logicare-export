import { request } from './client';

export const fetchReportList = (q = '') => request('/reports?q=' + encodeURIComponent(q));
export const fetchReport = (id) => request('/reports/' + id);
