# monday.com

monday.com for [fancy-flow][flow] — as **four imported, versioned packages**, one
per runtime. Not vendored source: a copy cannot be upgraded, and third-party APIs
change.

[flow]: https://github.com/Particle-Academy/fancy-flow

| Runtime | Package | Install |
|---|---|---|
| Authoring surface (every host) | `@particle-academy/monday-ui` | `npm install @particle-academy/monday-ui` |
| Node | `@particle-academy/monday-js` | `npm install @particle-academy/monday-js` |
| PHP 8.4+ | `particle-academy/monday-php` | `composer require particle-academy/monday-php` |
| Python 3.11+ | `fancy-monday` | `pip install fancy-monday` |

The `ui` package is the editor surface and is React on every host — a PHP or
Python project installs it *and* its own runtime package, and never the `js` one.

## What it costs you

One dependency: `@particle-academy/fancy-connector-core` (or
`particle-academy/fancy-connector-core` on Composer), which the `js` and `php`
packages pull in themselves. The Python package has **zero** runtime
dependencies.

**No monday.com SDK.** Plain HTTP, deliberately: a vendor SDK is third-party code
subject to the kit's full approval bar, and one per provider is hundreds of
dependencies nobody is tracking.

## Setting it up

Everything below is generated from `provider/manifest.json`, so it cannot disagree with what the packages do.

### Credentials

A monday.com connection holds 1 value.

Every value here is `account` scope: one per connected account, not one per installation.

| Field | Scope | Secret | Where it comes from |
|---|---|---|---|
| **API token** | per connected account | **secret** | From monday.com: your avatar -> Developers -> My Access Tokens. It carries YOUR permissions and every board you can see, so a personal token grants an automation everything you have. |

### The estate

**monday.com has no test estate, and somebody checked.** Everything this connector does is real. Use the faker to build against it.

> monday has no test estate. A developer plan is a real account with real boards, so anything an action creates is created for real. The faker is the only safe way to develop against this connector, which is why every action ships with one.

## What it can do

### Actions

#### `item_create` — monday.com item

Create an item on a monday.com board.

`POST /v2` · **unsafe to replay** — a retried durable run does it TWICE

| Input | Required | What it is |
|---|---|---|
| `boardId` | yes | The numeric id in the board URL: monday.com/boards/1234567890. |
| `itemName` | yes | What the item is called on the board. |
| `groupId` | no | Which group on the board to create it in. Left empty, monday uses the board's default group. |
| `columnValues` | no | Column id to value, e.g. status -> Done. Which values a column accepts depends on its type. |

## Run it before you have credentials

Every operation ships a **faker**, whether or not monday.com has a sandbox. Set a
node's mode to `fake` and it returns the shape monday.com actually publishes — the
same field names, deterministically — so you can wire the downstream nodes before
touching an account, a key, or a network.

## This repository is generated

`provider/` is the source. Everything under `packages/` is emitted from it and
**must not be hand-edited** — CI regenerates and diffs on every push, and the
next protocol sync destroys anything it finds. See [`AGENTS.md`](AGENTS.md).

## Two namespaces, which do not match on purpose

The repo is `github.com/Fancy-Friends/monday`; the packages publish under
`particle-academy`. Nothing derives one from the other — the names come from
weaver's `friends.json` and nowhere else.

## Licence

MIT.
