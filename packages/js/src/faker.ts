/**
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/fixtures/ by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/fixtures/ (or weaver's template/) and regenerate:
 *
 *     npm run provider -- monday
 */

/**
 * The monday.com faker.
 *
 * Shapes, not behaviour: the goal is that a downstream node sees the field
 * NAMES monday.com actually publishes, so an author can wire {{ $json.data.id
 * }} against a fake and have it keep working against the real thing.
 *
 * Deterministic — same inputs, same output. A faker returning a fresh uuid
 * every call cannot be asserted on, so its fixtures degrade to "it did not
 * throw", which is the assertion that catches nothing.
 */

import type { ConnectorFaker, FakeRequest } from "@particle-academy/fancy-connector-core";

function fakeItemCreate({ config, fake }: FakeRequest): unknown {
  return {
    "data": {
      "create_item": {
        "id": Array.from({ length: 10 }, () => fake.int(0, 9)).join(""),
        "name": (config.itemName !== undefined && config.itemName !== null && config.itemName !== "" ? String(config.itemName) : "New item"),
        "url": "https://example.monday.com/boards/1234567890/pulses/1234567890",
        "created_at": "2026-01-01T00:00:00Z",
      },
    },
  };
}

export const mondayFaker: ConnectorFaker = (operation, request) => {
  switch (operation) {
    case "item_create":
      return fakeItemCreate(request);

    default:
      // A faker asked for an operation it has no shape for must SAY so. Making
      // something up would produce a green run whose output silently has none
      // of the fields the author is about to reference.
      throw new Error(
        `monday: no fake response is defined for "${operation}". ` +
          "Add a fixture under provider/fixtures/ and regenerate — a connector without a faker " +
          "cannot be developed against, tested, or demonstrated.",
      );
  }
};
