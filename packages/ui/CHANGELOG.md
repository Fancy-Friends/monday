# Changelog

All notable changes to `@particle-academy/monday-ui`, `@particle-academy/monday-js`,
`particle-academy/monday-php` and `fancy-monday`.

The four packages share one version, because they are generated from one
`provider/` definition and a version that meant something different in each
would be a version nobody could reason about.

## [0.3.1] — 2026-08-24

### Fixed

- **`@particle-academy/monday-js` now accepts a RANGE of `@particle-academy/monday-ui`, not one exact version.**

It peer-depended on `@particle-academy/monday-ui` at exactly the release it shipped with. That is the
strict form of the thing the kit's own rule forbids — a first-party sibling gets
a range — and the same block applied the rule correctly to its other two
dependencies. It was this one pair that slipped.

What it cost: ship `@particle-academy/monday-ui` with a fixed help string and every consumer on the
previous `@particle-academy/monday-js` had an **unmet peer**, which npm 7+ errors on. A documentation
patch could not be delivered without a matching runtime release, and a routine
`npm update` that moved the ui package alone broke the install.

The coupling is real and is not being loosened away. The ui package emits the
config schema and the js package implements against it, so a ui that adds a
field to a js that ignores it is silently wrong. But a PATCH is non-additive by
definition and a MINOR is where a field can appear — so `>=0.3.1 <0.4.0` is the
coupling that actually exists rather than the strictest one expressible.

Nothing else changed. `particle-academy/monday-php` and `fancy-monday` are unaffected; neither has an
equivalent edge.

## [0.3.0] — 2026-08-24

### Added

- **The README now says how to SET THIS CONNECTOR UP**, in the package itself.

Until now it explained what the four packages are, what they cost and why the
repo is generated — and said nothing about credentials, scopes, sandboxes or
operations. Somebody who installed it could not learn from it which credentials
a connection needs, where a human GETS them, which scopes to request, or what
the connector can actually do. All of that was already in the definition; the
one document a consumer reads was the one that omitted everything actionable.

The new **Setting it up** section carries:

- every credential, with the text saying where the value comes from, whether it
  is **per installation** or **per connected account**, and whether it is secret;
- the OAuth authorize and token URLs and the exact scopes, verbatim;
- the access-token lifetime, and where refresh tokens ROTATE, the two things a
  host must not do — retry a failed refresh, or refresh concurrently — because a
  replay revokes the entire grant and nothing in the failure says why;
- the estate in this provider's own terms, including the cases where a
  successful-looking run reaches nobody, or reaches the real one;
- every action and trigger with its method, path, inputs, and whether it is safe
  to replay;
- a trigger's provider-side setup, which nobody can derive from anything else.

It is **generated from `provider/manifest.json`**, so it cannot drift from what
the packages do — which is the point at a few hundred providers, where a
hand-written setup section is a few hundred documents going quietly stale.

No code changed. This release exists because a registry and an installing agent
read the PUBLISHED artifact, and the artifact carried the old README.

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
[0.3.0]: https://github.com/Fancy-Friends/monday/releases/tag/v0.3.0
[0.3.1]: https://github.com/Fancy-Friends/monday/releases/tag/v0.3.1
