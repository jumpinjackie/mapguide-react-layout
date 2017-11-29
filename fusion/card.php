<?php

//$_GET; // getCardById, getCardTypes, getFeatureTypes, getFeatureData

//$_POST; // createCard, setFeatureData, assignCardToGeolayer, createCardType, createFeature, assignFeatureToCardType

session_start();

if($_SESSION['authorized']<>1){
    echo array(
        "status" => "1",
        "message" => "unauthorized"
    );
    exit;
}

if(isset($_GET)){
    $action = $_GET["ACTION"];
    echo $action;
    switch($action){
        case "getCardById": getCardById(); break;
        case "getCardTypes": getCardTypes(); break;
        case "getFeatureTypes": getFeatureTypes(); break;
        case "getFeature": getFeature(); break;
    }
}
else if(isset($_POST)){
    $action = $_POST["ACTION"];
    switch($action){
        case "createCard": createCard(); break;
        case "setFeatureData": setFeatureData(); break;
        case "assignCardToGeolayer": assignCardToGeolayer(); break;
        case "createCardType": createCardType(); break;
        case "createFeature": createFeature(); break;
        case "assignFeatureToCardType": assignFeatureToCardType(); break;
    }
}

/* args: cardId
return: {
     cardId,
     cardName,
     ...,
    featuresData
}
    */
function getCardById()
{
    $id = $_GET["cardId"];
    echo array(
        "cardId" => $id,
        "cardName" => "тестовое имя"
    );
}
/* return: [cardtypes]
*/
function getCardTypes()
{
    
}

/*return: [featureTypes]
*/
function getFeatureTypes()
{
    
}

/* args: featureId,
return: featureValue
*/
function getFeature()
{
    
}

/* args: cardType [, geolayerId, featuresData]),
return: cardId
*/

function createCard()
{
    
}

/* args: cardId, [{featureId: featureValue}]
return: status: ok-ne ok
*/

function setFeatureData()
{
    
}

/* args: cardId, geolayerId
return: status: ok - ne ok

*/

function assignCardToGeolayer()
{
    
}

/*args: featureDomains = [{featureType, name}]
return: cardTypeId
*/

function createCardType()
{
    
}

/*args: featureTypeId, values[, cardId]
return: featureId
*/

function createFeature()
{
    
}
/*args: featureId, cardTypeId
return: status: ok - ne ok
*/
function assignFeatureToCardType()
{
    
}


?>