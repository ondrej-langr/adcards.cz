$(function() {
    var shrinkHeader = 10;
    $(window).scroll(function() {
        var scroll = getCurrentScroll();
        if (scroll >= shrinkHeader) {
            $('nav').addClass('shrink')
        } else {
            $('nav').removeClass('shrink')
        }
    });

    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop
    }
});
$(document).ready(function() {
    $('.btn-player, .close-player').on('click', function(e) {
        $('.info-btn-content').toggleClass("toggled")
    })
});
$(document).ready(function() {
    $('#play-video').on('click', function(e) {
        $('.video-show, .video-hide, #play-video').addClass("toggled")
    })
});
$(document).ready(function() {
    $('#play-video').on('click', function(ev) {
        $("#video")[0].src += "&autoplay=1";
        ev.preventDefault()
    })
});
$(".btn-player").hover(function() {
    $('.info-hide, .stats-show').toggleClass('toggled')
});
const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
    const itemToggle = this.getAttribute('aria-expanded');
    for (i = 0; i < items.length; i++) {
        items[i].setAttribute('aria-expanded', 'false')
    }
    if (itemToggle == 'false') {
        this.setAttribute('aria-expanded', 'true')
    }
}
items.forEach(item => item.addEventListener('click', toggleAccordion));
$.fn.jQuerySimpleCounter = function(options) {
    var settings = $.extend({
        start: 0,
        end: 100,
        easing: 'swing',
        duration: 400,
        complete: ''
    }, options);
    var thisElement = $(this);
    $({
        count: settings.start
    }).animate({
        count: settings.end
    }, {
        duration: settings.duration,
        easing: settings.easing,
        step: function() {
            var mathCount = Math.ceil(this.count);
            thisElement.text(mathCount)
        },
        complete: settings.complete
    })
};
$('#number1').jQuerySimpleCounter({
    end: 100,
    duration: 600
});
$(document).ready(function() {
    setTimeout(function() {
        $('.loader').addClass('loaded')
    }, 600)
});

(function(factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory)
    } else if (typeof exports === 'object') {
        factory(require('jquery'))
    } else {
        factory(jQuery)
    }
}(function($) {
    var pluses = /\+/g;

    function encode(s) {
        return config.raw ? s : encodeURIComponent(s)
    }

    function decode(s) {
        return config.raw ? s : decodeURIComponent(s)
    }

    function stringifyCookieValue(value) {
        return encode(config.json ? JSON.stringify(value) : String(value))
    }

    function parseCookieValue(s) {
        if (s.indexOf('"') === 0) {
            s = s.slice(1, -1).replace(/\\"/g, '"').replace(/\\\\/g, '\\')
        }
        try {
            s = decodeURIComponent(s.replace(pluses, ' '));
            return config.json ? JSON.parse(s) : s
        } catch (e) {}
    }

    function read(s, converter) {
        var value = config.raw ? s : parseCookieValue(s);
        return $.isFunction(converter) ? converter(value) : value
    }
    var config = $.cookie = function(key, value, options) {
        if (value !== undefined && !$.isFunction(value)) {
            options = $.extend({}, config.defaults, options);
            if (typeof options.expires === 'number') {
                var days = options.expires,
                    t = options.expires = new Date();
                t.setTime(+t + days * 864e+5)
            }
            return (document.cookie = [encode(key), '=', stringifyCookieValue(value), options.expires ? '; expires=' + options.expires.toUTCString() : '', options.path ? '; path=' + options.path : '', options.domain ? '; domain=' + options.domain : '', options.secure ? '; secure' : ''].join(''))
        }
        var result = key ? undefined : {};
        var cookies = document.cookie ? document.cookie.split('; ') : [];
        for (var i = 0, l = cookies.length; i < l; i++) {
            var parts = cookies[i].split('=');
            var name = decode(parts.shift());
            var cookie = parts.join('=');
            if (key && key === name) {
                result = read(cookie, value);
                break
            }
            if (!key && (cookie = read(cookie)) !== undefined) {
                result[name] = cookie
            }
        }
        return result
    };
    config.defaults = {};
    $.removeCookie = function(key, options) {
        if ($.cookie(key) === undefined) {
            return !1
        }
        $.cookie(key, '', $.extend({}, options, {
            expires: -1
        }));
        return !$.cookie(key)
    }
}));
$(".close-cookie-warning").on("click", function() {
    $.cookie('HideCookieMessage', 'true', {
        expires: 120,
        path: '/'
    });
    $('div.cookies').hide()
});
(function($) {
    if ($.cookie('HideCookieMessage')) {
        $('.cookies').hide()
    } else {
        $('.cookies').show()
    }
})(jQuery);

$(document).ready(function() {
    $('.dropdown-language-around').hover(function(e) {
        $('.dropdown-language-content, .language-btn i').toggleClass("toggled")
    });
    $('.dropdown-language-item').on('click', function(e) {
        $('.dropdown-language-content, .language-btn i').toggleClass("toggled");
        $('#').html($(this).html())
    })
});

