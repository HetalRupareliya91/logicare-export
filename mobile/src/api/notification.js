import { request } from './client';

export const fetchNotificationList = (q = '') => request('/notifications?q=' + encodeURIComponent(q));
export const fetchNotification = (id) => request('/notifications/' + id);
