<?php

declare(strict_types=1);

use ParticleAcademy\Monday\MondayFaker;
use ParticleAcademy\Connectors\FakeValues;

/*
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
 * The golden fixtures — the SAME values the TypeScript and Python packages
 * assert.
 *
 * Bit-for-bit identical is the claim, and this is what checks it.
 * Cross-runtime drift does not fail loudly on its own: it completes, down one
 * path, with no error.
 */

it('item_create fakes the shape monday.com publishes', function () {
    $config = [];
    $fake = new FakeValues(FakeValues::seedForCall('monday', 'item_create', $config));

    $faked = MondayFaker::respond('item_create', ['config' => $config, 'fake' => $fake]);

    expect($faked)->toBe([
        'data' => [
            'create_item' => [
                'id' => '6278569463',
                'name' => 'New item',
                'url' => 'https://example.monday.com/boards/1234567890/pulses/1234567890',
                'created_at' => '2026-01-01T00:00:00Z',
            ],
        ],
    ]);
});

it('throws for an operation with no fixture rather than inventing a shape', function () {
    $fake = new FakeValues(FakeValues::seedForCall('monday', 'no_such_operation', []));

    expect(fn () => MondayFaker::respond('no_such_operation', ['config' => [], 'fake' => $fake]))
        ->toThrow(InvalidArgumentException::class);
});
