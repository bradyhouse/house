var Observable = require("tns-core-modules/data/observable").Observable;

function loadArea(page) {
  var location = geolocation.getCurrentLocation({desiredAccuracy: 3, updateDistance: 10, maximumAge: 20000, timeout: 20000}).
  then(function(loc) {
    if (loc) {
      var lat = loc.latitude.toFixed(3),
        lng = loc.longitude.toFixed(3);
      getAreaCode(lng, lat, page);
    }
  }, function(e){
      page.error = e.message;
    console.log(e.message);
  });
}

function getAreaCode(lng, lat, page) {
  var url = "https://geocoder.ca/" + lat + "," + lng + "?json=1";
  console.log(url);
  fetch(url)
    .then((response) => response.json())
    .then((r) => {
        page.areaCode = r.AreaCode;
    }).catch((e) => {
    console.log(e.message);
    page.error = e.message;
  });
}

function createViewModel() {
    var viewModel = new Observable();
  viewModel.latitude = "";
  viewModel.longitude = "";
  viewModel.areaCode = "";
  viewModel.error = "";
  viewModel.onTap = function() {
      loadArea();
    };

    return viewModel;
}

exports.createViewModel = createViewModel;