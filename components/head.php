<!DOCTYPE html>
<html lang="en">
    <head>
        <meta charset="utf-8">
        <meta name="Author" content="Lucky Yunque">
        <meta name="viewport" content="width=device-width, initial-scale=1">

        <title><?= isset($pageTitle) ? $pageTitle : "404 - Page Not Found"; ?></title>

        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" type="text/css" rel="stylesheet">    
        <link href="https://fonts.googleapis.com/css2?family=Chivo:wght@400;700&display=swap" type="text/css" rel="stylesheet">
        

        <link rel="stylesheet" type="text/css" href="<?= $BASE ?>library/bootstrap/css/bootstrap.min.css">
        <link rel="stylesheet" type="text/css" href="<?= $BASE ?>library/mdtoast/mdtoast.min.css">
        <link rel="stylesheet" type="text/css" href="<?= $BASE ?>library/main.css">

        <link rel="shortcut icon" href="favicon.ico">

        <script src="https://cdn.jsdelivr.net/npm/popper.js@1.16.1/dist/umd/popper.min.js" integrity="
        sha384-9/reFTGAW83EW2RDu2S0VKaIzap3H66lZH81PoYlFhbGU+6BZp6G7niu735Sk7lN" crossorigin="anonymous"></script>
        <script src="<?= $BASE ?>library/jquery.js"></script>
        <script src="<?= $BASE ?>library/bootstrap/js/bootstrap.min.js"></script>
        <script src="<?= $BASE ?>library/mdtoast/mdtoast.min.js"></script>
        <script src="<?= $BASE ?>library/main.js"></script>


   </head>
<body>
<?php 
require_once 'import.php';
?>
<div class="container">
<a href="<?= $BASE ?>">Home</a>
&nbsp;
<a href="<?= $BASE ?>add">Add</a>
&nbsp;
<a href="<?= $BASE ?>view">View</a>

</div>

