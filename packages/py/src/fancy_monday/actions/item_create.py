# GENERATED FILE — do not edit.
#
# Emitted from provider/actions/item-create.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/actions/item-create.json (or weaver's template/) and regenerate:
#
# npm run provider -- monday

"""Create an item on a monday.com board.

POST /v2 —
https://developer.monday.com/api-reference/reference/items#create-an-item

This describes the request. `call` resolves the connection, picks the
estate, and either calls monday.com or calls the faker.
"""

from __future__ import annotations

from typing import Any

from .._runtime import CallResult, ConnectorConfigError, Mode, call
from ..service import descriptor

OPERATION = "item_create"
METHOD = "POST"
PATH = "/v2"
DOCUMENT = """\
mutation CreateItem($boardId: ID!, $itemName: String!, $groupId: String, $columnValues: JSON) {
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
}"""
SIDE_EFFECTS = "unsafe-to-replay"


def body(config: dict[str, Any]) -> dict[str, Any]:
    """Build the GraphQL request for one call, failing loudly and specifically."""
    if config.get("boardId") is None or config.get("boardId") == "":
        raise ConnectorConfigError(
            "item_create: \"boardId\" is required (Board ID)."
        )

    if config.get("itemName") is None or config.get("itemName") == "":
        raise ConnectorConfigError(
            "item_create: \"itemName\" is required (Item name)."
        )

    out: dict[str, Any] = {}
    _value = config.get("boardId")
    if _value is None or _value == "":
        raise ConnectorConfigError("item_create: \"boardId\" is required.")

    out["boardId"] = str(_value)
    _value = config.get("itemName")
    if _value is None or _value == "":
        raise ConnectorConfigError("item_create: \"itemName\" is required.")

    out["itemName"] = str(_value)
    _value = config.get("groupId")
    if _value is not None and _value != "":
        out["groupId"] = str(_value)
    out.update(_columnvalues_form(config.get("columnValues")))

    return {"query": DOCUMENT, "variables": out}


def item_create(
    config: dict[str, Any],
    *,
    credentials: dict[str, str | None] | None = None,
    mode: Mode = "auto",
    connection_id: str | None = None,
    attempts: int = 3,
) -> CallResult:
    """Create an item on a monday.com board."""
    return call(
        descriptor(),
        operation=OPERATION,
        method=METHOD,
        path=PATH,
        json_body=body(config),
        config=config,
        credentials=credentials,
        mode=mode,
        connection_id=connection_id,
        attempts=attempts,
    )


def _columnvalues_form(value: Any) -> dict[str, str]:
    """`{"order_id": "7"}` -> a JSON string under `columnValues`."""
    if not isinstance(value, dict):
        return {}

    import json

    return {"columnValues": json.dumps(value, separators=(",", ":"))}
