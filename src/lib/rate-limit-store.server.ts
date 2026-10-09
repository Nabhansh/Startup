import {
  createMemoryStore,
  createRateLimiter,
  type CounterStore,
  type RateLimitConfig,
  type RateLimitVerdict,
} from "./rate-limit";

// Plan-helper limits. Set PLAN_DAILY_LIMIT to change the global daily budget.
export function planLimitConfig(): RateLimitConfig {
  const daily = Number(process.env["PLAN_DAILY_LIMIT"]);
  return {
    perClientMax: 5,
    perClientWindowMs: 10 * 60_000,
    dailyMax: Number.isFinite(daily) && daily > 0 ? daily : 300,
  };
}

// Netlify Blobs is shared across all instances. It is unavailable outside Netlify,
// in which case we fall back to per-instance memory so local development still works.
async function sharedStore(): Promise<CounterStore | undefined> {
  try {
    const { getStore } = await import("@netlify/blobs");
    const store = getStore({ name: "plan-rate-limit" });
    return {
      async get(key) {
        return (await store.get(key, { type: "json" })) as Awaited<ReturnType<CounterStore["get"]>>;
      },
      async set(key, value) {
        await store.setJSON(key, value);
      },
    };
  } catch {
    return undefined;
  }
}

const memoryLimiter = createRateLimiter(createMemoryStore(), planLimitConfig());

export async function limitPlanRequest(clientId: string): Promise<RateLimitVerdict> {
  const store = await sharedStore();
  if (!store) return memoryLimiter(clientId);
  try {
    return await createRateLimiter(store, planLimitConfig())(clientId);
  } catch (error) {
    // Fail open for availability, but keep the per-instance cap as a backstop.
    console.warn("shared rate limit unavailable, using memory backstop", error);
    return memoryLimiter(clientId);
  }
}
