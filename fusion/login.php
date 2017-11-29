<?php

$setlogin = "demo";
$setpass = "demo";


if(isset($_POST["LOGIN"]))
    $login = ($_POST["LOGIN"]);
if(isset($_POST["PASS"]))
    $pass = ($_POST["PASS"]);

session_start();
if($_SESSION['authorized'] == 1){
    $response = array(
        "status" => "0",
        "message" =>  "already authorized",
        "data" => array(
            "user" => array(
                "login" => $_SESSION['login'],
                "role" => "admin"
                )
        )
    );
}
else if($login==$setlogin && $pass==$setpass)
{
    $_SESSION['authorized'] = 1;
    $_SESSION['login'] = $login;
    $response = array(
        "status" => "0",
        "message" =>  "logged in",
        "data" => array(
            "user" => array(
                "login" => $login,
                "role" => "admin"
                )
        )
    );
}
else
{
    $_SESSION['authorized'] = 0;
    $response = array(
        "status" => 1
    );
}

header("Content-type: application/json");

echo json_encode($response);

?>