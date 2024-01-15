<?php

namespace PromCMS\Modules\Adcards;

use DI\Container;
use JetBrains\PhpStorm\ArrayShape;
use PromCMS\Core\Exceptions\EntityNotFoundException;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\LocalizationService;
use PromCMS\Modules\Adcards\Enums\CartItemTypes;

/**
 * Cart implementation that stores data of current cart for current session
 */
class Cart
{
    private Container $container;
    public static array $availableShipping = [
        "dpd" => [
            "title" => "DPD",
            "rate" => 90 // KČ
        ],
        "zasilkovna" => [
            "title" => "Zásilkovna",
            "metadataRequiredFields" => [
                "name",
                "zip"
            ],
            "rate" => 110, // KČ
            "bonusContentAfterSelect" => '@modules:Adcards/partials/pages/cart/shipping/zasilkovna-select.twig'
        ]
    ];
    public static array $availablePaymentMethods = [
        /**  "gopay" => [
         * "title" => "GOPAY"
         * ],*/
        "paypal" => [
            "title" => "Kartou nebo PayPal",
            "details" => [
                "onSelect" => "Pro platbu přes Paypal můžete použít i platební kartu. K platbě Vás vyzveme před dokončením objednávky."
            ]
        ],
        "bank-transfer" => [
            "title" => "Bankovním převodem"
        ]
    ];

    public static array $defaultState = [Enums\CartItemTypes::PRODUCTS->value => []];

    protected array $state;

