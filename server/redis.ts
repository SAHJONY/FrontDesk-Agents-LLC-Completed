/**
 * Redis utility for Edge Runtime compatibility
 * Uses Upstash Redis REST API for telemetry writes
 * Compatible with Edge Runtime environments (no Node.js APIs)
 */

interface RedisConfig {
  url: string;
  token: string;
}

interface TelemetryEvent {
  timestamp: number;
  agentId: string;
  eventType: string;
  metrics: Record<string, unknown>;
  metadata?: Record<string, unknown>;
}

interface RedisResponse {
  result?: unknown;
  error?: string;
}

/**
 * Get Redis configuration from environment variables
 * Safe for Edge Runtime - uses only standard Web APIs
 */
export function getRedisConfig(): RedisConfig {
  const url = process.env.UPSTASH_REDIS_REST_URL;
  const token = process.env.UPSTASH_REDIS_REST_TOKEN;

  if (!url || !token) {
    throw new Error(
      "Redis configuration missing. Set UPSTASH_REDIS_REST_URL and UPSTASH_REDIS_REST_TOKEN"
    );
  }

  return { url, token };
}

/**
 * Write telemetry event to Redis using REST API
 * Edge Runtime compatible - uses fetch instead of Node.js Redis client
 *
 * @param event - Telemetry event to write
 * @returns Promise resolving to success status
 */
export async function writeTelemetry(event: TelemetryEvent): Promise<boolean> {
  try {
    const config = getRedisConfig();
    const key = `telemetry:${event.agentId}:${event.eventType}:${event.timestamp}`;
    const value = JSON.stringify({
      ...event,
      recordedAt: new Date().toISOString(),
    });

    const response = await fetch(`${config.url}/set/${key}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ value }),
    });

    if (!response.ok) {
      console.error(`Redis write failed: ${response.statusText}`);
      return false;
    }

    return true;
  } catch (error) {
    console.error("Failed to write telemetry:", error);
    return false;
  }
}

/**
 * Get telemetry metrics for an agent
 * Edge Runtime compatible
 *
 * @param agentId - Agent identifier
 * @param eventType - Type of event to retrieve
 * @returns Promise resolving to metrics array
 */
export async function getTelemetryMetrics(
  agentId: string,
  eventType: string
): Promise<TelemetryEvent[]> {
  try {
    const config = getRedisConfig();
    const pattern = `telemetry:${agentId}:${eventType}:*`;

    const response = await fetch(`${config.url}/keys/${pattern}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    });

    if (!response.ok) {
      console.error(`Redis read failed: ${response.statusText}`);
      return [];
    }

    const data = (await response.json()) as RedisResponse;
    const keys = (data.result as string[]) || [];

    // Fetch values for each key
    const metrics: TelemetryEvent[] = [];
    for (const key of keys) {
      try {
        const valueResponse = await fetch(`${config.url}/get/${key}`, {
          method: "GET",
          headers: {
            Authorization: `Bearer ${config.token}`,
          },
        });

        if (valueResponse.ok) {
          const valueData = (await valueResponse.json()) as RedisResponse;
          if (valueData.result) {
            metrics.push(JSON.parse(valueData.result as string));
          }
        }
      } catch (err) {
        console.error(`Failed to fetch metric ${key}:`, err);
      }
    }

    return metrics;
  } catch (error) {
    console.error("Failed to get telemetry metrics:", error);
    return [];
  }
}

/**
 * Increment counter for real-time metrics
 * Edge Runtime compatible
 *
 * @param counterKey - Counter identifier
 * @param increment - Amount to increment (default: 1)
 * @returns Promise resolving to new counter value
 */
export async function incrementCounter(
  counterKey: string,
  increment: number = 1
): Promise<number> {
  try {
    const config = getRedisConfig();

    const response = await fetch(`${config.url}/incr/${counterKey}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${config.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ increment }),
    });

    if (!response.ok) {
      console.error(`Counter increment failed: ${response.statusText}`);
      return 0;
    }

    const data = (await response.json()) as RedisResponse;
    return typeof data.result === "number" ? data.result : 0;
  } catch (error) {
    console.error("Failed to increment counter:", error);
    return 0;
  }
}

/**
 * Global Fleet Map aggregation - collect metrics from all agents
 * Edge Runtime compatible
 *
 * @returns Promise resolving to aggregated metrics
 */
export async function getGlobalFleetMetrics(): Promise<Record<string, unknown>> {
  try {
    const config = getRedisConfig();

    const response = await fetch(`${config.url}/keys/telemetry:*`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${config.token}`,
      },
    });

    if (!response.ok) {
      console.error(`Fleet metrics read failed: ${response.statusText}`);
      return {};
    }

    const data = (await response.json()) as RedisResponse;
    const keys = (data.result as string[]) || [];

    // Aggregate metrics by agent
    const aggregated: Record<string, Record<string, number>> = {};

    for (const key of keys) {
      const parts = key.split(":");
      if (parts.length >= 3) {
        const agentId = parts[1];
        const eventType = parts[2];

        if (!aggregated[agentId]) {
          aggregated[agentId] = {};
        }

        if (!aggregated[agentId][eventType]) {
          aggregated[agentId][eventType] = 0;
        }

        aggregated[agentId][eventType]++;
      }
    }

    return {
      timestamp: new Date().toISOString(),
      totalAgents: Object.keys(aggregated).length,
      agents: aggregated,
      totalEvents: keys.length,
    };
  } catch (error) {
    console.error("Failed to get global fleet metrics:", error);
    return {};
  }
}
