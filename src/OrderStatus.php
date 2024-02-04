<?php

namespace PromCMS\App;

/**
 * Typesafe map of enum field from database
 */
class OrderStatus
{
    // This is for newly created order (which may need to be paid)
    public const CREATED = 'vytvořeno';
    // This is for when user cancels order
    public const CANCELED = 'zrušeno';
    // This is for when user has paid the order (or has chosen the bank transfer)
    public const PENDING = 'nepotvrzeno';
    public const UNPAID = 'nezaplaceno';
    // This is for when admin changes this manually and accepts the order
    public const CONFIRMED = 'potvrzeno';
    // This is for when the order is finished
    public const FINISHED = 'dokončeno';
}