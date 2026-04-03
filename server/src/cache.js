import Memcached from "memcached";

const MEMCACHED_HOST = process.env.MEMCACHED_HOST || "localhost:11211";

class Cache {
  constructor() {
    this.client = new Memcached(MEMCACHED_HOST, {
      retries: 2,
      timeout: 1000,
      failures: 3,
      failOverServers: [],
    });

    this.client.on("failure", (details) => {
      console.warn(`[Cache] Server failure: ${details.server}`);
    });

    console.log(`[Cache] Connected to Memcached at ${MEMCACHED_HOST}`);
  }

  // Get a value from cache
  get(key) {
    return new Promise((resolve) => {
      this.client.get(key, (err, data) => {
        if (err || !data) return resolve(null);
        try {
          resolve(JSON.parse(data));
        } catch {
          resolve(null);
        }
      });
    });
  }

  // Set a value in cache with TTL (time to live in seconds)
  set(key, value, ttl = 300) {
    return new Promise((resolve) => {
      this.client.set(key, JSON.stringify(value), ttl, (err) => {
        if (err) console.warn(`[Cache] Set failed for ${key}:`, err.message);
        resolve(!err);
      });
    });
  }

  // Get from cache, or call fallback and cache the result
  async getOrSet(key, fallback, ttl = 300) {
    const cached = await this.get(key);
    if (cached) {
      console.log(`[Cache] Hit: ${key}`);
      return cached;
    }

    console.log(`[Cache] Miss: ${key}`);
    const fresh = await fallback();
    await this.set(key, fresh, ttl);
    return fresh;
  }

  // Delete a cached key
  del(key) {
    return new Promise((resolve) => {
      this.client.del(key, (err) => {
        resolve(!err);
      });
    });
  }
}

export default new Cache();
