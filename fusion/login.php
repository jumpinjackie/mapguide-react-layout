<?php

$setlogin = "demo";
$setpass = "demo";


if(isset($_POST["login"]))
    $login = ($_POST["login"]);
if(isset($_POST["pass"]))
    $pass = ($_POST["pass"]);



if(isset($_SESSION['session']) || ($login==$setlogin && $pass==$setpass))
{
    $hsh = get_session_hash($login, $pass);
    $_SESSION['session'] = $hsh;
    $_SESSION['login'] = $login;
    $response = array(
        "status" => 0,
        "data" => array(
            "user" => $login
        )
    );
}
else $response = array(
    "status" => 1
);

header("Content-type: application/json");

echo json_encode($response);

function get_session_hash($usr, $p)
{
    // echo "test";
    return hash("md5", $usr.$p.time());
}

?>