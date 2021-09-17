<?php 
    require_once "components/import.php";
    require_once "components/head.php";
  
   
?>

<div class="container">
    <h1 class="display-3">
        Add Page
    </h1>
    <form action="<?= $BASE_DIR ?>controller/post/post.credits.php?mode=add" enctype="multipart/form-data" method="POST" class="ajax-form">
        <input required type="text" name="Fname" class="form-control i-input" placeholder="Name">
        <input required type="text" name="Credits" class="form-control i-input" placeholder="Credit">
        <button type="submit" class="btn btn-primary">Save</button>
    </form>
    
  
</div>

