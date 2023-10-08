<?php
// In this file you can tell what this module contains or have here something that should be loaded before your models, routes, ..etc
use PromCMS\Core\Mailer;
use Slim\App;

return function (App $app) {
  // You can access container and other stuff like this
  $container = $app->getContainer();

  $mailer = $container->get(Mailer::class);

  // Special condition - mailtrap does not transfer messages via SSL and thats okay in development
  if (str_contains($_ENV["MAIL_HOST"], "mailtrap")) {
    $mailer->SMTPSecure = false;
  }
};
