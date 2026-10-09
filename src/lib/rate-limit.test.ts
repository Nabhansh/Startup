import { describe, expect, it } from "vitest";
import { createMemoryStore, createRateLimiter, type CounterStore } from "./rate-limit";

const config = { perClientMax: 2, perClientWindowMs: 1_000, dailyMax: 10 };
const NOON = Date.parse("2026-10-09T12:00:00Z");

describe("createRateLimiter", () => {
  it("allows a client up to its per-window maximum, then blocks", async () => {
    const check = createRateLimiter(createMemoryStore(), config);
    expect(await check("a", NOON)).toBe("ok");
    expect(await check("a", NOON + 1)).toBe("ok");
    expect(await check("a", NOON + 2)).toBe("client");
  });

  it("resets a client's allowance once the window has passed", async () => {
    const check = createRateLimiter(createMemoryStore(), config);
    await check("a", NOON);
    await check("a", NOON + 1);
    expect(await check("a", NOON + 2)).toBe("client");
    expect(await check("a", NOON + 1_000)).toBe("ok");
  });

  it("does not let one client use up another client's allowance", async () => {
    const check = createRateLimiter(createMemoryStore(), config);
    await check("a", NOON);
    await check("a", NOON + 1);
    expect(await check("b", NOON + 2)).toBe("ok");
  });

  it("enforces the global daily budget across clients", async () => {
    const check = createRateLimiter(createMemoryStore(), { ...config, dailyMax: 3 });
    expect(await check("a", NOON)).toBe("ok");
    expect(await check("b", NOON)).toBe("ok");
    expect(await check("c", NOON)).toBe("ok");
    expect(await check("d", NOON)).toBe("daily");
  });

  it("never stores the raw client identifier", async () => {
    const keys: string[] = [];
    const recording: CounterStore = {
      get: async () => undefined,
      set: async (key) => {
        keys.push(key);
      },
    };
    await createRateLimiter(recording, config)("203.0.113.9", NOON);
    expect(keys.some((key) => key.includes("203.0.113.9"))).toBe(false);
    expect(keys.some((key) => key.startsWith("client:"))).toBe(true);
  });
});
