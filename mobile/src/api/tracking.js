import { request } from './client';

export const fetchTrackingList = (q = '') => request('/tracking-events?q=' + encodeURIComponent(q));
export const fetchTracking = (id) => request('/tracking-events/' + id);
