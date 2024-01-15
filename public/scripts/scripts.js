// TODO: check this file for unused code

$(function() {
    var shrinkHeader = 10
    $(window).scroll(function() {
        var scroll = getCurrentScroll()
        if (scroll >= shrinkHeader) {
            $('nav').addClass('shrink')
        } else {
            $('nav').removeClass('shrink')
        }
    })

    function getCurrentScroll() {
        return window.pageYOffset || document.documentElement.scrollTop
    }
})
$(document).ready(function() {
    $('.btn-player, .close-player').on('click', function(e) {
        $('.info-btn-content').toggleClass('toggled')
    })
})
$(document).ready(function() {
    $('#play-video').on('click', function(e) {
        $('.video-show, .video-hide, #play-video').addClass('toggled')
    })
})
$(document).ready(function() {
    $('#play-video').on('click', function(ev) {
        $('#video')[0].src += '&autoplay=1'
        ev.preventDefault()
    })
})
$('.btn-player').hover(function() {
    $('.info-hide, .stats-show').toggleClass('toggled')
})

$(function() {
    $('select').bind('change keyup', function() {
        var value = $(this).children('option:selected').attr('value')
    }).change()
})
$(document).ready(function() {
    $('input[type="text"], input[type="radio"]').keyup(function() {
        var val1 = parseInt($('.value1').val())
        var val2 = parseInt($('.value2').val())
        var val3 = parseInt($('.value3').val())
        var sum = val1 / val3 + val2 / val3
        $('input#result').val(sum)
    })
})

var x, i, j, l, ll, selElmnt, a, b, c
x = document.getElementsByClassName('custom-select')
l = x.length
for (i = 0; i < l; i++) {
    selElmnt = x[i].getElementsByTagName('select')[0]
    ll = selElmnt.length
    a = document.createElement('DIV')
    a.setAttribute('class', 'select-selected')
    a.innerHTML = selElmnt.options[selElmnt.selectedIndex].innerHTML
    x[i].appendChild(a)
    b = document.createElement('DIV')
    b.setAttribute('class', 'select-items select-hide')
    for (j = 1; j < ll; j++) {
        c = document.createElement('DIV')
        c.innerHTML = selElmnt.options[j].innerHTML
        c.addEventListener('click', function(e) {
            var y, i, k, s, h, sl, yl
            s = this.parentNode.parentNode.getElementsByTagName('select')[0]
            sl = s.length
            h = this.parentNode.previousSibling
            for (i = 0; i < sl; i++) {
                if (s.options[i].innerHTML == this.innerHTML) {
                    s.selectedIndex = i
                    h.innerHTML = this.innerHTML
                    y = this.parentNode.getElementsByClassName('same-as-selected')
                    yl = y.length
                    for (k = 0; k < yl; k++) {
                        y[k].removeAttribute('class')
                    }
                    this.setAttribute('class', 'same-as-selected')
                    break
                }
            }
            h.click()
        })
        b.appendChild(c)
    }
    x[i].appendChild(b)
    a.addEventListener('click', function(e) {
        e.stopPropagation()
        closeAllSelect(this)
        this.nextSibling.classList.toggle('select-hide')
        this.classList.toggle('select-arrow-active')
    })
}

function closeAllSelect(elmnt) {
    var x, y, i, xl, yl, arrNo = []
    x = document.getElementsByClassName('select-items')
    y = document.getElementsByClassName('select-selected')
    xl = x.length
    yl = y.length
    for (i = 0; i < yl; i++) {
        if (elmnt == y[i]) {
            arrNo.push(i)
        } else {
            y[i].classList.remove('select-arrow-active')
        }
    }
    for (i = 0; i < xl; i++) {
        if (arrNo.indexOf(i)) {
            x[i].classList.add('select-hide')
        }
    }
}

document.addEventListener('click', closeAllSelect)
$(document).ready(function() {
    $('#my-range').on('input', function() {
        $('#output').html($(this).val())
    })
})
