$(function(){
    richText();
    imageArea();
    tabCallbacks();
})

function imageArea() {

    $('#form').on('click', '.image-area', function(){
        $target = $('#'+$(this).data('target'));
        $target.click();
    })

    $('#form').on('change', '.image-input', function(){
        previewImage(this, $(this).data('target'))
    })

    $('#form').on('change', '.file-input', function(){
        var fullPath = $(this).val();
        var $target = $('#'+$(this).data('target'));
        if (fullPath) {
            var startIndex = (fullPath.indexOf('\\') >= 0 ? fullPath.lastIndexOf('\\') : fullPath.lastIndexOf('/'));
            var filename = fullPath.substring(startIndex);
            if (filename.indexOf('\\') === 0 || filename.indexOf('/') === 0) {
                filename = filename.substring(1);
            }
            $target.text(filename);
        }
    })

}

function multiImages() {

    var uniqid = Date.now();
    var uniqid_b = uniqid+"em";

    var $cloned = $('.clone').clone();
    $cloned.removeClass('clone')
        .addClass('cloned')
        .find('.image-area')
        .attr('data-target', uniqid)
        .end()
        .find('input').val('')
        .attr({'id':uniqid, 'data-target':uniqid_b})
        .end()
        .find('img').attr({'src':'', 'id':uniqid_b})
        .end();

    $('#images').append($cloned);
    $('[data-toggle="tooltip"]').tooltip()
}

function multiDocs() {
    var uniqid = Date.now();
    var uniqid_b = uniqid+"em";

    var $cloned = $('.clone-doc').clone();
    $cloned.removeClass('clone-doc')
        .addClass('cloned-doc')
        .find('.image-area')
        .attr('data-target', uniqid)
        .end()
        .find('input').val('')
        .attr({'id':uniqid, 'data-target':uniqid_b})
        .end()
        .find('p').text('empty').attr({'id':uniqid_b})
        .end();
        $('#docs').append($cloned);
        $('[data-toggle="tooltip"]').tooltip()
}

function removeImage(){
    $('.cloned').last().remove()
}

function removeDocs(){
    $('.cloned-doc').last().remove()
}


function richText(){
    $('.richtext').richText({
        ol: true,
        ul: true,
        heading: true,
        fonts: true,
        fontList: ["Arial"],
        fontColor: false,
        fontSize: false,
        videoEmbed: false,
        code: false,
        fileHTML: '',
        imageHTML: '',
        id: "",
        class: "",
        useParagraph: true,

    });
}

function previewImage(input, target) {
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            $('#'+target).attr('src', e.target.result);
        }
        reader.readAsDataURL(input.files[0]);
    }
}


/* validate pattern regex */
$(document).on('keydown', 'input[pattern]', function(e){
    var input = $(this);
    var oldVal = input.val();
    var regex = new RegExp(input.attr('pattern'), 'g');

    setTimeout(function(){
        var newVal = input.val();
        if(!regex.test(newVal)){
        input.val(oldVal); 
        }
    }, 0);
});

function tabCallbacks(){
    $('.nav-tabs').find('a').on('show.bs.tab', function (e) {    
        
        var $previousTab = $(e.relatedTarget);
        var count = 0;
        
        $inputs = $($previousTab.attr("href")).find("input[required]");
        
        $.each($inputs, function(index){
            if($(this).val().trim() == ''){ count++ }
        })

        $previousTab.find('.tab-error').remove();
        $previousTab.find('.tab-warning').remove();
        if(count > 0) {
            $previousTab.prepend("<span class='tab-error'>"+count+"</span>"); 
            $previousTab.find('.tab-error').attr({'data-toggle':'tooltip','data-placement':'right','title':'* please fill up '+count+' required field(s)'});
        }
        $('[data-toggle="tooltip"]').tooltip()
        return

    });

    $('.nav-tabs').find('a').on('shown.bs.tab', function () { 
        var hasempty = true;
        $.each($('input[required]'), function(){
            if($(this).val().trim() == '') {
                hasempty = true;
                return false;
            }
            hasempty = false
            
        })

        if(hasempty){ 
            $('.alert-danger').show();
            $('.alert-success').hide();
            $('button[type=submit]').hide();
            return
        }
        
        $('.alert-danger').hide();
        $('.alert-success').show();
        $('button[type=submit]').show();

    })

    $('.tab-next').on('click', function(){
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('.nav-tabs > .active').next('a').trigger('click');            
    })
    $('.tab-prev').on('click', function(){
        $("html, body").animate({ scrollTop: 0 }, "slow");
        $('.nav-tabs > .active').prev('a').trigger('click');
    })

}