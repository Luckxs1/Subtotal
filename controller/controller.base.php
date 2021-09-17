<?php

class Utility {

    public static function getBase($http = true){
        if(!$http) {
            return '/Subtotal/';
        }
            return 'http://localhost/Subtotal/';
    }
    
}