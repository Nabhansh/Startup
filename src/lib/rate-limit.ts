// Rate-limit logic, independent of where counters are stored.
// Stores are pluggable: Netlify Blobs in production, memory in local development and tests.

export type Counter = { count: number; windowStart: number };

export interface CounterStore {
  get(key: string): Promise<Counter | undefined | null>;
  set(key: string, value: Counter): Promise<void>;
}

export type RateLimitConfig = {
  perClientMax: number;
  perClientWindowMs: number;
  dailyMax: number;
};

export type RateLimitVerdict = "ok" | "client" | "daily";

async function sha256Hex(input: string): Promise<string> {
  const digest = await globalThis.crypto.subtle.digest("SHA-256", new TextEncoder().encode(input));
  return Array.from(new Uint8Array(digest), (b) => b.toString(16).padStart(2, "0")).join("");
}

export function createRateLimiter(store: CounterStore, config: RateLimitConfig) {
  return async function check(
    clientId: string,
    now: number = Date.now(),
  ): Promise<RateLimitVerdict> {
    const day = new Date(now).toISOString().slice(0, 10);
    const budgetKey = `budget:${day}`;
    const budget = (await store.get(budgetKey)) ?? { count: 0, windowStart: now };
    if (budget.count >= config.dailyMax) return "daily";

    const clientKey = `client:${await sha256Hex(clientId)}`;
    const stored = (await store.get(clientKey)) ?? { count: 0, windowStart: now };
    const current =
      now - stored.windowStart >= config.perClientWindowMs
        ? { count: 0, windowStart: now }
        : stored;
    if (current.count >= config.perClientMax) return "client";

    await store.set(clientKey, { count: current.count + 1, windowStart: current.windowStart });
    await store.set(budgetKey, { count: budget.count + 1, windowStart: budget.windowStart });
    return "ok";
  };
}

export function createMemoryStore(maxEntries = 5_000): CounterStore {
  const entries = new Map<string, Counter>();
  return {
    async get(key) {
      return entries.get(key);
    },
    async set(key, value) {
      if (!entries.has(key) && entries.size >= maxEntries) entries.clear();
      entries.set(key, value);
    },
  };
}
