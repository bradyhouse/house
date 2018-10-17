jQuery(function ($) {

  'use strict';

  function doAnimations( elems ) {
    let animEndEv = 'webkitAnimationEnd animationend';

    elems.each(() => {
      let $this = $(this),
        $animationType = $this.data('animation');

      $this.addClass($animationType).one(animEndEv, function () {
        $this.removeClass($animationType);
      });
    });
  }

  let $myCarousel = $('#story-carousel'),
    $firstAnimatingElems = $myCarousel.find('.item:first').find("[data-animation ^= 'animated']");

  $myCarousel.carousel();

  doAnimations($firstAnimatingElems);

  //Pause carousel
  $myCarousel.carousel('pause');
  $myCarousel.on('slide.bs.carousel', function (e) {
    let $animatingElems = $(e.relatedTarget).find("[data-animation ^= 'animated']");
    doAnimations($animatingElems);
  });


});