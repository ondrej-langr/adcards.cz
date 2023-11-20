<?php

namespace PromCMS\Modules\Adcards\CartCard;

class PlayerOrGoalKeeperStats
{
    static array $DEFAULT_VALUES = [
        'player' =>
            [
                [
                    'name' => 'pac',
                    'value' => 99,
                ],
                [
                    'name' => 'dri',
                    'value' => 99,
                ],
                [
                    'name' => 'sho',
                    'value' => 99,
                ],
                [
                    'name' => 'def',
                    'value' => 99,
                ],
                [
                    'name' => 'pas',
                    'value' => 99,
                ],
                [
                    'name' => 'phy',
                    'value' => 99,
                ],
            ],
        'goalKeeper' =>
            [
                [
                    'name' => 'div',
                    'value' => 99,
                ],
                [
                    'name' => 'ref',
                    'value' => 99,
                ],
                [
                    'name' => 'han',
                    'value' => 99,
                ],
                [
                    'name' => 'spe',
                    'value' => 99,
                ],
                [
                    'name' => 'kic',
                    'value' => 99,
                ],
                [
                    'name' => 'pos',
                    'value' => 99,
                ],
            ]
    ];

    private array $value;

    public function __construct(array $value)
    {
        // Each row should have name and value
        $value = array_filter($value, fn($row) => !empty($row['name']) && !empty($row['value']));

        if (empty($value)) {
            throw new \Exception("Prázdné vlastnostni hráče");
        }

        $this->value = $value;
    }

    public function asArray()
    {
        return $this->value;
    }
}