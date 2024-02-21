<?php

namespace PromCMS\App;

use DI\Container;
use Doctrine\ORM\Query;
use PromCMS\App\Models\CardSizes;
use PromCMS\App\Models\MainPageSlides;
use PromCMS\App\Models\Products;
use PromCMS\App\Models\PromoCodes;
use PromCMS\Core\Database\EntityManager;
use PromCMS\Core\Database\Query\TranslationWalker;
use PromCMS\Core\Exceptions\EntityNotFoundException;
use PromCMS\Core\Services\EntryTypeService;
use PromCMS\Core\Services\LocalizationService;
use PromCMS\App\Enums\CartItemTypes;

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
            "bonusContentAfterSelect" => '@app/partials/pages/cart/shipping/zasilkovna-select.twig'
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
        try {
            $promoCode = $this->container
                ->get(EntityManager::class)
                ->getRepository(PromoCodes::class)
                ->findOneBy([
                    'code' => $promoCodeAsCode
                ]);

            if (!$promoCode) {
                throw new EntityNotFoundException();
            }
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
            $promoCode = $this->container
                ->get(EntityManager::class)
                ->getRepository(PromoCodes::class)
                ->find($this->state[CartItemTypes::PROMO_CODE->value]["id"]);

            if (!$promoCode) {
                throw new EntityNotFoundException();
            }

            $promoCodeFromDatabase = $promoCode->toArray();
        } catch (\Exception $error) {
            // If promo code was not found(or any other error) then we remove it
            $this->deletePromoCode();

            return false;
        }


        return $promoCodeFromDatabase;
    }

    public function appendProduct($productId, $addQuantity = 1): void
    {
        $cartItemTypeProducts = CartItemTypes::PRODUCTS->value;
        $productId = intval($productId);

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
        $productId = intval($productId);

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
        $productId = intval($productId);

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
        $currentLanguage = $this->container->get(LocalizationService::class)->getCurrentLanguage();
        $em = $this->container->get(EntityManager::class);

        $productsFromDatabase = $em->createQueryBuilder()
            ->from(Products::class, 'p')
            ->select('p')
            ->addOrderBy('p.order', 'DESC')
            ->addOrderBy('p.id', 'DESC')
            ->where($em->getExpressionBuilder()->in('p.id', ':ids'))
            ->setParameter(':ids', array_keys($productsFromCart))
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
            ->setHint(TranslationWalker::HINT_LOCALE, $currentLanguage)
            ->getResult();

        /**
         * @type $product Products
         */
        foreach ($productsFromDatabase as $product) {
            // We want to remove bonuses if user does not have any cards - user is not eligible
            if (!$hasCards && $product->getIsBonus()) {
                $this->removeProduct($product->getId());

                continue;
            }

            $productInfoFromCart = $productsFromCart[$product->getId()];
            $result[$product->getId()] = array_merge($productInfoFromCart, [
                // count -> but that is already from state
                "product" => $product,
                "count" => $productInfoFromCart["count"],
                "price" => [
                    "total" => $product->getPrice() * $productInfoFromCart["count"]
                ]
            ]);
        }

        return $result;
    }

    public function getTotal($applyPromoCode = true)
    {
        $total = 0;
        $currentLanguage = $this->container->get(LocalizationService::class)->getCurrentLanguage();
        $em = $this->container->get(EntityManager::class);

        foreach ($this->getProducts() as $productFromCartInfo) {
            $total += $productFromCartInfo["price"]["total"];
        }

        foreach ($this->getCards() as $card) {
            $total += $card->getPrice();

            /**
             * @type $size CardSizes
             */
            $size = $em->createQueryBuilder()
                ->from(CardSizes::class, 's')
                ->select('s')
                ->where($em->getExpressionBuilder()->eq('s.id', ':id'))
                ->setParameter(':id', $card->getSizeId())
                ->getQuery()
                ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
                ->setHint(TranslationWalker::HINT_LOCALE, $currentLanguage)
                ->getSingleResult();

            $bonuses = $size->getMaterial()->getBonuses();
            if ($bonuses && count($bonuses)) {
                $materialBonuses = $bonuses['data'] ?? [];
                $cardBonuses = $card->getBonuses();

                foreach ($materialBonuses as $item) {
                    if (!empty($cardBonuses[$item['name']])) {
                        $total += $item['price'];
                    }
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

        $em = $this->container->get(EntityManager::class);
        $exp = $em->getExpressionBuilder();

        return $em->createQueryBuilder()
            ->from(Products::class, 'p')
            ->where(
                $exp->andX([
                    $exp->eq('p.isBonus', ':isBonus'),
                    $exp->notIn('p.id', ':ids'),
                ]))
            ->setParameter(':isBonus', true)
            ->setParameter(':ids', array_keys($this->state[CartItemTypes::PRODUCTS->value]))
            ->setMaxResults(3)
            ->getQuery()
            ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
            ->setHint(TranslationWalker::HINT_LOCALE, $this->container->get(LocalizationService::class)->getCurrentLanguage())
            ->getResult();
    }

    public function stateToTemplateVariables()
    {
        $currentLanguage = $this->container->get(LocalizationService::class)->getCurrentLanguage();
        $productsFromCart = $this->getProducts();
        $promoCode = $this->getPromoCode();
        $totalWithoutPromo = $this->getTotal(false);
        $em = $this->container->get(EntityManager::class);

        return [
            "cart" => [
                "size" => $this->getCount(),
                "cards" => array_map(function (CartCard $item) use ($currentLanguage, $em) {
                    $result = $item->asArray();

                    $result["background"] = $em->createQueryBuilder()
                        ->from(Products::class, 'p')
                        ->where($em->getExpressionBuilder()->eq('p.id', ':id'))
                        ->setParameter(':id', intval($result["background_id"]))
                        ->getQuery()
                        ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
                        ->setHint(TranslationWalker::HINT_LOCALE, $currentLanguage)
                        ->getSingleResult();

                    $result["size"] = $em->createQueryBuilder()
                        ->from(CardSizes::class, 's')
                        ->where($em->getExpressionBuilder()->eq('s.id', ':id'))
                        ->setParameter(':id', intval($result["size_id"]))
                        ->getQuery()
                        ->setHint(Query::HINT_CUSTOM_OUTPUT_WALKER, TranslationWalker::class)
                        ->setHint(TranslationWalker::HINT_LOCALE, $currentLanguage)
                        ->getSingleResult();


                    $newBonuses = [];
                    $bonuses = $result['size']->getMaterial()->getBonuses();
                    if ($bonuses && count($bonuses)) {
                        $materialBonuses = $bonuses['data'] ?? [];

                        foreach ($materialBonuses as $materialBonus) {
                            if (!empty($result['bonuses'][$materialBonus['name']])) {
                                $newBonuses[] = [
                                    'name' => $materialBonus['name'],
                                    'value' => $result['bonuses'][$materialBonus['name']],
                                    'price' => $materialBonus['price']
                                ];
                            }
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