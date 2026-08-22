/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/actions/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/actions/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- monday
 */

/**
 * What monday.com actually receives.
 *
 * Every assertion below is about the request rather than the response, and
 * none of it touches the network: the transport is a stub that records what it
 * was handed.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import type { PreparedRequest } from "@particle-academy/fancy-connector-core";

import { mondayItemCreate } from "../src/actions/item-create.js";

/** Capture the prepared request instead of sending it. */
function capture() {
  const seen: PreparedRequest[] = [];

  return {
    seen,
    transport: async (request: PreparedRequest) => {
      seen.push(request);

      return { status: 200, body: JSON.stringify({ id: "captured" }), headers: {} };
    },
  };
}

const CREDENTIALS = {
  "apiToken": "test_apiToken"
};

test("item_create sends POST /v2", async () => {
  const { seen, transport } = capture();

  await mondayItemCreate({
    config: {
      "boardId": "example-boardId",
      "itemName": "example-itemName",
      "groupId": "example-groupId",
      "columnValues": {
        "order_id": "7"
      }
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen.length, 1);
  assert.equal(seen[0]!.method, "POST");
  assert.ok(new URL(seen[0]!.url).pathname.endsWith("/v2"), seen[0]!.url);

  assert.deepEqual(JSON.parse(String(seen[0]!.body ?? "{}")), {
    "query": "mutation CreateItem($boardId: ID!, $itemName: String!, $groupId: String, $columnValues: JSON) {\n  create_item(\n    board_id: $boardId\n    item_name: $itemName\n    group_id: $groupId\n    column_values: $columnValues\n  ) {\n    id\n    name\n    url\n    created_at\n  }\n}",
    "variables": {
      "boardId": "example-boardId",
      "itemName": "example-itemName",
      "groupId": "example-groupId",
      "columnValues": "{\"order_id\":\"7\"}"
    }
  });
});

test("the credential is placed the way the provider wants it", async () => {
  const { seen, transport } = capture();

  await mondayItemCreate({
    config: {
      "boardId": "example-boardId",
      "itemName": "example-itemName",
      "groupId": "example-groupId",
      "columnValues": {
        "order_id": "7"
      }
    },
    credentials: CREDENTIALS,
    mode: "live",
    transport,
  });

  assert.equal(seen[0]!.headers["Authorization"], "test_apiToken");
});

test("a missing required field is refused BEFORE anything is sent", async () => {
  // Nothing was attempted, so there is nothing to classify — and the message names
  // the field, rather than letting the provider answer three frames later with
  // "invalid request".
  const { seen, transport } = capture();

  await assert.rejects(
    mondayItemCreate({
      config: {
        "itemName": "example-itemName",
        "groupId": "example-groupId",
        "columnValues": {
          "order_id": "7"
        }
      },
      credentials: CREDENTIALS,
      mode: "live",
      transport,
    }),
    new RegExp("boardId"),
  );

  assert.equal(seen.length, 0, "the request must not have been sent");
});
