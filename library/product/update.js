$(function(){
    richText();
    imageArea();
    reloadImages();
    reloadDocs();
    reloadHistory();
    supplierName();

    $('.tab-content > .tab-pane:nth-of-type(1)').addClass("show").addClass("active");
})

function imageArea() {

    $('#form').on('click', '.image-area, .view-tt', function(){
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

function reloadImages() {
    $('#reloadImage').on('click', function(){
        $("#images").load(" #images > *");
        mdtoast("Image Panel Updated", { duration: 1500 });

    });
}

function reloadDocs() {
    $('#reloadDocs').on('click', function(){
        $("#docs").load(" #docs > *");
        mdtoast("Document Updated", { duration: 1500 });
    })
}

function reloadHistory() {
    $('#reloadHistory').on('click', function(){
        $("#history").load(" #history > *");
        $("#historyselect").load(" #historyselect > *");
        mdtoast("History Updated", { duration: 1500 });
        supplierName();
    })
}



function supplierName () {
    $('body').on('change', '#tree', function(){
        if($(this).val() == "off") { 
            $('#supplierName').val('');
            return 
        };
        var supplierName = $(this).find('option:selected').text();
        $('#supplierName').val(supplierName);
        return
    })

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