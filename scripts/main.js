$(document).ready(function () {

    new WOW({
        animateClass: 'animate__animated'
    }).init();

    $('.smoothie-img').magnificPopup({
        type: 'image',
    });

    function seeMenu() {
        $('.smoothies')[0].scrollIntoView({behavior: "smooth"});
    }

    $('#menu').on('click', seeMenu);

    $('.main-btn').on('click', seeMenu);

    function makeOrder() {
        $('.order')[0].scrollIntoView({behavior: "smooth"});
    }

    $('#order').on('click', makeOrder)

    $('.smoothie-btn').click((e) => {
        $('#smoothie-name').val($(e.target).parents('.smoothie').find('.smoothie-title').text());
        makeOrder();
    });

    let menu = $('.menu');

    function menuOpen () {
        menu.addClass('open');
    }

    function menuClose () {
        menu.removeClass('open');
    }

    $('#burger').on('click', menuOpen);

    $('.close').on('click', menuClose);

    $('.menu-item').on('click', menuClose);

    let loader = $('.loader');
    function loaderOpen() {
        loader.css('display', 'flex');
    }

    function loaderClose() {
        loader.hide();
    }

    let name = $('#name');
    let smoothieName = $('#smoothie-name');
    let phone = $('#phone');
    phone.inputmask({"mask": "(999) 999-9999"});


    function formValidation() {

        let hasError = false;

        $('.error-input').hide();

        if (!name.val()) {
            name.css('border-color', 'red');
            name.next().show();
            hasError = true;
        } else if (name.val()) {
            name.css('border-color', 'white');
        }
        if (!phone.val()) {
            phone.css('border-color', 'red');
            phone.next().show();
            hasError = true;
        } else if (phone.val()) {
            phone.css('border-color', 'white');
        }

        if (!smoothieName.val()) {
            smoothieName.css('border-color', 'red');
            smoothieName.next().show();
            hasError = true;

        } else if (smoothieName.val()) {
            smoothieName.css('border-color', 'white');
        }

        if (!hasError) {
            loaderOpen();
            $.ajax({
                method: "POST",
                url: "sendMail.php",
                data: {name: name.val(), phone: phone.val(), bowl: smoothieName.val()}
            })
                .done(function (msg) {
                    setTimeout(() => {
                        loaderClose();
                        console.log(msg);
                        if (msg.success) {
                            hideForm();
                        } else {
                            alert("Возникла ошибка");
                        }
                    }, 1000);
                });
            clearForm();

        }

        function clearForm() {
            name.val("");
            phone.val("");
            smoothieName.val("");
        }
    }

    function hideForm() {
        $('.order-title').remove();
        $('.order-description').remove();
        $('.order-image').remove();
        $('.order-form').remove();
        $('.order-shadow').remove();
        $('.order-img-avocado').remove();
        $('.order-avocado-shadow').remove();
        $('.order-success').show();
    }

    $('.order-btn').on('click', formValidation);
});