(function (app, $, undefined) {

  app.URL = 'http://12-bradyhouse.rhcloud.com/passthru';

  $(document).ready(function () {

    let url = window.location.port ? 'http://' + window.location.hostname + ':' + window.location.port :
    'http://' + window.location.hostname;

    $('.log').height(window.innerHeight);


    $.ajax({
      type: 'POST',
      url: app.URL,
      data: 'url=https://itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/featuredalbums/sf=143441/limit=100/genre=20/explicit=true/rss.xml&allowOrigin=' + url + '&allowCredentials=true&allowMethods=GET&allowHeaders=content-type',
      success: function(data) {
        $('.log').text(data);
      },
      dataType: 'html'
    });

  });


})(window.app = window.app || {}, jQuery)
