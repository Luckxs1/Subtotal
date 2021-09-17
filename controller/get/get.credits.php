<?php

    header('Content-type:application/json;charset=utf-8');

    require_once "../controller.db.php";
    require_once "../controller.base.php";
    require_once "../controller.sanitizer.php";

    require_once "../../model/model.credits.php";

    $dbhandler = new DBHandler();
    $creditor = new Credits();

    $mode = Sanitizer::filter('mode','get');
    $error = array();
    $response = array("code" => 0, "message" => "Undefined Mode", "reload" => false);

    $BASE = Utility::getBase(true);

    switch($mode) {
        case "table":
            $creditors = $creditor->getAllCreditor();
            foreach($creditors as $key => $value){
                $id = $creditors[$key]["ID"];
                $fname = $creditors[$key]["Fname"];
                $credit = $creditors[$key]["Credits"];

                $creditors[$key]["action"] = "
                    <buttun href='#!' data-name='$fname' data-target='$id' class='rounded-0 btn-sm btn-success update-category'>Up</buttun> 
                ";
            }

            $response = array("data" => $creditors);
            break;
        case "sum":
            $sum = $creditor->sumRequired();
            foreach($sum as $key => $value){
                $total = $sum[$key]["TOTAL"];

            }


    }

    echo json_encode($response);