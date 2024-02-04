import { AlpineComponent } from 'alpinejs'
import $ from 'jquery'
import 'slick-carousel'
import 'slick-carousel/slick/slick.css'

// only imported on builder page
export const cardSlider = (): AlpineComponent<any> => {
  return {
    create() {
      const el = $(this.$el)

      if (el.hasClass('slick-initialized')) {
        el.slick('destroy')
      }

      const totalRealSlidesCount = this.$el.querySelectorAll('.slide').length

      el.slick({
        slidesToShow: 5,
        slidesToScroll: 1,
        // When centered alone slide it causes that slide to be placed at the end, this kind of fixes it...
        centerMode: totalRealSlidesCount > 1,
        centerPadding: '30px',
        autoplay: true,
        arrows: true,
        dots: false,
        draggable: true,
        lazyLoad: 'progressive',
        prevArrow: '<button type=\'button\' class=\'slick-prev ignore-button-styles\'><div class=\'slick-btn-icon left\'></span></div></button>',
        nextArrow: '<button type=\'button\' class=\'slick-next ignore-button-styles\'><div class=\'slick-btn-icon right\'></span></div></button>',
        pauseOnHover: true,
        autoplaySpeed: 7000,
        responsive: [{
          breakpoint: 1400,
          settings: {
            slidesToShow: 3,
          },
        }, {
          breakpoint: 768,
          settings: {
            slidesToShow: 2,
            centerMode: false,
            centerPadding: '0px',
          },
        }, {
          breakpoint: 640,
          settings: {
            slidesToShow: 1,
          },
        }],
      })
    },
    init() {
      this.create()
    },
  }
}