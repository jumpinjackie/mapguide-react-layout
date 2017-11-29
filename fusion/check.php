<?php

session_start();
if($_SESSION['authorized']<>1) // 1 - is not logged in
{
    $response = array(
        "status" => 1
    );
}
else { // otherwise, 0
    $response = array(
        "status" => 0,
        "data" => array(
            "user" => array(
                "id" => "id",
                "name" => $_SESSION['login'],
                "role" => "admin"
            ),
        )
            );
}


echo json_encode($response);

?>