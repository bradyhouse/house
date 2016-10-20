(function (app, $, undefined) {
  app.URL = 'https://12-bradyhouse.rhcloud.com/passthru';
  $(document).ready(function () {
    let url = window.location.port ? 'http://' + window.location.hostname + ':' + window.location.port :
    'https://' + window.location.hostname;
    $('.log').height(window.innerHeight);
    $.ajax({
      type: 'POST',
      url: app.URL,
      data: 'url=http://itunes.apple.com/us/rss/topsongs/limit=100/explicit=true/xml&convertToJson=true&allowOrigin=' + url + '&allowCredentials=true&allowMethods=GET&allowHeaders=content-type',
      success: function(data) {
        $('.log').text(data);
      },
      dataType: 'html'
    });
  });
})(window.app = window.app || {}, jQuery)
