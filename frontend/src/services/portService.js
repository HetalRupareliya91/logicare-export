import { api } from '../api/client';

const base = '/ports';

export const portService = {
  list: (params = {}) => api.get(base + '?' + new URLSearchParams(params).toString()),
  get: (id) => api.get(base + '/' + id),
  create: (data) => api.post(base, data),
  update: (id, data) => api.put(base + '/' + id, data),
  remove: (id) => api.del(base + '/' + id),
};
