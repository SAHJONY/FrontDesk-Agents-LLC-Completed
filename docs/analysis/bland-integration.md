# Bland.ai Integration Notes

## Environment variables

| Variable | Required | Description |
| --- | --- | --- |
| `BLAND_API_KEY` | optional (outbound) | Server-side key used when invoking Bland's REST API for outbound calls, call summaries, etc. Keep this out of git. |
| `BLAND_WEBHOOK_SECRET` | recommended | Shared secret used to verify webhook payloads delivered to `/api/webhooks/bland`. If omitted, payloads are accepted without verification (not advised in production). |

Store the real values in `.env` / deployment secrets. Example:

```
BLAND_API_KEY=org_xxxxxxxxxxxxx
BLAND_WEBHOOK_SECRET=whsec_xxxxxxxxxxx
```

## Webhook endpoint

- Path: `POST /api/webhooks/bland`
- Body: Raw JSON (Express raw middleware is used so the HMAC signature can be computed)
- Headers: expects `X-Bland-Signature` when `BLAND_WEBHOOK_SECRET` is configured
- Response: `{ "success": true }` when the payload parses and (if applicable) signature verifies

### Current behaviour

1. Validates the HMAC signature using SHA-256 when a secret is configured.
2. Parses the JSON payload and logs the event metadata (type, caller, transcript length).
3. Immediately returns `200` to avoid retries.

### Next steps

- Persist payloads to storage (Airtable/Postgres) for analytics and client access.
- Push summarized notifications to Slack/Email.
- Wire the webhook events into the telemetry dashboard for real-time monitoring.
- Build outbound helpers that consume `BLAND_API_KEY` for proactive call flows.
