import axios from 'axios';
import { transformReq } from './helper';
import cache from './cache';
import { AUTH_ADMIN_CACHE_KEY } from './constants';

const getBaseURL = () =>
  (typeof import.meta !== 'undefined' &&
    (import.meta as { env?: { VITE_PUBLIC_API_URL?: string } }).env?.VITE_PUBLIC_API_URL) ||
  '';

const HTTP = axios.create({
  baseURL: getBaseURL(),
});

HTTP.interceptors.request.use((req) => {
  const cached = cache.getCache(AUTH_ADMIN_CACHE_KEY);
  const token = (cached?.data as { token?: string } | undefined)?.token;
  if (token && req.headers) {
    req.headers['Authorization'] = `Bearer ${token}`;
  }
  if (req.method === 'get' && req.params) {
    req.params = transformReq(req.params as Record<string, unknown>);
  }
  return req;
});

HTTP.interceptors.response.use(
  (res) => res,
  (err) => {
    const data = err.response?.data;
    if (err.response?.status === 401 && typeof Event !== 'undefined') {
      // logout user
    }
    console.error('HTTP error: ', err);
    err.message = data?.message ?? err.message;
    throw err;
  }
);

export default HTTP;
