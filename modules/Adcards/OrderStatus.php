<?php

namespace PromCMS\Modules\Adcards;

/**
 * Typesafe map of enum field from database
 */
class OrderStatus
{
    // This is for newly created order (which may need to be paid)
    public const CREATED = 'CREATED';
    // This is for when user cancels order
    public const CANCELED = 'CANCELED';
    // This is for when user has paid the order (or has chosen the bank transfer)
    public const PENDING = 'PENDING';
    // This is for when admin changes this manually and accepts the order
    public const CONFIRMED = 'CONFIRMED';
    // This is for when the order is finished
    public const FINISHED = 'FINISHED';
}