<?php

namespace PromCMS\App;

use Doctrine\ORM\Query;
use PromCMS\App\Models\Carts;
use PromCMS\App\Models\Products;
use PromCMS\Core\Database\EntityManager;
use PromCMS\Core\Database\Query\TranslationWalker;

class CartExtras
{
    static EntityManager|null $em;

    private static function getEm()
    {
        $em = static::$em;

        if (!$em) {
            throw new \Exception('Em is not set for CartBonuses');
        }

        return $em;
    }

    static function forOne(Carts $cart, string $language)
    {
        $cartCards = $cart->getCards();
        if (!$cartCards->count()) {
            return [];
        }

        $exp = static::getEm()->getExpressionBuilder();

        $exceptIds = [];
        foreach ($cart->getProducts() as $cartProduct) {
            $exceptIds[] = $cartProduct->getProduct()->getId();
        }

        return static::getEm()
            ->createQueryBuilder()
            ->from(Products::class, 'pr')
            ->select('pr')
            ->where($exp->eq('pr.isBonus', ':isBonus'))
            ->andWhere($exp->notIn('pr.id', ':exceptIds'))
            ->setParameter(':isBonus', true)
            ->setParameter(':exceptIds', $exceptIds)
            ->setMaxResults(3)
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
            ->setHint(TranslationWalker::HINT_LOCALE, $language)
            ->getResult();
    }
}