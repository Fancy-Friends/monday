<?php

declare(strict_types=1);

namespace ParticleAcademy\Monday\Flow;

use FancyFlow\Attributes\FlowNode;
use FancyFlow\Contracts\NodeExecutor;
use FancyFlow\Runtime\ExecutionContext;
use FancyFlow\Runtime\Port;
use FancyFlow\Runtime\RunEvent;
use ParticleAcademy\Connectors\ConnectorClient;
use ParticleAcademy\Monday\Actions\ItemCreate;
use ParticleAcademy\Monday\Monday;

/*
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
 * monday.com item, run on a fancy-flow-php host.
 *
 * The PHP twin of `mondayItemExecutor` in @particle-academy/monday-js: the
 * same request, built from the node's config by the same `Actions\ItemCreate`
 * a host would call directly, and the same value on `out` — the client's
 * `{data, mode, connection}`.
 *
 * The client resolves the connection and the estate from the config. With
 * nothing configured that is FAKE, so a node dropped on a canvas runs against
 * the faker rather than monday.com. To reach a real estate, pass a
 * `ConnectorClient` that knows the host's connections — or bind one in the
 * container, which resolves the constructor by type.
 */
#[FlowNode(
    name: '@particle-academy/monday_item',
    aliases: [
        'monday_item',
    ],
    category: 'io',
    label: 'monday.com item',
    description: 'Create an item on a monday.com board.',
    inputs: [
        [
            'id' => 'in',
        ],
    ],
    outputs: [
        [
            'id' => 'out',
        ],
    ],
    sideEffects: 'unsafe-to-replay',
    outputShape: [
        [
            'path' => 'data.create_item.id',
            'type' => 'string',
            'description' => 'The new item\'s id.',
        ],
        [
            'path' => 'data.create_item.name',
            'type' => 'string',
            'description' => 'The item\'s name as monday stored it.',
        ],
        [
            'path' => 'data.create_item.url',
            'type' => 'string',
            'description' => 'Link to the item on the board.',
        ],
        [
            'path' => 'data.create_item.created_at',
            'type' => 'string',
            'description' => 'When it was created.',
        ],
    ],
)]
final class ItemExecutor implements NodeExecutor
{
    public function __construct(private readonly ?ConnectorClient $client = null) {}

    public function execute(ExecutionContext $ctx): mixed
    {
        $config = $ctx->config();

        $result = ($this->client ?? new ConnectorClient)->call(
            Monday::descriptor(),
            ItemCreate::OPERATION,
            $config,
            [
                'method' => ItemCreate::METHOD,
                'path' => ItemCreate::PATH,
                'json' => ItemCreate::body($config),
            ],
            $ctx->input('in'),
        );

        $id = is_array($result->data) ? ($result->data['id'] ?? null) : null;
        $ctx->emit(RunEvent::log(
            'info',
            'monday item_create'.(is_scalar($id) ? ' '.$id : '').' ('.$result->mode->value.')',
            $ctx->node->id,
        ));

        return Port::only('out', $result->toArray());
    }
}