$(document).ready(function() {
    $('.slider-main').slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        centerMode: !0,
        centerPadding: '30px',
        autoplay: !0,
        arrows: !0,
        dots: !1,
        draggable: !0,
        lazyLoad: 'progressive',
        prevArrow: "<button type='button' class='slick-prev'><div class='slick-btn-icon left'></span></div></button>",
        nextArrow: "<button type='button' class='slick-next'><div class='slick-btn-icon right'></span></div></button>",
        pauseOnHover: !0,
        responsive: [{
            breakpoint: 1200,
            settings: {
                slidesToShow: 3
            }
        }, {
            breakpoint: 768,
            settings: {
                slidesToShow: 2,
                centerMode: !1,
                centerPadding: '0px',
            }
        }, {
            breakpoint: 520,
            settings: {
                slidesToShow: 1
            }
        }]
    })
});
$(document).ready(function() {
    $('.slider-main2').slick({
        slidesToShow: 3,
        slidesToScroll: 1,
        centerMode: !0,
        centerPadding: '30px',
        autoplay: !0,
        arrows: !0,
        dots: !1,
        draggable: !0,
        lazyLoad: 'progressive',
        prevArrow: "<button type='button' class='slick-prev'><div class='slick-btn-icon left'></span></div></button>",
        nextArrow: "<button type='button' class='slick-next'><div class='slick-btn-icon right'></span></div></button>",
        pauseOnHover: !0,
        responsive: [{
            breakpoint: 1004,
            settings: {
                slidesToShow: 2,
                centerMode: !1,
                centerPadding: '0px',
            }
        }, {
            breakpoint: 767,
            settings: {
                slidesToShow: 1,
                centerMode: !1,
                centerPadding: '0px',
            }
        }]
    })
});
$(function() {
    $('select').bind('change keyup', function() {
        var value = $(this).children("option:selected").attr('value')
    }).change()
});
$(document).ready(function() {
    $('input[type="text"], input[type="radio"]').keyup(function() {
        var val1 = parseInt($('.value1').val());
        var val2 = parseInt($('.value2').val());
        var val3 = parseInt($('.value3').val());
        var sum = val1 / val3 + val2 / val3;
        $("input#result").val(sum)
    })
});
if ('loading' in HTMLImageElement.prototype) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    images.forEach(img => {
        img.src = img.dataset.src
    })
} else {
    const script = document.createElement('script');
    script.src = 'https://cdnjs.cloudflare.com/ajax/libs/lazysizes/5.1.2/lazysizes.min.js';
    document.body.appendChild(script)
}
var x, i, j, l, ll, selElmnt, a, b, c;
x = document.getElementsByClassName("custom-select");
l = x.length;
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName("select")[0];
    ll = selElmnt.length;
    a = document.createElement("DIV");
    a.setAttribute("class", "select-selected");
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML;
    x[i].appendChild(a);
    b = document.createElement("DIV");
    b.setAttribute("class", "select-items select-hide");
    for (j = 1; j < ll; j++) {
        c = document.createElement("DIV");
        c.innerHTML = selElmnt.options[j].innerHTML;
        c.addEventListener("click", function(e) {
            var y, i, k, s, h, sl, yl;
            s = this.parentNode.parentNode.getElementsByTagName("select")[0];
            sl = s.length;
            h = this.parentNode.previousSibling;
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i;
                    h.innerHTML = this.innerHTML;
                    y = this.parentNode.getElementsByClassName("same-as-selected");
                    yl = y.length;
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute("class")
                    }
                    this.setAttribute("class", "same-as-selected");
                    break
                }
            }
            h.click()
        });
        b.appendChild(c)
    }
    x[i].appendChild(b);
    a.addEventListener("click", function(e) {
        e.stopPropagation();
        closeAllSelect(this);
        this.nextSibling.classList.toggle("select-hide");
        this.classList.toggle("select-arrow-active")
    })
}

function closeAllSelect(elmnt) {
    var x, y, i, xl, yl, arrNo = [];
    x = document.getElementsByClassName("select-items");
    y = document.getElementsByClassName("select-selected");
    xl = x.length;
    yl = y.length;
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove("select-arrow-active")
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add("select-hide")
        }
    }
}
document.addEventListener("click", closeAllSelect);
$(document).ready(function() {
    $('#my-range').on('input', function() {
        $('#output').html($(this).val())
    })
})

    function PopUp(hideOrshow) {
        if (hideOrshow == 'hide') {
            document.getElementById('nl-wrapper').style.display = "none";
        }
        else  if(localStorage.getItem("popupWasShown") == null) {
            localStorage.setItem("popupWasShown",1);
            document.getElementById('nl-wrapper').removeAttribute('style');
        }
    }
    window.onload = function () {
        setTimeout(function () {
            PopUp('show');
        }, 0);
    }


    function hideNow(e) {
        if (e.target.id == 'nl-wrapper') document.getElementById('nl-wrapper').style.display = 'none';
    }