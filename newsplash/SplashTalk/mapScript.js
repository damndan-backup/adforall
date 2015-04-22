// Map and data needs to be set to whichever circle the user chose to edit,
// or defaults for a new circle.

circleAdded = false;
hasClicked = false;

/******* Maps API Stuff *******/

function setMap(i) {
  if (i >= 0) {
    var mapOptions = {
      zoom: 14,
      scrollwheel: false,
      center: new google.maps.LatLng(0, 0)
    };
  }
  else {
    var mapOptions = {
      zoom: 14,
      scrollWheel: false
    };
  }

  var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);

  if (i < 0) { // Set center to user location
    // Try W3C Geolocation (Preferred)
    if(navigator.geolocation) {
      browserSupportFlag = true;
      navigator.geolocation.getCurrentPosition(function(position) {
        initialLocation = new google.maps.LatLng(position.coords.latitude,position.coords.longitude);
        map.setCenter(initialLocation);
      }, function() {
        handleNoGeolocation(browserSupportFlag);
      });
    }
    // Browser doesn't support Geolocation
    else {
      browserSupportFlag = false;
      handleNoGeolocation(browserSupportFlag);
    }
  }
  var marker = new google.maps.Marker();
  google.maps.event.addListener(map, 'click', function(e) {
    hasClicked = true;
    marker.setMap(null);
    marker = new google.maps.Marker({
      position: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
      map: map,
      title: 'Your location'
    });
  });

  // Enable scroll-zoom on click
  google.maps.event.addListener(map, 'click', function() {
    map.setOptions({scrollwheel:true});
  });
}

function addCircles(map) {
  for (var i = 0; i < centers.length; i++) {
      // Add circle to map
      var circleOptions = {
        strokeColor: '#0ea7e3',
        strokeOpacity: 0.8,
        strokeWeight: 1,
        fillColor: '#0ea7e3',
        fillOpacity: 0.25,
        map: map,
          center: new google.maps.LatLng(centers[i][0], centers[i][1]),
          radius: centers[i][2]
      };
      cityCircle = new google.maps.Circle(circleOptions);
  }
}

function initializeMap() {
  setMap(-1);
}

function loadScript() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
             'callback=initializeMap&' + 
             'libraries=places';
             //'key=AIzaSyBArWrMNG4iRTuZl3HmVGsz467wfc_5SHQ';
    document.body.appendChild(script);
}

function resizeMap() {
  var newMap = $('#mapCanvas');
  var newHeight = newMap.width() * 563/1000;
  newMap.css("height", function() {
    return newHeight;
  });
}

function handleNoGeolocation(errorFlag) {
  var hawaii = new google.maps.LatLng(20.358800, -157.652275);
  if (errorFlag == true) {
    alert("Geolocation service failed. Welcome to Hawaii.");
    initialLocation = hawaii;
  } else {
    alert("Oops, your browser doesn't support geolocation. Welcome to Hawaii.");
    initialLocation = hawaii;
  }
  map.setCenter(initialLocation);
}

/******* Other *******/

function loader() {
  loadScript();
  resize();
}
function resize() {
  resizeMap();
}

window.onload = loader;
window.onresize = resize;

$(document).ready(function(){

});

function updateSlider(val, slide) {
  switch (slide) {
    case 0:
      document.getElementById("radiusVal").innerHTML = val + " mi";
      break;
    case 1:
      document.getElementById("listenVal").innerHTML = val;
      break;      
  }
}