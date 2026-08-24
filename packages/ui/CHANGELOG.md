# Changelog

All notable changes to `@particle-academy/monday-ui`, `@particle-academy/monday-js`,
`particle-academy/monday-php` and `fancy-monday`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.2.0] — 2026-08-24

### Changed

- **`@particle-academy/monday-ui` is now an OPTIONAL PEER dependency of `@particle-academy/monday-js`, not a hard one.**

`./flow` needs it; nothing else does. It was a hard dependency, and because
`@particle-academy/monday-ui` itself peer-depends on `fancy-flow` — which npm 7+ installs
automatically — `npm install @particle-academy/monday-js` pulled the **entire flow engine**
onto disk for a consumer who only wanted to call the API. Roughly **18 MB
became 874 KB**, and the package works exactly as before:

```js
import { monday… } from "@particle-academy/monday-js";
// an injected transport, no flow engine anywhere
```

**This is breaking if you use `@particle-academy/monday-js/flow`.** Add `@particle-academy/monday-ui` to your own
dependencies — it was always being installed for you, and now it is declared.
Everything importing only the main entry point is unaffected.

The fix is on this edge rather than on `@particle-academy/monday-ui` → `fancy-flow`: the ui package
genuinely requires fancy-flow, since it calls `defineConnectorKind`, and marking
that peer optional would be a lie about what it needs.

## [0.1.0] — 2026-08-22

First release. Provider seven, and the first that is not REST.

### Added

- `item_create` — create an item on a board. `POST /v2`, `mutation CreateItem`.
- A faker for it, so the node runs on a canvas with no monday.com account.

### GraphQL is a request encoding, not a spelling of JSON

Every provider before this one puts the operation in the URL. monday.com has
**one endpoint and one method** — `POST /v2` — and the operation lives in a
*document* carried in the body, with config mapping onto that document's
**variables** rather than onto body keys.

The wire format is still JSON. What changes is that the request names its own
operation, and the response comes back wrapped: `{"data": {"create_item": …}}`.
The output paths say so rather than flattening it, because an author who wires
`{{ $json.data.create_item.id }}` against the faker must find the same path when
a real item arrives.

### The document and the config are two halves of one contract

The document is hand-written text. Nothing else in the vocabulary reads it, so
nothing would notice when the two stop agreeing — and every way they can
disagree is invisible until a real call:

| | What happens without the check |
|---|---|
| A declared variable nothing sends | Non-null, so **every** call fails, in the provider's words |
| A config field naming no variable | Built, sent, ignored — the field silently does nothing |
| A non-null variable, optional field | An empty config sends a null the provider refuses |

All three are decidable at definition time, and now are. The reader is a small
scan of the operation's variable block rather than a GraphQL parser, and a
document it cannot read is an **error** — "I could not read it" and "it declares
nothing" must not reach the same answer.

### `column_values` is a JSON STRING, not a map

monday's own schema documents its `JSON` scalar as *"A JSON formatted string"*.
So the variable carries text containing JSON, and sending the map itself puts an
object where monday expects a string. This is the mirror of the trap that forced
`keyvalue` `encoding: "object"` in for Telegram, and the two are one keyword
apart.

### Two facts the wire could not settle

- **`Authorization` takes the token BARE**, with no `Bearer ` prefix. Both
  spellings answer 401 to an invalid token, so a probe cannot tell them apart;
  this came from monday's authentication documentation.
- **`API-Version: 2026-07` is pinned** even though it is optional. Omitting it
  means "whatever is current", which is *undefined* rather than latest — monday
  runs three versions in parallel and the default moves.

### No test estate, and no idempotency

`sandbox` is `none` — **checked**, not assumed. There is one host, one kind of
token, and a developer account is a real account, so anything an action creates
is created for real. The faker is the only safe way to develop against this.

`create_item` takes no idempotency key: monday's schema offers neither a header
nor an argument for one. So it is `unsafe-to-replay` with no way to make it
safe, and a retried durable run creates a **second item**. Saying that plainly
is better than implying a guarantee the API cannot give.

[0.1.0]: https://github.com/Fancy-Friends/monday/releases/tag/v0.1.0
[0.2.0]: https://github.com/Fancy-Friends/monday/releases/tag/v0.2.0
