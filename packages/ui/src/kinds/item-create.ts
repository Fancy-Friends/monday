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
 * monday.com item — Create an item on a monday.com board.
 *
 * https://developer.monday.com/api-reference/reference/items#create-an-item
 *
 * `unsafe-to-replay`.
 */

import type { NodeKindDefinition } from "@particle-academy/fancy-flow/engine";
import { defineConnectorKind, summarize, type OutputField } from "@particle-academy/fancy-flow/connectors";
import { mondayMeta } from "../service.js";

export const MONDAY_ITEM_KIND = "@particle-academy/monday_item";
export const MONDAY_ITEM_OPERATION = "item_create";

export const MONDAY_ITEM_META = mondayMeta("action", "create an item", "https://developer.monday.com/api-reference/reference/items#create-an-item");

/**
 * What this node emits — the "ingredients" a downstream node can reference.
 *
 * fancy-flow reads `outputShape` off the kind and offers it in the variable
 * picker, so declaring it is the whole of the work: an author configuring the
 * next node picks `{{ $json.data.id }}` off a list instead of typing a path
 * and hoping.
 */
export const MONDAY_ITEM_OUTPUT: OutputField[] = [
  {
    "path": "data.create_item.id",
    "type": "string",
    "description": "The new item's id."
  },
  {
    "path": "data.create_item.name",
    "type": "string",
    "description": "The item's name as monday stored it."
  },
  {
    "path": "data.create_item.url",
    "type": "string",
    "description": "Link to the item on the board."
  },
  {
    "path": "data.create_item.created_at",
    "type": "string",
    "description": "When it was created."
  }
];

export const mondayItemKind: NodeKindDefinition = defineConnectorKind(MONDAY_ITEM_META, {
  name: MONDAY_ITEM_KIND,
  aliases: ["monday_item"],
  label: "monday.com item",
  description: "Create an item on a monday.com board.",
  inputs: [{ id: "in" }],
  outputs: [{ id: "out" }],
  sideEffects: "unsafe-to-replay",
  outputShape: MONDAY_ITEM_OUTPUT,
  configSchema: [
    {
      "type": "text",
      "key": "boardId",
      "label": "Board ID",
      "required": true,
      "description": "The numeric id in the board URL: monday.com/boards/1234567890."
    },
    {
      "type": "text",
      "key": "itemName",
      "label": "Item name",
      "required": true,
      "description": "What the item is called on the board."
    },
    {
      "type": "text",
      "key": "groupId",
      "label": "Group ID",
      "description": "Which group on the board to create it in. Left empty, monday uses the board's default group."
    },
    {
      "type": "keyvalue",
      "key": "columnValues",
      "label": "Column values",
      "description": "Column id to value, e.g. status -> Done. Which values a column accepts depends on its type."
    }
  ],
  defaultConfig: {
    "mode": "auto"
  },
  renderBody: ({ config }) =>
    summarize(MONDAY_ITEM_META, config as Record<string, unknown>, "create an item"),
});
