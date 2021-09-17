<?php 
    require_once "./components/import.php";
    require_once "./components/head.php";

?>
        <link rel="stylesheet" type="text/css" href="<?= $BASE ?>library/DataTables/datatables.min.css"/>
        <script type="text/javascript" src="<?= $BASE ?>library/DataTables/datatables.min.js"></script>
<div class="container">
    <h1 class="display-3">
       View Page
    </h1>
    <div>
        <table class="table table-stiped data-table dt-responsive noewrap rounded lh-1" id="dataTable">
            <thead>
                <tr>
                    <th scope="col">ID</th>
                    <th scope="col">Name</th>
                    <th scope="col">Credits</th>
                    <th scope="col">Action</th>
                </tr>
            </thead>
        </table>
        <table class="table table-stiped data-table dt-responsive noewrap rounded lh-1" id="totalsum">
            <thead>
                <tr>
                    <th scope="col">TOTAL</th>
                </tr>
            </thead>
        </table>
    </div>
 
</div>


<script>
    $(function() {
        creditsTable();
        sumTable();
    })

        function creditsTable() {
            $('#dataTable').DataTable({
                "bLengthChange": false,
                "pageLength": 50,
                "lengthMenu": [[10,25,50,-1],[10,25,50, "ALL"]],
                "ajax" : root + "controller/get/get.credits.php?mode=table",
                "columns" : [
                    {"data" : "ID"},
                    {"data" : "Fname"},
                    {"data" : "Credits"},
                    {"data" : "action"},
                    
                ]
            });

        }
</script>