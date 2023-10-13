<?php
// In this file you can tell what this module contains or have here something that should be loaded before your models, routes, ..etc
use PromCMS\Core\Mailer;
use PromCMS\Core\Services\RenderingService;
use Slim\App;

/**
 * Cart implementation that stores data of current cart for current session
 */
class Cart
{
    public static array $defaultState = ['products' => []];
    protected array $state;

    public function __construct(array|null $initialState = null)
    {
        $this->state = $initialState ?? Cart::$defaultState;
    }

    public function setState(array $nextState)
    {
        $this->state = $nextState;
    }

    public function addItem($type, $value, $addQuantity = 1)
    {
        if (!isset($this->state[$type])) {
            $this->state[$type] = [];
        }

        if (!isset($this->state[$type][$value])) {
            $this->state[$type][$value] = ["count" => 0];
        }

        $this->state[$type][$value]["count"] += $addQuantity;
    }

    public function getCount()
    {
        $count = 0;

        foreach ($this->state as $typeGroup) {
            foreach ($typeGroup as $item) {
                $count += $item["count"];
            }
        }

        return $count;
    }

    public function getState()
    {
        return $this->state;
    }
}

return function (App $app) {
    /**
     * @var DI\Container;
     */
    $container = $app->getContainer();
    $mailer = $container->get(Mailer::class);
    $rendering = $container->get(RenderingService::class);


    // Special condition - mailtrap does not transfer messages via SSL and thats okay in development
    if (str_contains($_ENV['MAIL_HOST'], 'mailtrap')) {
        $mailer->SMTPSecure = false;
    }

    $container->set(Cart::class, new Cart());

    $adcardsMiddleware = function ($request, $handler) use ($rendering, $container) {
        $session = $container->get('session');
        $cartFromSession = $container->get(Cart::class);

        // Load cart items from session into Cart class instance
        $cartFromSession->setState($session->get('cart', Cart::$defaultState));
        // Add cart state into each template (at least to those that render page components, since this variable is only added on request)
        $rendering->getEnvironment()->addGlobal('cartSize', $cartFromSession->getCount());

        // Handle request or run different middleware
        $response = $handler->handle($request);

        $session->set("cart", $cartFromSession->getState());

        return $response;
    };

    $app->add($adcardsMiddleware);
};
