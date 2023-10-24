<?php

namespace PromCMS\Modules\Adcards;

use PromCMS\Core\Exceptions\EntityNotFoundException;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Modules\Adcards\Enums\CartItemTypes;

/**
 * Cart implementation that stores data of current cart for current session
 */
class Cart
{
    public static array $availableShipping = [
        "choices" => [
            "dpd" => [
                "title" => "DPD",
                "rate" => 90 // KČ
            ],
            "zasilkovna" => [
                "title" => "Zásilkovna",
                "metadataRequiredFields" => ["name", "zip"],
                "rate" => 110, // KČ
                "bonusContentAfterSelect" => '@modules:Adcards/partials/pages/cart/shipping/zasilkovna-select.twig'
            ]
        ],
    ];
    public static array $availablePaymentMethods = [
        "gopay" => [
            "title" => "GOPAY"
        ],
        "bank-transfer" => [
            "title" => "Bankovním převodem"
        ]
    ];

    public static array $defaultState = [Enums\CartItemTypes::PRODUCTS->value => []];
    protected array $state;

    public function __construct(array|null $initialState = null)
    {
        $this->state = $initialState ?? Cart::$defaultState;
    }

    public function setState(array $nextState): void
    {
        $this->state = $nextState;
    }

    public function setPromoCode(string $promoCodeAsCode): bool
    {
        $promoCodeService = new \PromCMS\Core\Services\EntryTypeService(new \PromoCodes());

        try {
            $promoCode = $promoCodeService->getOne(["code", "=", $promoCodeAsCode]);
        } catch (\Exception $error) {
            if ($error instanceof EntityNotFoundException) {
                return false;
            }

            throw $error;
        }

        $state = $this->state;

        $state[CartItemTypes::PROMO_CODE->value] = [
            "id" => $promoCode->id,
        ];

        $this->state = $state;

        return true;
    }

    public function deletePromoCode(): void
    {
        if (isset($this->state[CartItemTypes::PROMO_CODE->value]["id"]) === false) {
            return;
        }

        $state = $this->state;

        unset($state[CartItemTypes::PROMO_CODE->value]);

        $this->state = $state;
    }

    public function getPromoCode(): false|array
    {
        if (isset($this->state[CartItemTypes::PROMO_CODE->value]["id"]) === false) {
            return false;
        }

        try {
            $promoCodeFromDatabase = (new EntryTypeService(new \PromoCodes()))->getOne([
                "id", "=", $this->state[CartItemTypes::PROMO_CODE->value]["id"]
            ]);
        } catch (\Exception $error) {
            if ($error instanceof EntityNotFoundException) {
                return false;
            }

            // Other error in which case we want it to crash...
            throw $error;
        }


        return $promoCodeFromDatabase->getData();
    }

    public function appendProduct($productId, $addQuantity = 1): void
    {
        $cartItemTypeProducts = CartItemTypes::PRODUCTS->value;

        if (!isset($this->state[$cartItemTypeProducts])) {
            $this->state[$cartItemTypeProducts] = [];
        }

        if (!isset($this->state[$cartItemTypeProducts][$productId])) {
            $this->state[$cartItemTypeProducts][$productId] = ["count" => 0];
        }

        $this->state[$cartItemTypeProducts][$productId]["count"] += $addQuantity;
    }

    public function changeProductQuantity($productId, int $toQuantity): void
    {
        if (!isset($this->state[CartItemTypes::PRODUCTS->value])) {
            return;
        }

        if (!isset($this->state[CartItemTypes::PRODUCTS->value][$productId])) {
            return;
        }

        $this->state[CartItemTypes::PRODUCTS->value][$productId]["count"] = max($toQuantity, 1);
    }

    public function removeProduct($productId): void
    {
        if (!isset($this->state[CartItemTypes::PRODUCTS->value])) {
            return;
        }

        if (!isset($this->state[CartItemTypes::PRODUCTS->value][$productId])) {
            return;
        }

        unset($this->state[CartItemTypes::PRODUCTS->value][$productId]);
    }

    public function appendCard(CartCard $card): void
    {
        $cartItemTypeCard = CartItemTypes::CARDS->value;

        if (!isset($this->state[$cartItemTypeCard])) {
            $this->state[$cartItemTypeCard] = [];
        }

        $this->state[$cartItemTypeCard][] = [
            "count" => 1,
            "data" => $card->asArray()
        ];
    }

    public function getCards(): array
    {
        return array_map(fn($value) => CartCard::fromArray($value["data"]), $this->state[CartItemTypes::CARDS->value]);
    }

    public function getCount()
    {
        $count = 0;

        foreach ($this->state as $typeGroupKey => $typeGroup) {

            // Ignore promo codes
            if ($typeGroupKey == CartItemTypes::PROMO_CODE->value) {
                continue;
            }

            foreach ($typeGroup as $item) {
                $count += $item["count"];
            }
        }

        return $count;
    }

    public function getProducts(): array
    {
        $result = [];
        $productsFromCart = $this->state[CartItemTypes::PRODUCTS->value];

        $productsFromDatabase = (new \PromCMS\Core\Services\EntryTypeService(new \Products()))->getMany([
            ["id", "IN", array_keys($productsFromCart)]
        ], 1, 999);

        foreach ($productsFromDatabase["data"] as $product) {
            $productInfoFromCart = $productsFromCart[$product["id"]];
            $result[$product["id"]] = array_merge($productInfoFromCart, [
                // count -> but that is already from state
                "data" => $product,
                "price" => [
                    "total" => $product["price"] * $productInfoFromCart["count"]
                ]
            ]);
        }

        return $result;
    }

    public function getTotal($applyPromoCode = true)
    {
        $total = 0;

        foreach ($this->getProducts() as $productId => $productFromCartInfo) {
            $total += $productFromCartInfo["price"]["total"];
        }

        foreach ($this->getCards() as $card) {
            $total += $productFromCartInfo["price"]["total"];
        }

        if ($applyPromoCode && $promoCode = $this->getPromoCode()) {
            $total = $total - ($total / 100) * (int)$promoCode["amount"];
        }

        return $total;
    }

    public function getState(): array
    {
        return $this->state;
    }
}