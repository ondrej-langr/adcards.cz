$('.close-cookie-warning').on('click', function() {
    $.cookie('HideCookieMessage', 'true', {
        expires: 120,
        path: '/',
    })
    $('div.cookies').hide()
});

(function($) {
    if ($.cookie('HideCookieMessage')) {
        $('.cookies').hide()
    } else {
        $('.cookies').show()
    }
})(jQuery)