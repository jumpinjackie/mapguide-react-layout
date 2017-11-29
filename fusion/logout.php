<?php

//$_SESSION = array();
session_start();
$was = session_status();
session_destroy();
$_SESSION['authorized']=0;
echo json_encode(array(
    "status" => 0
));

?>