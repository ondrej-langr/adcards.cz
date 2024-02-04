<?php

namespace PromCMS\App\Enums;

enum CartItemTypes: string
{
    case PRODUCTS = 'products';
    case CARDS = 'cards';
    case PROMO_CODE = 'promo-code';
}