    public function __construct(Container $container)
    {
        $this->container = $container;
        $this->state = Cart::$defaultState;
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
            // If promo code was not found(or any other error) then we remove it
            $this->deletePromoCode();

            return false;
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

        $this->state[$cartItemTypeProducts][$productId]["count"] += max(1, $addQuantity);
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

    public function removeCard(int $index): bool
    {
        if (empty($this->state[CartItemTypes::CARDS->value][$index])) {
            return false;
        }

        $cardData = $this->state[CartItemTypes::CARDS->value][$index]["data"];

        // Handle image deletion when unsetting
        if (!empty($cardData["playerImagePathname"])) {
            $card = CartCard::fromArray($cardData);

            // Unset player image
            $card->setPlayerImage(null);
            $card->setClubImage(null);
        }

        unset($this->state[CartItemTypes::CARDS->value][$index]);

        $this->state[CartItemTypes::CARDS->value] = array_values($this->state[CartItemTypes::CARDS->value]);

        return true;
    }

    /**
     * @return array<CartCard>
     */
    public function getCards(): array
    {
        return array_map(fn($value) => CartCard::fromArray($value["data"]), $this->state[CartItemTypes::CARDS->value] ?? []);
    }

    public function getCount()
    {
        $count = 0;

        foreach ($this->state as $typeGroupKey => $typeGroup) {

            // Ignore promo codes and other items
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
        $hasCards = !empty($this->state[CartItemTypes::CARDS->value]);

        $productsFromDatabase = (new \Products())
            ->query()
            ->setLanguage($this->container->get(LocalizationService::class)->getCurrentLanguage())
            ->where(["id", "IN", array_keys($productsFromCart)])
            ->getMany();

        foreach ($productsFromDatabase as $product) {
            if (!$hasCards && $product["is_bonus"]) {
                $this->removeProduct($product["id"]);

                continue;
            }

            $productInfoFromCart = $productsFromCart[$product["id"]];
            $result[$product["id"]] = array_merge($productInfoFromCart, [
                // count -> but that is already from state
                "product" => $product,
                "count" => $productInfoFromCart["count"],
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
        $currentLanguage = $this->container->get(LocalizationService::class)->getCurrentLanguage();

        foreach ($this->getProducts() as $productFromCartInfo) {
            $total += $productFromCartInfo["price"]["total"];
        }

        foreach ($this->getCards() as $card) {
            $total += $card->getPrice();

            $size = (new \CardSizes())->query()->setLanguage($currentLanguage)->join(function ($size) use ($currentLanguage) {
                return (new \CardMaterial())->query()->setLanguage($currentLanguage)->getOneById(intval($size['material_id']))->getData();
            }, "material")->select(['material'])->getOneById($card->getSizeId())->getData();
            $materialBonuses = $size['material']['bonuses']['data'];
            $cardBonuses = $card->getBonuses();

            foreach ($materialBonuses as $item) {
                if (!empty($cardBonuses[$item['name']])) {
                    $total += $item['price'];
                }
            }
        }


        if ($applyPromoCode && $promoCode = $this->getPromoCode()) {
            $total = ceil($total - ($total / 100) * (int)$promoCode["amount"]);
        }

        return $total;
    }

    public function getRecommendedProducts()
    {
        // If there are no cards in cart then there are no recommended
        if (empty($this->state[CartItemTypes::CARDS->value])) {
            return [];
        }

        return (new \Products())
            ->query()
            ->setLanguage($this->container->get(LocalizationService::class)->getCurrentLanguage())
            ->where([
                ["is_bonus", "=", true],
                ["id", "NOT IN", array_keys($this->state[CartItemTypes::PRODUCTS->value])]
            ])
            ->limit(3)
            ->getMany();
    }

    public function stateToTemplateVariables()
    {
        $currentLanguage = $this->container->get(LocalizationService::class)->getCurrentLanguage();
        $productsFromCart = $this->getProducts();
        $promoCode = $this->getPromoCode();
        $totalWithoutPromo = $this->getTotal(false);

        return [
            "cart" => [
                "size" => $this->getCount(),
                "cards" => array_map(function (CartCard $item) use ($currentLanguage) {
                    $result = $item->asArray();

                    $result["background"] = (new \CardBackgrounds())
                        ->query()
                        ->setLanguage($currentLanguage)
                        ->getOneById(intval($result["background_id"]))
                        ->getData();

                    $result['size'] = (new \CardSizes())
                        ->query()
                        ->setLanguage($currentLanguage)
                        ->where(["id", "=", intval($result["size_id"])])
                        ->join(function ($size) use ($currentLanguage) {
                            return (new \CardMaterial())->query()
                                ->setLanguage($currentLanguage)
                                ->getOneById(intval($size["material_id"]))
                                ->getData();
                        }, 'material')
                        ->select(['material'])
                        ->getOne()
                        ->getData();

                    $materialBonuses = $result['size']['material']['bonuses']['data'] ?? [];

                    $newBonuses = [];
                    foreach ($materialBonuses as $materialBonus) {
                        if (!empty($result['bonuses'][$materialBonus['name']])) {
                            $newBonuses[] = [
                                'name' => $materialBonus['name'],
                                'value' => $result['bonuses'][$materialBonus['name']],
                                'price' => $materialBonus['price']
                            ];
                        }
                    }
                    $result['bonuses'] = [
                        'data' => $newBonuses
                    ];

                    return $result;
                }, $this->getCards()),
                "products" => $productsFromCart,
                "promoCode" => $promoCode ? [
                    "isset" => true,
                    "value" => $promoCode["code"],
                    "percentage" => $promoCode["amount"],
                ] : [
                    "isset" => false
                ],
                "total" => [
                    // This will be striken through if promocode.isset === true
                    "withoutPromo" => $totalWithoutPromo,
                    // This is always shown
                    "withPromo" => $promoCode ? $this->getTotal(true) : $totalWithoutPromo
                ]
            ],
            "shippingMethods" => Cart::$availableShipping,
            "paymentMethods" => Cart::$availablePaymentMethods,
            "extras" => $this->getRecommendedProducts()
        ];
    }

    public function getState(): array
    {
        return $this->state;
    }

    public function destroyState(): array
    {
        return $this->state = Cart::$defaultState;
    }
}