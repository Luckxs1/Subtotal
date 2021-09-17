$(function(){
    productTable();
    productTableFilter();
})

function productTable() {
    $('#dataTable').DataTable({
        "bLengthChange": false,
        "pageLength": 50,
        "lengthMenu": [[10, 25, 50, -1], [10, 25, 50, "All"]],
        "ajax" : root + "app/controller/get/get.product.php?mode=table",        
        "columns" : [
            { "data" : "product_name"},
            { "data" : "brand_name"},
            { "data" : "category_name"},
            { "data" : "action"},
        ]
    });
    
}

function productTableFilter(){

    
    if($('#searchTable').val() !== ''){
        $('#dataTable').DataTable().search($('#searchTable').val()).draw();
    }
    
    $('#searchTable, #searchTableNav').keyup(function(){
        $('#dataTable').DataTable().search($(this).val()).draw();
    })
    
    $('#brand_id').on('change', function(){

        var $filterCount = $('#filterCount');
        var filterCount = 0;

        if (resetFilter($(this).val())) { 
            $('#category_id').prop('selectedIndex',0);
            $filterCount.text('0');
            return 
        }

        var search = $(this).find('option:selected').text();
        var stack = $('#category_id');

        if(!resetFilter(stack.val(), false)) { 
            filterCount++;
            search = search + " " + stack.find('option:selected').text(); 
        }
        filterCount++;
        $('#dataTable').DataTable().search(search).draw();
        
        $filterCount.text(filterCount);
    })

    $('#category_id').on('change', function(){

        var $filterCount = $('#filterCount');
        var filterCount = 0;

        if (resetFilter($(this).val())) { 
            $filterCount.text('0');
            $('#brand_id').prop('selectedIndex',0); 
            return 
        }

        var search = $(this).find('option:selected').text();
        var stack = $('#brand_id');
        
        if(!resetFilter(stack.val(), false)) { 
            filterCount++;
            search = search + " " + stack.find('option:selected').text(); 
        }

        $('#dataTable').DataTable().search(search).draw();
        filterCount++;
        $filterCount.text(filterCount);

    })
}

function resetFilter(i, filter = true) {
    if(i == 'reset-filter' || i == '0' || i == null) {
        if(filter) {
            $('#dataTable').DataTable()
            .search('')
            .draw();
        }
        return true
    }
    return false
}

function clearFilter(){
    $('#dataTable').DataTable()
    .search('')
    .draw();
    $('#filterCount').text(0);
}