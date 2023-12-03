<?php

namespace PromCMS\Modules\Adcards;

/**
 * Typesafe map of enum field from database
 */
class CardType
{
    public const GOAL_KEEPER = 'goalKeeper';
    public const PLAYER = 'player';
    public const MANAGER = 'manager';

    public static function getAll()
    {
        return [self::PLAYER, self::MANAGER, self::GOAL_KEEPER];
    }

    public static function exists(string $possibleCardType)
    {
        return in_array($possibleCardType, self::getAll());
    }
}