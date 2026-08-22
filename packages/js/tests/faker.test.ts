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
 * The golden fixtures.
 *
 * Deterministic on purpose: the same seed produces the same bytes in
 * TypeScript, PHP and Python, so this file and its twins in the other packages
 * assert the SAME values. That turns the faker into a parity test rather than
 * a convenience — which matters, because cross-runtime drift does not fail
 * loudly. It completes, down one path, with no error.
 */

import { test } from "node:test";
import assert from "node:assert/strict";
import { fakeRequest } from "@particle-academy/fancy-connector-core";

import { mondayFaker } from "../src/faker.js";

test("item_create fakes the shape monday.com publishes", () => {
  const config = {};

  const faked = mondayFaker("item_create", fakeRequest("monday", "item_create", config));

  assert.deepEqual(faked, {
    "data": {
      "create_item": {
        "id": "6278569463",
        "name": "New item",
        "url": "https://example.monday.com/boards/1234567890/pulses/1234567890",
        "created_at": "2026-01-01T00:00:00Z"
      }
    }
  });
});

test("an operation with no fixture throws rather than inventing a shape", () => {
  assert.throws(() => mondayFaker("no_such_operation", fakeRequest("monday", "no_such_operation", {})), /no fake response/);
});
