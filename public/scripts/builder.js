window.app = new Vue({
    el: '.card-preview-app',
    delimiters: ['${', '}'],
    data() {
        return (
            {
                countries: {
                    list: [],
                    search: []
                },
                clubs: {
                    list: [],
                    search: []
                },
                loading: {
                    scroll: {
                        countries: !1,
                        clubs: !1
                    }
                },
                searching: {
                    country: !1,
                    club: !1
                },
                backgrounds: [],
                background: null,
                backgroundId: null,
                backgroundName: null,
                textColor: null,
                name: null,
                country: {
                    data: null,
                    src: null,
                    custom: !1
                },
                club: {
                    data: null,
                    src: null,
                    custom: !1
                },
                image: null,
                rating: '99',
                position: 'CAM',
                cardType: 'player',
                realPlayer: 0,
                size: 2,
                stats: {
                    player: {
                        0: {
                            name: 'pac',
                            value: 99
                        },
                        1: {
                            name: 'dri',
                            value: 99
                        },
                        2: {
                            name: 'sho',
                            value: 99
                        },
                        3: {
                            name: 'def',
                            value: 99
                        },
                        4: {
                            name: 'pas',
                            value: 99
                        },
                        5: {
                            name: 'phy',
                            value: 99
                        },
                    },
                    goalKeeper: {
                        0: {
                            name: 'div',
                            value: 99
                        },
                        1: {
                            name: 'ref',
                            value: 99
                        },
                        2: {
                            name: 'han',
                            value: 99
                        },
                        3: {
                            name: 'spe',
                            value: 99
                        },
                        4: {
                            name: 'kic',
                            value: 99
                        },
                        5: {
                            name: 'pos',
                            value: 99
                        },
                    }
                }
            }
        )
    },
    methods: {
        validateForm() {
            let requiredFields = [];
            if (this.realPlayer == 0) {
                requiredFields = [this.background, this.name, this.country.data, this.club.data, this.image, this.rating, this.position, this.cardType, this.size]
            } else {
                requiredFields = [this.background, this.name, this.size]
            }
            let valid = !0;
            requiredFields.map(field => {
                if (field === null || field == '') {
                    valid = !1;
                    return
                }
            });
            if (valid) {
                document.querySelector('#add-to-cart-btn').removeAttribute('disabled')
            } else {
                document.querySelector('#add-to-cart-btn').setAttribute('disabled', !0)
            }
        },
        getCountries() {
            this.loading.scroll.countries = !0;
            fetch('https://adcards.cz/builder/countries?limit=10&offset=' + this.countries.list.length).then(data => data.json().then(data => {
                this.countries.list.push(...data)
                this.loading.scroll.countries = !1
            }))
        },
        searchCountry(e) {
            this.loading.scroll.countries = !0;
            this.searching.country = e.target.value.length > 0;
            fetch('https://adcards.cz/builder/countries?search=' + e.target.value).then(data => data.json().then(data => {
                this.countries.search = data
                this.loading.scroll.countries = !1
            }))
        },
        getClubs() {
            this.loading.scroll.clubs = !0;
            fetch('https://adcards.cz/builder/clubs?limit=10&offset=' + this.clubs.list.length).then(data => data.json().then(data => {
                this.clubs.list.push(...data)
                this.loading.scroll.clubs = !1
            }))
        },
        searchClub(e) {
            this.loading.scroll.clubs = !0;
            this.searching.club = e.target.value.length > 0;
            fetch('https://adcards.cz/builder/clubs?search=' + e.target.value).then(data => data.json().then(data => {
                this.clubs.search = data
                this.loading.scroll.clubs = !1
            }))
        },

        setBackground(background) {
            let webroot = document.querySelector('#webroot').innerHTML;

            this.background     = webroot + 'app/carnival/var/storage/' + background.img.relativePath;
            this.backgroundId   = background.id;
            this.textColor      = background.textColor;
            this.backgroundName = background.name;
        },

        getBackgrounds() {
            fetch('https://adcards.cz/builder/backgrounds?limit=10&offset=' + this.backgrounds.length).then(data => data.json().then(data => {
                this.backgrounds.push(...data);
            }));
        },

        scrollingCountries(e) {
            if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 1) {
                this.getCountries()
            }
        },
        scrollingClubs(e) {
            if (e.target.scrollHeight - e.target.scrollTop - e.target.clientHeight < 1) {
                this.getClubs()
            }
        },
        insertFlag(e, src, varName) {
            this[varName].src = src;
            this[varName].data = e.target.value;
        }
    },
    beforeMount() {
        this.getCountries();
        this.getClubs();
    },
    mounted() {
        
    }
});

let cropperImage = document.querySelector('.image-preview');
let cropper = new Cropper(cropperImage, {
    preview: '#card-image',
    zoomOnWheel: !0,
    background: !0,
    restore: !1,
    responsive: !0,
    cropBoxResizable: !0,
});

