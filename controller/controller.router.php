<?php

    class Router {
        private $request;
        // private $requests;

        public function __construct($request){
            $request = explode("/",$request);

            $this->request = $request[2];
            // $this->requests = $request;
        }
        public function getView(){
            $view = $this->request;
            // $request = $this->requests;

            switch($view){
                case '':
                case '/':
                case 'home':
                  $pageTitle = "Home";
                    require_once './page/home.php';
                    break;
                case 'add':
                    $pageTitle = "Add";
                    require_once './page/add.php';
                    break;
                case 'view':
                    $pageTitle = "View";
                    require_once './page/view.php';
                    break;
                default:
                    require_once './page/404.php';
                    break;
            }
        }
    }