import type { Application, Request, Response } from "express";
import express from "express";
import crypto from "crypto";

const BLAND_SIGNATURE_HEADER = "x-bland-signature";
const blandWebhookSecret = process.env.BLAND_WEBHOOK_SECRET ?? process.env.BLAND_AI_WEBHOOK_SECRET;

interface BlandWebhookCaller {
  phone_number?: string;
  name?: string;
  email?: string;
}

interface BlandWebhookTranscriptSegment {
  role: "assistant" | "caller" | string;
  text: string;
  timestamp?: number;
}

interface BlandWebhookPayload {
  id?: string;
  type?: string;
  caller?: BlandWebhookCaller;
  transcript?: BlandWebhookTranscriptSegment[];
  payload?: Record<string, unknown>;
  [key: string]: unknown;
}

function isSignatureValid(body: Buffer, signature: string, secret: string): boolean {
  const hmac = crypto.createHmac("sha256", secret);
  hmac.update(body);
  const digest = hmac.digest("hex");
  const digestBuffer = Buffer.from(digest);
  const signatureBuffer = Buffer.from(signature);
  if (digestBuffer.length !== signatureBuffer.length) {
    return false;
  }
  return crypto.timingSafeEqual(digestBuffer, signatureBuffer);
}

async function handleBlandWebhook(req: Request, res: Response) {
  const rawBody = Buffer.isBuffer(req.body) ? req.body : Buffer.from(req.body || "");

  if (!rawBody.length) {
    return res.status(400).json({ error: "Empty webhook payload" });
  }

  if (blandWebhookSecret) {
    const signature = req.header(BLAND_SIGNATURE_HEADER) || req.header(BLAND_SIGNATURE_HEADER.toUpperCase());
    if (!signature) {
      return res.status(400).json({ error: "Missing Bland signature" });
    }

    if (!isSignatureValid(rawBody, signature, blandWebhookSecret)) {
      return res.status(400).json({ error: "Invalid Bland signature" });
    }
  }

  let payload: BlandWebhookPayload;
  try {
    payload = JSON.parse(rawBody.toString("utf8"));
  } catch (error) {
    return res.status(400).json({ error: "Invalid JSON payload" });
  }

  // TODO: persist, push to Slack/Airtable, etc.
  console.info("[Bland] webhook received", {
    eventType: payload.type,
    caller: payload.caller,
    transcriptLength: payload.transcript?.length ?? 0,
  });

  return res.status(200).json({ success: true });
}

export function registerBlandWebhook(app: Application) {
  app.post("/api/webhooks/bland", express.raw({ type: "application/json" }), handleBlandWebhook);
}
