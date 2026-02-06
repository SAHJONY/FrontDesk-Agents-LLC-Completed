import { describe, it, expect, vi } from "vitest";

describe("Environment Configuration", () => {
  it("should have Supabase environment variables configured", () => {
    const supabaseUrl = process.env.SUPABASE_URL;
    const supabaseAnonKey = process.env.SUPABASE_ANON_KEY;
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseAnonKey).toBeDefined();
    expect(supabaseServiceRoleKey).toBeDefined();

    // Validate URL format
    if (supabaseUrl) {
      expect(supabaseUrl).toMatch(/^https:\/\/.+\.supabase\.co$/);
    }
  });

  it("should have Upstash Redis environment variables configured", () => {
    const redisUrl = process.env.UPSTASH_REDIS_REST_URL;
    const redisToken = process.env.UPSTASH_REDIS_REST_TOKEN;

    expect(redisUrl).toBeDefined();
    expect(redisToken).toBeDefined();

    // Validate URL format
    if (redisUrl) {
      expect(redisUrl).toMatch(/^https:\/\/.+\.upstash\.io$/);
    }
  });

  it("should validate Supabase connection URL format", () => {
    const url = process.env.SUPABASE_URL;
    if (url) {
      try {
        new URL(url);
        expect(true).toBe(true);
      } catch {
        expect(true).toBe(false);
      }
    }
  });

  it("should validate Redis REST URL format", () => {
    const url = process.env.UPSTASH_REDIS_REST_URL;
    if (url) {
      try {
        new URL(url);
        expect(true).toBe(true);
      } catch {
        expect(true).toBe(false);
      }
    }
  });
});
