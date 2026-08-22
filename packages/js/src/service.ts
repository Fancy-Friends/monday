/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- monday
 */

/**
 * monday.com, as one service descriptor shared by every monday.com operation.
 *
 * @particle-academy/fancy-connector-core carries what is true of ALL
 * connectors. This carries what is true of monday.com: its base URL, its auth
 * scheme, its idempotency header, and its faker.
 *
 * ## The sandbox trap, written down where it is used
 *
 * monday has no test estate. A developer plan is a real account with real
 * boards, so anything an action creates is created for real. The faker is the
 * only safe way to develop against this connector, which is why every action
 * ships with one.
 */

import type { ConnectorMode, PreparedRequest, ServiceDescriptor } from "@particle-academy/fancy-connector-core";

import { mondayFaker } from "./faker.js";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported. An imported constant lets an upgrade rewrite the
 * very claim it exists to detect, after which the copy agrees with itself
 * forever.
 */
export const CONNECTOR_API_VERSION = 1;

export const MONDAY_BASE_URLS = {
  "live": "https://api.monday.com"
} as const;

/** Credential keys a remote call cannot proceed without. */
export const MONDAY_REQUIRES = [
  "apiToken"
] as const;

/**
 * Apply monday.com's auth scheme to an outgoing request.
 *
 * BARE, with no `Bearer ` prefix. Both spellings answer 401 to an invalid
 * token, so the wire cannot tell them apart and this had to come from monday's
 * own authentication doc rather than from a probe. A `Bearer ` prefix here
 * would fail every real call with an authentication error that says nothing
 * about the prefix.
 *
 * The mode is passed in because for some providers auth and estate are the
 * same decision expressed in the URL; here it is unused, and saying so is
 * cheaper than wondering later whether it was forgotten.
 */
export function mondayAuthorize(
  credentials: Record<string, string | undefined>,
  request: PreparedRequest,
  _mode: ConnectorMode,
): void {
  request.headers["API-Version"] = "2026-07";

  request.headers["Authorization"] = `${credentials.apiToken ?? ""}`;
}

/** The monday.com service, for the TypeScript runtime. */
export const MONDAY: ServiceDescriptor = {
  service: "monday",
  title: "monday.com",
  sandbox: "none",
  baseUrls: { ...MONDAY_BASE_URLS },
  requires: [...MONDAY_REQUIRES],
  authorize: mondayAuthorize,
  faker: mondayFaker,
};
