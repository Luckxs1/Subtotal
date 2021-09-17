$(function(){

    root =  "http://localhost/Subtotal/"
    console.log(root);
    $('[data-toggle="tooltip"]').tooltip()
    ajaxForm();
    dataDelete();
    fileTiles();
    sidebar();
    bookMark();
    floatingNav();

})

function fileTiles(){
    $('.file-tile').each(function(){
        $(this).css({
            'height' : $(this).outerWidth()
        })
    })
}

function loading(){
    $('#loading').fadeToggle();
}

function ajaxForm(){

    $('.ajax-form').on('submit', function(event){

        event.preventDefault();
        window.onbeforeunload = function() {
            return "Are you sure you want to navigate away from this page?";
        };
        var $inputs = $(this).find("input, select, button, textarea");
        var action = $(this).attr("action");
        var type = $(this).attr("method");
        var formData = new FormData(this);

        $inputs.prop("disabled", true);

        loading();

        $.ajax({
            url: action,
            type: type,
            data: formData,
            processData: false,
            contentType: false,
            success: function(data) { 
                window.onbeforeunload = null;
                $inputs.prop("disabled", false);
                toaster(data);
                loading();
                $('.modal').modal('hide');
            }
        })
    })
}


function dataDelete(){
    $('body').on('click', '.data-Delete', function(){
        var type = $(this).data('type');
        var target = $(this).data('target');
        
        if(!confirm('Delete this ' + type +'?')){ return }

        loading();

        $.ajax({
            url: root + 'controller/delete/delete.php?mode='+type+'&t='+target,
            type: 'GET',
            processData: false,
            contentType: false,
            success: function(data) { 
                loading();
                toaster(data);
                $('.modal').modal('hide');
            }
        })
    })
}

function toaster(data) {
    var parsedData = JSON.parse(data);
    switch(parsedData.code) {
        case 0:
            mdtoast(parsedData.message, { duration: 1500, type: mdtoast.ERROR }); 
            break;
            //datatable callback
        case 5:
            mdtoast(parsedData.message, { duration: 1500 });
            $(parsedData.callback).DataTable().ajax.reload();
            break;
        case 4:
            mdtoast(parsedData.message, { duration: 1500 });
            $(parsedData.callback).click()
            break;
        case 1:
            if(parsedData.reload == true) {
                if(parsedData.path == 'reload') {
                    window.location.reload();
                    return
                }
                mdtoast(parsedData.message, { 
                    duration: 1500, 
                    interaction: true, actionText: parsedData.toastaction, 
                    action: function(){
                        window.location.href = root + parsedData.path;
                        return
                    }
                }); 
                setTimeout(function(){
                    window.location.href = root + parsedData.path;
                }, 5000)
                return
            }
            mdtoast(parsedData.message, { duration: 1500 }); 
            break;
        default:
            mdtoast(parsedData.message, { duration: 1500 }); 
            return
    }
}


function sidebar() {
    $('.nav-trigger, .overlay').on('click', function(){
        $('.sidebar').toggleClass('active');
        $('.overlay').fadeToggle();
    })
}

function bookMark(){
    $('.add-to-book').on('click', function(){
        var text = $(this).text();
        $(this).text( text == "Add to bookmarks" ? "Remove bookmark" : "Add to bookmarks" );
        $(this).toggleClass('btn-danger');

        var mode = $(this).attr('data-mode');
        var target = $(this).attr('data-target');
        var type = '';
        switch(mode){
            case "add":
                type = "add-bookmark";
                break;
            case "remove":
                type = "remove-bookmark";
                break;
        }

        loading();
        $.ajax({
            url: root + 'app/controller/delete/delete.php?mode='+type+"&t="+target,
            type: 'GET',
            processData: false,
            contentType: false,
            success: function(data) { 
                loading();
                console.log(data);
            }
        })

        $(this).attr('data-mode', mode == "add" ? "remove" : "add");


    })
}


function floatingNav(){
    var timer = $('body'), el = $('nav.navbar.navbar-expand-md.fixed-top.bg-white');
        flag = false;
    $(window).scroll(function() {
        if (!flag) {
            flag = true;
            el.toggleClass('shadow');
        }
        clearTimeout(timer);
        timer = setTimeout(function() {
            el.removeClass('shadow');
            flag = false;
        }, 200);
    });
}