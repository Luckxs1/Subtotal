<?php

class Utility {

    public static function getBase($http = true){
        if(!$http) {
            return '/Subtotal_1/';
        }
            return 'http://localhost/Subtotal_1/';
    }
    
}