
$('.mymodal-close, .mymodal-container').on('click', function (e) {
    if ($(e.target).is('.mymodal-container') || $(e.target).is('.mymodal-close')) {
        $('.mymodal-container').removeClass('open');
    }
});


/* START Form handler */

$('.btn-form-js').on('click', function(e){
    e.preventDefault();
    let $modalCont = $(this).parents('.' + $(this).data('form-container'));
    var $msgCont = $modalCont.find('.msg-alert');
    $msgCont.html('');
    var errors = 0;
    var reqFields = $modalCont.find('.req');
    reqFields.css('border-color','');
    reqFields.each(function(){
        if($(this).val() == ''){
            $(this).css('border-color', '#ff7d7d');
            errors++;
        }
    });
    if(errors == 0){
        var formData = $modalCont.find('form').serialize();
        $.ajax({
            type: 'POST',
            url: '/send.php',
            dataType: 'json',
            data: formData,
            success: function (response) {
                var successMsg = 'Ваша заявка отправленна!';

                $msgCont.html('<span class="good">' + successMsg + '</span>');
                setTimeout(function () {
                    $modalCont.removeClass('open');
                    $msgCont.html('');
                }, 3000);
            },
            error: function (jqXHR, exception) {
                var msg = '';
                if (jqXHR.status === 0) {
                    msg = 'Not connect.\n Verify Network.';
                } else if (jqXHR.status == 404) {
                    msg = 'Requested page not found. [404]';
                } else if (jqXHR.status == 500) {
                    msg = 'Internal Server Error [500].';
                } else if (exception === 'parsererror') {
                    msg = 'Requested JSON parse failed.';
                } else if (exception === 'timeout') {
                    msg = 'Time out error.';
                } else if (exception === 'abort') {
                    msg = 'Ajax request aborted.';
                } else {
                    msg = 'Uncaught Error.\n' + jqXHR.responseText;
                }
                console.log(msg);
            }
        });
    }else{
        $msgCont.html('<span class="error">Заполните поле!</span>');
    }
});
/* END Form handler */