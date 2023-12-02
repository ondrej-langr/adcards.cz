<?php

use PromCMS\Core\Path;

include_once __DIR__ . '/../vendor/autoload.php';

// ini_set("zlib.output_compression", 1);
// ob_start("ob_gzhandler");

$app = new \PromCMS\Core\App(Path::join(__DIR__, '..'));

$app->init();

$app->run();
