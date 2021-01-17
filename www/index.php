<?php

use app\router\Router;
use app\models\DbManager;
use app\config\DbConfig;
mb_internal_encoding("UTF-8");

require("../vendor/autoload.php");

/**
 * @param $class
 */
function autoloadFunction($class)
{
    $classname = "../" . preg_replace("/[\\ ]+/", "/", $class) . ".php";
    if (is_readable($classname)) {
        require($classname);
    }
}

spl_autoload_register("autoloadFunction");

session_start();
try {
    DbManager::connect(DbConfig::$host, DbConfig::$username, DbConfig::$pass, DbConfig::$database);
} catch (PDOException $exception) {
   // Router::reroute("error/500");
    var_dump($exception);
}
$router = new Router();
$router->process(array($_SERVER['REQUEST_URI']));