/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/item-create.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/item-create.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- monday
 */

/**
 * Create an item on a monday.com board.
 *
 * POST /v2 —
 * https://developer.monday.com/api-reference/reference/items#create-an-item
 *
 * Notice what is NOT here: no key, no base URL, no mode check, no retry loop,
 * no fake/real branch. This describes the request; callConnector resolves the
 * connection, picks the estate, and either calls monday.com or calls the
 * faker.
 *
 * sideEffects: unsafe-to-replay.
 */

import {
  callConnector,
  type ConnectorResult,
  type RequestedMode,
  type Transport,
} from "@particle-academy/fancy-connector-core";
import { MONDAY } from "../service.js";

export const ITEM_CREATE_OPERATION = "item_create";

const DOCUMENT = `mutation CreateItem($boardId: ID!, $itemName: String!, $groupId: String, $columnValues: JSON) {
  create_item(
    board_id: $boardId
    item_name: $itemName
    group_id: $groupId
    column_values: $columnValues
  ) {
    id
    name
    url
    created_at
  }
}`;

export type ItemCreateOptions = {
  /** The node's resolved config. Keys: boardId, itemName, groupId, columnValues. */
  config: Record<string, unknown>;
  credentials?: Record<string, string | undefined>;
  mode?: RequestedMode;
  connectionId?: string | null;
  input?: unknown;
  attempts?: number;
  /** Override the transport. The only way to exercise this without a network. */
  transport?: Transport;
};

export async function mondayItemCreate(options: ItemCreateOptions): Promise<ConnectorResult> {
  const config = options.config ?? {};

  if (config.boardId === undefined || config.boardId === null || config.boardId === "") {
    throw new Error(`item_create: "boardId" is required (Board ID).`);
  }

  if (config.itemName === undefined || config.itemName === null || config.itemName === "") {
    throw new Error(`item_create: "itemName" is required (Item name).`);
  }

  return callConnector(MONDAY, {
    operation: ITEM_CREATE_OPERATION,
    config,
    input: options.input,
    ...(options.credentials === undefined ? {} : { credentials: options.credentials }),
    ...(options.mode === undefined ? {} : { mode: options.mode }),
    ...(options.connectionId === undefined ? {} : { connectionId: options.connectionId }),
    ...(options.attempts === undefined ? {} : { attempts: options.attempts }),
    ...(options.transport === undefined ? {} : { transport: options.transport }),
    request: {
      method: "POST",
      path: "/v2",
      json: {
        query: DOCUMENT,
        variables: {
          "boardId": String(config.boardId),
          "itemName": String(config.itemName),
          ...(config.groupId !== undefined && config.groupId !== null && config.groupId !== "" ? { "groupId": String(config.groupId) } : {}),
          ...columnvaluesForm(config.columnValues),
        },
      },
    },
  });
}

/** `{ order_id: "7" }` → `{ "columnValues": "{\"order_id\":\"7\"}" }`. */
function columnvaluesForm(value: unknown): Record<string, string> {
  if (!value || typeof value !== "object") return {};

  return { "columnValues": JSON.stringify(value) };
}
