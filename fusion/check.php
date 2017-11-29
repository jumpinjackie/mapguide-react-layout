<?php

if(isset($_SESSION['login'])) // 0 - success, logged in
{
    $response = array(
        "status" => 0,
        "data" => array(
            "user" => array(
                "id" => "id",
                "name" => $_SESSION['login']
            )
        )
            );
}
else // otherwise, 1
{
    $response = array(
        "status" => 1
    );
}

echo json_encode($response);

?>