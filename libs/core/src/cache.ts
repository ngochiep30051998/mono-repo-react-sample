import dayjs from './dayjs';

export class Cache {
  private masterKey: string;

  constructor(key: string) {
    this.masterKey = key || 'cache_key';
  }

  public setCache(key: string, data: unknown, seconds = 1000000) {
    const timeout = dayjs().utc().add(seconds, 'second').valueOf();
    localStorage.setItem(
      this.getKey(key),
      JSON.stringify({ timeout, data })
    );
  }

  public getCache(key: string): { timeout: number; data: unknown } | null {
    const cached = localStorage.getItem(this.getKey(key));
    try {
      return cached ? JSON.parse(cached) : null;
    } catch {
      return null;
    }
  }

  public remove(key: string) {
    return localStorage.removeItem(this.getKey(key));
  }

  private isExpired(key: string) {
    const data = this.getCache(key);
    return !data || data.timeout <= dayjs().utc().valueOf();
  }

  private getKey(key: string) {
    return `${this.masterKey}_${key}`;
  }
}

const cacheKey =
  (typeof import.meta !== 'undefined' && (import.meta as { env?: { LOCAL_CACHE_KEY?: string } }).env?.LOCAL_CACHE_KEY) ||
  'cache_key';

export default new Cache(cacheKey);
