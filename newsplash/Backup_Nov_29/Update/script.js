// Map and data needs to be set to whichever circle the user chose to edit,
// or defaults for a new circle.


/******* Maps API Stuff *******/

function initialize() {
  var mapOptions = {
    zoom: 14,
    center: new google.maps.LatLng(centers[0][0], centers[0][1])
  };

  var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      'callback=initialize';
      //'key=AIzaSyBArWrMNG4iRTuZl3HmVGsz467wfc_5SHQ';
  document.body.appendChild(script);
}

function resizeMap() {
	var map = $('#mapCanvas');
	var newHeight = map.width() * 563/1000;
	map.css("height", function() {
		return newHeight;
	});
}

function loader() {
  loadScript();
  resizeMap();
}


window.onload = loader;
window.onresize = resizeMap;