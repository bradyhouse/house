(function (app, $, undefined) {
  app.URL = 'https://12-bradyhouse.rhcloud.com/passthru';
  $(document).ready(function () {
    let url = window.location.port ? 'http://' + window.location.hostname + ':' + window.location.port :
    'https://' + window.location.hostname;
    $('.log').height(window.innerHeight);
    $.ajax({
      url: 'https://cldvrxd0001d.chicago.cme.com:13462/CCE-370-370-2-PB Total Change-810,000.00-POS-CSEG-08-10-2016-prod_PB Total Change_2016-08-10_CUR-null',
      type: 'PUT',
      success: function(data) {
        alert('Load was performed.');
      }
    });

    /*$.ajax({
      type: 'POST',
      url: app.URL,
      data: 'url=https://itunes.apple.com/WebObjects/MZStore.woa/wpa/MRSS/featuredalbums/sf=143441/limit=100/genre=20/explicit=true/rss.xml&allowOrigin=' + url + '&allowCredentials=true&allowMethods=GET&allowHeaders=content-type',
      success: function(data) {
        $('.log').text(data);
      },
      dataType: 'html'
    });*/

  });
})(window.app = window.app || {}, jQuery)
