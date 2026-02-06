import { publicProcedure, router } from "../_core/trpc";
import {
  writeTelemetry,
  getTelemetryMetrics,
  incrementCounter,
  getGlobalFleetMetrics,
} from "../redis";
import { z } from "zod";

/**
 * Telemetry router for real-time metrics collection
 * All endpoints use public procedures as telemetry should be accessible
 * from both server and client contexts
 */
export const telemetryRouter = router({
  /**
   * Record a telemetry event for an agent
   * Used to track agent activity, call completion, performance metrics
   */
  recordEvent: publicProcedure
    .input(
      z.object({
        agentId: z.string(),
        eventType: z.string(),
        metrics: z.record(z.string(), z.unknown()),
        metadata: z.record(z.string(), z.unknown()).optional(),
      })
    )
    .mutation(async ({ input }) => {
      const success = await writeTelemetry({
        timestamp: Date.now(),
        agentId: input.agentId,
        eventType: input.eventType,
        metrics: input.metrics,
        metadata: input.metadata,
      });

      return {
        success,
        message: success ? "Event recorded" : "Failed to record event",
      };
    }),

  /**
   * Get telemetry metrics for a specific agent
   * Returns all recorded events for the agent and event type
   */
  getAgentMetrics: publicProcedure
    .input(
      z.object({
        agentId: z.string(),
        eventType: z.string(),
      })
    )
    .query(async ({ input }) => {
      const metrics = await getTelemetryMetrics(input.agentId, input.eventType);
      return {
        agentId: input.agentId,
        eventType: input.eventType,
        count: metrics.length,
        metrics,
      };
    }),

  /**
   * Increment a counter for real-time metrics
   * Used for tracking call counts, successful appointments, etc.
   */
  incrementCounter: publicProcedure
    .input(
      z.object({
        counterKey: z.string(),
        increment: z.number().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const newValue = await incrementCounter(input.counterKey, input.increment);
      return {
        counterKey: input.counterKey,
        newValue,
      };
    }),

  /**
   * Get global fleet metrics
   * Returns aggregated metrics across all agents
   * Used for dashboards and reporting
   */
  getFleetMetrics: publicProcedure.query(async () => {
    const metrics = await getGlobalFleetMetrics();
    return metrics;
  }),

  /**
   * Record a call event
   * Convenience endpoint for recording call-related telemetry
   */
  recordCall: publicProcedure
    .input(
      z.object({
        agentId: z.string(),
        duration: z.number(), // in seconds
        successful: z.boolean(),
        appointmentScheduled: z.boolean(),
        callQuality: z.number().optional(), // 0-1 scale
        customerId: z.string().optional(),
      })
    )
    .mutation(async ({ input }) => {
      const success = await writeTelemetry({
        timestamp: Date.now(),
        agentId: input.agentId,
        eventType: "call_completed",
        metrics: {
          duration: input.duration,
          successful: input.successful,
          appointmentScheduled: input.appointmentScheduled,
          callQuality: input.callQuality || 0,
        },
        metadata: {
          customerId: input.customerId,
        },
      });

      // Also increment counters
      if (success) {
        await incrementCounter(`calls:total:${input.agentId}`);
        if (input.successful) {
          await incrementCounter(`calls:successful:${input.agentId}`);
        }
        if (input.appointmentScheduled) {
          await incrementCounter(`appointments:scheduled:${input.agentId}`);
        }
      }

      return {
        success,
        message: success ? "Call recorded" : "Failed to record call",
      };
    }),

  /**
   * Get agent performance summary
   * Returns key metrics for an agent
   */
  getAgentPerformance: publicProcedure
    .input(z.object({ agentId: z.string() }))
    .query(async ({ input }) => {
      const callMetrics = await getTelemetryMetrics(input.agentId, "call_completed");

      // Calculate statistics
      const totalCalls = callMetrics.length;
      const successfulCalls = callMetrics.filter(
        (m) => (m.metrics.successful as boolean) === true
      ).length;
      const appointmentsScheduled = callMetrics.filter(
        (m) => (m.metrics.appointmentScheduled as boolean) === true
      ).length;
      const avgDuration =
        totalCalls > 0
          ? callMetrics.reduce((sum, m) => sum + (m.metrics.duration as number), 0) /
            totalCalls
          : 0;
      const avgQuality =
        totalCalls > 0
          ? callMetrics.reduce((sum, m) => sum + (m.metrics.callQuality as number), 0) /
            totalCalls
          : 0;

      return {
        agentId: input.agentId,
        totalCalls,
        successfulCalls,
        successRate: totalCalls > 0 ? (successfulCalls / totalCalls) * 100 : 0,
        appointmentsScheduled,
        appointmentRate: totalCalls > 0 ? (appointmentsScheduled / totalCalls) * 100 : 0,
        avgDuration: Math.round(avgDuration),
        avgQuality: Math.round(avgQuality * 100) / 100,
      };
    }),

  /**
   * Get fleet-wide performance summary
   * Returns aggregated performance metrics across all agents
   */
  getFleetPerformance: publicProcedure.query(async () => {
    const fleetMetrics = await getGlobalFleetMetrics();

    return {
      timestamp: fleetMetrics.timestamp,
      totalAgents: fleetMetrics.totalAgents || 0,
      totalEvents: fleetMetrics.totalEvents || 0,
      agents: fleetMetrics.agents || {},
    };
  }),
});
