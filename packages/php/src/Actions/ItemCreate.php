<?php

declare(strict_types=1);

namespace ParticleAcademy\Monday\Actions;

use ParticleAcademy\Monday\Monday;
use ParticleAcademy\Connectors\ConnectorConfigException;

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
 * Create an item on a monday.com board.
 *
 * POST /v2 —
 * https://developer.monday.com/api-reference/reference/items#create-an-item
 *
 * This describes the request. The connector client resolves the connection,
 * picks the estate, and either calls monday.com or calls the faker.
 */
final class ItemCreate
{
    public const OPERATION = 'item_create';
    public const METHOD = 'POST';
    public const PATH = '/v2';
    public const DOCUMENT = <<<'GRAPHQL'
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
        }
        GRAPHQL;
    public const SIDE_EFFECTS = 'unsafe-to-replay';

    /**
     * Build the form body for one call.
     *
     * Validation fails loudly and specifically here, rather than three frames
     * later as an "invalid request" from monday.com.
     *
     * @param array<string,mixed> $config
     * @return array<string,scalar>
     */
    public static function body(array $config): array
    {
        if (($config['boardId'] ?? null) === null || ($config['boardId'] ?? null) === '') {
            throw new ConnectorConfigException('item_create: "boardId" is required (Board ID).');
        }

        if (($config['itemName'] ?? null) === null || ($config['itemName'] ?? null) === '') {
            throw new ConnectorConfigException('item_create: "itemName" is required (Item name).');
        }

        $body = [];

        $value = $config['boardId'] ?? null;
        $body['boardId'] = (string) $value;

        $value = $config['itemName'] ?? null;
        $body['itemName'] = (string) $value;

        $value = $config['groupId'] ?? null;
        if ($value !== null && $value !== '') {
            $body['groupId'] = (string) $value;
        }

        foreach (self::columnvaluesForm($config['columnValues'] ?? null) as $key => $value) {
            $body[$key] = $value;
        }

        return ['query' => self::DOCUMENT, 'variables' => $body];
    }

    /** @return array<string,string> */
    private static function columnvaluesForm(mixed $value): array
    {
        if (! is_array($value)) {
            return [];
        }

        return ['columnValues' => json_encode($value) ?: '{}'];
    }
}
