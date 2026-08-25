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
 * monday.com's identity on the authoring surface, shared by every monday.com
 * node.
 *
 * This file must import nothing from the js package: a PHP or Python project
 * installs the ui package and never that one, and the import would be a
 * dangling module the moment it did.
 *
 * ## The sandbox trap
 *
 * monday has no test estate. A developer plan is a real account with real
 * boards, so anything an action creates is created for real. The faker is the
 * only safe way to develop against this connector, which is why every action
 * ships with one.
 */

import type { ConnectorDomain, ConnectorMeta } from "@particle-academy/fancy-flow/connectors";

/**
 * The connector API version this package was GENERATED against.
 *
 * A literal, never imported — an imported constant lets an upgrade rewrite the
 * very claim it exists to detect.
 */
export const CONNECTOR_API_VERSION = 1;

/** The parts of a connector's identity that belong to the SERVICE, not the node. */
export const MONDAY_SERVICE = {
  service: "monday",
  serviceTitle: "monday.com",
  domain: "productivity",
  sandbox: "none",
} as const satisfies Pick<ConnectorMeta, "service" | "serviceTitle" | "domain" | "sandbox">;

/**
 * Every connector domain weaver knows, pinned against fancy-flow's union.
 *
 * A closed set copied into three codebases stays correct only while something
 * MAKES it: this line fails to compile the moment weaver carries a value
 * fancy-flow does not, including the values no provider uses yet.
 */
const WEAVER_DOMAINS: readonly ConnectorDomain[] = [
  "payments",
  "commerce",
  "messaging",
  "email",
  "crm",
  "support",
  "storage",
  "calendar",
  "productivity",
  "database",
  "devtools",
  "analytics",
  "marketing",
  "ai",
  "forms",
  "hr",
  "geo"
];
void WEAVER_DOMAINS;

/** The credentials a monday.com connection holds. */
export const MONDAY_CREDENTIALS = [
  {
    "key": "apiToken",
    "label": "API token",
    "scope": "account",
    "secret": true,
    "help": "From monday.com: your avatar -> Developers -> My Access Tokens. It carries YOUR permissions and every board you can see, so a personal token grants an automation everything you have."
  }
] as const;

/** Build a monday.com node's connector metadata from the operation it performs. */
export function mondayMeta(
  role: ConnectorMeta["role"],
  operation: string,
  docs: string,
): ConnectorMeta {
  return { ...MONDAY_SERVICE, role, operation, docs };
}
