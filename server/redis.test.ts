import { describe, it, expect, beforeEach, vi } from "vitest";
import {
  getRedisConfig,
  writeTelemetry,
  getTelemetryMetrics,
  incrementCounter,
  getGlobalFleetMetrics,
} from "./redis";

describe("Redis Telemetry Utilities", () => {
  beforeEach(() => {
    // Ensure environment variables are set for tests
    process.env.UPSTASH_REDIS_REST_URL = "https://test-region.upstash.io";
    process.env.UPSTASH_REDIS_REST_TOKEN = "test-token-12345";
  });

  describe("getRedisConfig", () => {
    it("should return Redis configuration from environment variables", () => {
      const config = getRedisConfig();

      expect(config).toBeDefined();
      expect(config.url).toBe("https://test-region.upstash.io");
      expect(config.token).toBe("test-token-12345");
    });

    it("should throw error if configuration is missing", () => {
      delete process.env.UPSTASH_REDIS_REST_URL;

      expect(() => getRedisConfig()).toThrow(
        "Redis configuration missing"
      );
    });
  });

  describe("writeTelemetry", () => {
    it("should handle telemetry event structure correctly", async () => {
      const event = {
        timestamp: Date.now(),
        agentId: "agent-001",
        eventType: "call_completed",
        metrics: {
          duration: 120,
          callQuality: 0.95,
        },
        metadata: {
          location: "New York",
        },
      };

      // Mock fetch for testing
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        statusText: "OK",
      });

      const result = await writeTelemetry(event);

      expect(result).toBe(true);
      expect(global.fetch).toHaveBeenCalled();
    });

    it("should return false on fetch error", async () => {
      const event = {
        timestamp: Date.now(),
        agentId: "agent-001",
        eventType: "call_completed",
        metrics: { duration: 120 },
      };

      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        statusText: "Unauthorized",
      });

      const result = await writeTelemetry(event);

      expect(result).toBe(false);
    });
  });

  describe("incrementCounter", () => {
    it("should increment counter and return new value", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({ result: 42 }),
      });

      const result = await incrementCounter("calls:total", 1);

      expect(result).toBe(42);
    });

    it("should return 0 on error", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        statusText: "Error",
      });

      const result = await incrementCounter("calls:total", 1);

      expect(result).toBe(0);
    });
  });

  describe("getTelemetryMetrics", () => {
    it("should retrieve telemetry metrics for an agent", async () => {
      global.fetch = vi.fn()
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            result: ["telemetry:agent-001:call_completed:1234567890"],
          }),
        })
        .mockResolvedValueOnce({
          ok: true,
          json: async () => ({
            result: JSON.stringify({
              timestamp: 1234567890,
              agentId: "agent-001",
              eventType: "call_completed",
              metrics: { duration: 120 },
            }),
          }),
        });

      const metrics = await getTelemetryMetrics("agent-001", "call_completed");

      expect(metrics).toHaveLength(1);
      expect(metrics[0]?.agentId).toBe("agent-001");
    });

    it("should return empty array on error", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        statusText: "Error",
      });

      const metrics = await getTelemetryMetrics("agent-001", "call_completed");

      expect(metrics).toEqual([]);
    });
  });

  describe("getGlobalFleetMetrics", () => {
    it("should aggregate metrics from all agents", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: true,
        json: async () => ({
          result: [
            "telemetry:agent-001:call_completed:1234567890",
            "telemetry:agent-002:call_completed:1234567891",
            "telemetry:agent-001:call_failed:1234567892",
          ],
        }),
      });

      const metrics = await getGlobalFleetMetrics();

      expect(metrics).toBeDefined();
      expect(metrics.totalAgents).toBe(2);
      expect(metrics.totalEvents).toBe(3);
    });

    it("should return empty object on error", async () => {
      global.fetch = vi.fn().mockResolvedValueOnce({
        ok: false,
        statusText: "Error",
      });

      const metrics = await getGlobalFleetMetrics();

      expect(metrics).toEqual({});
    });
  });
});