cropperImage.addEventListener('ready', () => {
    window.app.image = cropper.getCroppedCanvas().toDataURL()
});

cropperImage.addEventListener('cropend', () => {
    window.app.image = cropper.getCroppedCanvas().toDataURL()
});

function readURL(input, varName) {
    let img = new Image();
    if (input.files && input.files[0]) {
        
        let fileName = input.files[0].name;

        let reader = new FileReader();

        reader.onload = function (e) {
            if (varName == 'image') {
                cropper.replace(e.target.result)
            }
            if (!window.app[varName]) {
                window.app[varName] = {}
            }
            window.app[varName].data = e.target.result;
            window.app[varName].src = e.target.result;

            img.src = e.target.result

            let containerEl = document.createElement('div');
            let imgEl       = document.createElement('img');
            let labelEl     = document.createElement('span');

            containerEl.classList.add('dropdown-icon-container');

            imgEl.src = e.target.result;
            imgEl.classList.add('dropdown-icon');

            labelEl.classList.add('label-name');
            labelEl.innerHTML = fileName;

            containerEl.appendChild(imgEl);
            containerEl.appendChild(labelEl);

            $('#' + varName + '-dropdown-btn')[0].innerHTML = containerEl.outerHTML;
            $('.' + varName + '-dropdown-content').removeClass('toggled');
        }
        img.onload = () => {
            this.height = 600
        }
        reader.readAsDataURL(input.files[0])
    }
}

function toggleImageEditor() {
    if (document.querySelector('.image-editor').classList.contains('toggled')) {
        document.querySelector('.image-editor').classList.remove('toggled')
    } else {
        document.querySelector('.image-editor').classList.add('toggled')
    }
}

function validateField(e) {
    if (e.target.value == '') {
        e.target.classList.add('is-invalid')
    } else {
        e.target.classList.remove('is-invalid')
    }
}

$(".slide").click(function () {
    $('html,body').animate({
        scrollTop: $(".builder").offset().top - 70
    }, 'slow')
});

$('body').on('focus', 'input', function () {
    if ($(this).attr('data-initial') == 'true') {
        $(this).val('');
        $(this).attr('data-initial', 'false')
    }
});

$(document).ready(function () {
    $('.country-dropdown-btn').on('click', function (e) {
        $('.country-dropdown-content, .country-dropdown-btn svg').toggleClass("toggled")
    });
    $('.club-dropdown-btn').on('click', function (e) {
        $('.club-dropdown-content, .club-dropdown-btn svg').toggleClass("toggled")
    });
    $('.dropdown-item-country').on('click', function (e) {
        $('.country-dropdown-content, .country-dropdown-btn svg').toggleClass("toggled");
        $('#country-dropdown-btn span').html($(this).html())
    });
    $('.dropdown-item-club').on('click', function (e) {
        $('.club-dropdown-content, .club-dropdown-btn svg').toggleClass("toggled");
        $('#club-dropdown-btn span').html($(this).html())
    })

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
            breakpoint: 1400,
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
    });

    setTimeout(function () {
        $('.loader').addClass('loaded')
    }, 600)
});

$.fn.jQuerySimpleCounter = function (options) {
    var settings = $.extend({
        start: 0,
        end: 100,
        easing: 'swing',
        duration: 100,
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
        step: function () {
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

(function (factory) {
    if (typeof define === 'function' && define.amd) {
        define(['jquery'], factory)
    } else if (typeof exports === 'object') {
        factory(require('jquery'))
    } else {
        factory(jQuery)
    }
}(function ($) {
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
    var config = $.cookie = function (key, value, options) {
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
    $.removeCookie = function (key, options) {
        if ($.cookie(key) === undefined) {
            return !1
        }
        $.cookie(key, '', $.extend({}, options, {
            expires: -1
        }));
        return !$.cookie(key)
    }
}));
$(".close-cookie-warning").on("click", function () {
    $.cookie('HideCookieMessage', 'true', {
        expires: 120,
        path: '/'
    });
    $('div.cookies').hide()
});
(function ($) {
    if ($.cookie('HideCookieMessage')) {
        $('.cookies').hide()
    } else {
        $('.cookies').show()
    }
})(jQuery);
$(document).ready(function () {
    $('.dropdown-language-around').hover(function (e) {
        $('.dropdown-language-content, .language-btn i').toggleClass("toggled")
    });
    $('.dropdown-language-item').on('click', function (e) {
        $('.dropdown-language-content, .language-btn i').toggleClass("toggled");
        $('#').html($(this).html())
    })
});

$('body').on('click', '.dropdown-item-club', function() {
    $('#club-dropdown-btn').html($(this).html());
    $('.club-dropdown-content').removeClass('toggled');
});

$('body').on('click', '.dropdown-item-country', function() {
    $('#country-dropdown-btn').html($(this).html());
    $('.country-dropdown-content').removeClass('toggled');
});

window.addEventListener('load', () => {
    /*
    setTimeout(() => {
        sliderInit();
    }, 1000);
    */
});