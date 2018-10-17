jQuery(function ($) {

  'use strict';


  $('.tr-sticky').theiaStickySidebar({
    additionalMarginTop: 0
  });

  $('#column-slider').on('slide.bs.carousel', function(){
    $('.tr-sticky').theiaStickySidebar().disable();
    $('html, body').animate({ scrollTop: 500 }, 'slow');
    window.setTimeout(function() {
      $('.tr-sticky').theiaStickySidebar().enable();
    }, 500);
  });


});