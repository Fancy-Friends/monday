<?php

declare(strict_types=1);

namespace ParticleAcademy\Monday;

use ParticleAcademy\Connectors\Mode;
use ParticleAcademy\Connectors\PreparedRequest;
use ParticleAcademy\Connectors\SandboxKind;
use ParticleAcademy\Connectors\ServiceDescriptor;

/*
 * GENERATED FILE — do not edit.
 *
 * Emitted from provider/manifest.json by weaver's generator.
 * A hand-edit here is destroyed by the next protocol sync, which is worse than
 * being rejected, because it works until it silently does not. Fix
 * provider/manifest.json (or weaver's template/) and regenerate:
 *
 *     npm run provider -- monday
 */
/**
 * monday.com, as one service descriptor shared by every monday.com operation.
 *
 * The PHP twin of the js package's `src/service.ts`.
 *
 * ## The sandbox trap, written down where it is used
 *
 * monday has no test estate. A developer plan is a real account with real
 * boards, so anything an action creates is created for real. The faker is the
 * only safe way to develop against this connector, which is why every action
 * ships with one.
 */
final class Monday
{
    // The connector API version this package was GENERATED against. A
    // literal, never imported: an imported constant lets an upgrade rewrite
    // the very claim it exists to detect.
    public const CONNECTOR_API_VERSION = 1;

    public const SERVICE = 'monday';

    public const LIVE_URL = 'https://api.monday.com';

    /** @var list<string> Credential keys a remote call cannot proceed without. */
    public const REQUIRES = [
        'apiToken',
    ];

    public static function descriptor(): ServiceDescriptor
    {
        return new ServiceDescriptor(
            service: self::SERVICE,
            title: 'monday.com',
            sandbox: SandboxKind::None,
            baseUrls: [
                Mode::Live->value => self::LIVE_URL,
            ],
            requires: self::REQUIRES,
            authorize: self::authorize(...),
            faker: MondayFaker::respond(...),
        );
    }

    /**
     * Apply monday.com's auth scheme to an outgoing request.
     *
     * BARE, with no `Bearer ` prefix. Both spellings answer 401 to an invalid
     * token, so the wire cannot tell them apart and this had to come from monday's
     * own authentication doc rather than from a probe. A `Bearer ` prefix here
     * would fail every real call with an authentication error that says nothing
     * about the prefix.
     *
     * @param array<string,string> $credentials
     */
    public static function authorize(array $credentials, PreparedRequest $request, Mode $mode): void
    {
        $request->withHeader('API-Version', '2026-07');

        $request->withHeader('Authorization', ''.($credentials['apiToken'] ?? ''));
    }
}
