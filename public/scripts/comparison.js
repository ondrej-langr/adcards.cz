$(document).ready(function() {
  $('.co-slider').each(function() {
    var slider2 = $(this);
    var frame_1 = slider2.find('#frame-1');
    var frame_2 = slider2.find('#frame-2');

    frame_1.css('width', slider2.width() + 'px');
    frame_2.css('width', slider2.width() + 'px');

    var max_height = 0;

    if (frame_1.height() > frame_2.height()) {
      max_height = frame_1.height();
    } else {
      max_height = frame_2.height();
    }

    slider2.css('height', max_height + 'px');

    drags(slider2.find('.handle'), slider2.find('.resize'), slider2);
  });
});

$(window).resize(function() {
  $('.co-slider').each(function() {
    var slider2 = $(this);
    var frame_1 = slider2.find('#frame-1');
    var frame_2 = slider2.find('#frame-2');

    frame_1.css('width', slider2.width() + 'px');
    frame_2.css('width', slider2.width() + 'px');

    var max_height = 0;

    if (frame_1.height() > frame_2.height()) {
      max_height = frame_1.height();
    } else {
      max_height = frame_2.height();
    }

    slider2.css('height', max_height + 'px');

    drags(slider2.find('.handle'), slider2.find('.resize'), slider2);
  });
});

function drags(dragElement, resizeElement, container) {

  dragElement.on('mousedown touchstart', function(e) {

    dragElement.addClass('draggable');
    resizeElement.addClass('resizable');

    var startX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

    var dragWidth = dragElement.outerWidth(),
      posX = dragElement.offset().left + dragWidth - startX,
      containerOffset = container.offset().left,
      containerWidth = container.outerWidth();

    minLeft = containerOffset + 0;
    maxLeft = containerOffset + containerWidth - dragWidth - 0;

      dragElement.parents().on("mousemove touchmove", function(e) {

      var moveX = (e.pageX) ? e.pageX : e.originalEvent.touches[0].pageX;

      leftValue = moveX + posX - dragWidth;

      if (leftValue < minLeft) {
        leftValue = minLeft;
      } else if (leftValue > maxLeft) {
        leftValue = maxLeft;
      }

      widthValue = (leftValue + dragWidth / 2 - containerOffset) * 100 / containerWidth + '%';

      $('.draggable').css('left', widthValue).on('mouseup touchend touchcancel', function() {
        $(this).removeClass('draggable');
        resizeElement.removeClass('resizable');
      });
      $('.resizable').css('width', widthValue);
    }).on('mouseup touchend touchcancel', function() {
      dragElement.removeClass('draggable');
      resizeElement.removeClass('resizable');
    });
    e.preventDefault();
  }).on('mouseup touchend touchcancel', function(e) {
    dragElement.removeClass('draggable');
    resizeElement.removeClass('resizable');
  });
}