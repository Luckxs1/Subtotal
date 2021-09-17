<?php

    require_once "../controller.base.php";
    require_once "../controller.db.php";
    require_once "../controller.router.php";
    require_once "../controller.sanitizer.php";
    require_once "../../model/model.credits.php";

    $dbhandler = new DBHandler();
    $creditstb = new Credits();

    $mode = Sanitizer::filter('mode','get');
    $errors = array();
    $response = array("code" => 0, "message" => "Undefined Mode", "callback" => '#dataTable');

    $BASE =Utility::getBase(true);

    switch($mode) {
        case "add":
            $Fname = Sanitizer::filter('Fname','post');
            $Credits = Sanitizer::filter('Credits','post');
            $creditstb->addCreditor($Fname,$Credits);
            $response = array("code" => 1, "message" => "Creditor Added","callback"=>'#dataTable');
            break;
        case "update":
            $Fname = Sanitizer::filter('Fname','post');
            $id = Sanitizer::filter('target','get');
            $creditstb->updateCreditor($Fname,$id);
            $response = array("code" => 1, "message" => "Creditor Updated","callback"=>'#dataTable');
            break;
        default:
            break;
    }

    echo json_encode($response);