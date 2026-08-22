# GENERATED FILE — do not edit.
#
# Emitted from provider/manifest.json by weaver's generator.
# A hand-edit here is destroyed by the next protocol sync, which is worse than
# being rejected, because it works until it silently does not. Fix
# provider/manifest.json (or weaver's template/) and regenerate:
#
# npm run provider -- monday

"""monday.com, as one service descriptor shared by every monday.com operation.

The Python twin of the js and php packages' service modules.

## The sandbox trap, written down where it is used

monday has no test estate. A developer plan is a real account with real
boards, so anything an action creates is created for real. The faker is the
only safe way to develop against this connector, which is why every action
ships with one.
"""

from __future__ import annotations

from ._runtime import PreparedRequest, ServiceDescriptor
from .faker import respond

# The connector API version this package was GENERATED against. A literal,
# never imported: an imported constant lets an upgrade rewrite the very claim
# it exists to detect, after which the copy agrees with itself forever.
CONNECTOR_API_VERSION = 1

SERVICE = "monday"
TITLE = "monday.com"
SANDBOX = "none"
BASE_URLS = {
    "live": "https://api.monday.com",
}

"""Credential keys a remote call cannot proceed without."""
REQUIRES = [
    "apiToken",
]


def authorize(
    credentials: dict[str, str | None],
    request: PreparedRequest,
    mode: str,
) -> None:
    """Apply monday.com's auth scheme to an outgoing request.
    
    BARE, with no `Bearer ` prefix. Both spellings answer 401 to an invalid
    token, so the wire cannot tell them apart and this had to come from monday's
    own authentication doc rather than from a probe. A `Bearer ` prefix here
    would fail every real call with an authentication error that says nothing
    about the prefix.
    """
    request.headers["API-Version"] = "2026-07"

    request.headers["Authorization"] = f"{credentials.get('apiToken') or ''}"


def descriptor() -> ServiceDescriptor:
    """The monday.com service, for the Python runtime."""
    return ServiceDescriptor(
        service=SERVICE,
        title=TITLE,
        sandbox=SANDBOX,
        base_urls=BASE_URLS,
        requires=REQUIRES,
        authorize=authorize,
        faker=respond,
        idempotency_header=None,
    )
