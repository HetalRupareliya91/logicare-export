import AsyncStorage from '@react-native-async-storage/async-storage';

// Android emulator reaches the host machine on 10.0.2.2
export const API_URL = 'http://10.0.2.2:5000/api';

export async function request(path, options = {}) {
  const token = await AsyncStorage.getItem('token');
  const res = await fetch(API_URL + path, {
    ...options,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: 'Bearer ' + token } : {}),
    },
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || 'Request failed');
  return data;
}

export async function login(email, password) {
  const data = await request('/auth/login', { method: 'POST', body: JSON.stringify({ email, password }) });
  await AsyncStorage.setItem('token', data.token);
  return data.user;
}

export const logout = () => AsyncStorage.removeItem('token');
