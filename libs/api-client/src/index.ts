/**
 * API client for HTTP requests. Re-exports the configured Axios instance from core.
 * Apps can import { http } from '@src/api-client' and use for API calls.
 * Each app can configure baseURL via env (VITE_PUBLIC_API_URL).
 */
export { http } from '@core';
