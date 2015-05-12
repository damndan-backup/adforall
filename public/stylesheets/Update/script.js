// Map and data needs to be set to whichever circle the user chose to edit,
// or defaults for a new circle.

circleAdded = false;
// smallRad = 1609;
// midRad = 4828;
// bigRad = 16093;
mile = 1609;
var lat = 0;
var lng = 0;

/******* Maps API Stuff *******/

function setMap(i) {
  if (i >= 0) {
    var mapOptions = {
      zoom: 14,
      scrollwheel: false,
      center: new google.maps.LatLng(centers[i][0], centers[i][1])
    };
  }
  else {
    var mapOptions = {
      zoom: 14,
      scrollWheel: false
    };
  }

  var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
  cityCircle = new google.maps.Circle();
  //addCircles(map);

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

  google.maps.event.addListener(map, 'click', function(e) {

    // if (document.getElementById('range1').checked)
    //   circleRad = smallRad;
    // else if (document.getElementById('range2').checked)
    //   circleRad = midRad;
    // else if (document.getElementById('range3').checked)
    //   circleRad = bigRad;

    //Daniel's
    circleRad = mile * document.getElementById('listensSlider').value;


    cityCircle.setMap(null);
    // Add circle to map
    circleAdded = true;
    var circleOptions = {
      strokeColor: '#0ea7e3',
      strokeOpacity: 0.8,
      strokeWeight: 1,
      fillColor: '#0ea7e3',
      fillOpacity: 0.25,
      map: map,
      center: new google.maps.LatLng(e.latLng.lat(), e.latLng.lng()),
      radius: circleRad
    };
    cityCircle = new google.maps.Circle(circleOptions);

    var circleCenterLat = cityCircle.getCenter().lat();
    var circleCenterLng = cityCircle.getCenter().lng();
    document.getElementById('mapInfo').innerHTML = '<input type=\'number\' name=\'targeting_info[loc]\' value=' + circleCenterLat + '><input type=\'number\' name=\'targeting_info[loc]\', value=' + circleCenterLng + '>';

    lat = circleCenterLat;
    lng = circleCenterLng
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

  $('input[type=radio][name=range]').change(function() {

    if (document.getElementById('range1').checked)
      circleRad = smallRad;
    else if (document.getElementById('range2').checked)
      circleRad = midRad;
    else if (document.getElementById('range3').checked)
      circleRad = bigRad;

    if (circleAdded) {
      cityCircle.setRadius(circleRad);
    }
  });
  
});

function updateSlider(val, slide) {
  switch (slide) {
    case 0:
      document.getElementById("radiusVal").innerHTML = val + " mi";
      break;
    case 1:
      document.getElementById("listenVal").innerHTML = "&nbsp;" + val + " mi";
      break;      
  }
}

















//Daniel's JSON Stringify code

function submitted() {


  var title = document.getElementsByName("title").value;
  var storeName = document.getElementsByName("storeName").value;
  var listensSlider = document.getElementsByName("listensSlider").value;
  // console.log("Lattitude", lat);
  // console.log("Longitude", lng);
  var summary = document.getElementsByName("summary").value;
  var pic = document.getElementsByName("pic").value;
  var url = document.getElementsByName("url").value;
  var budget = document.getElementsByName("budget").value;

  //JSON object
  var obj = {
    theTitle: title,
    theStoreName: storeName,
    theRadius: listensSlider,
    theLattitude: lat,
    theLongitude: lng,
    theSummary: summary,
    thePic: pic,
    theUrl: url,
    theNumAds: budget
  };

  // Stringify it with a replacer:
  var str = JSON.stringify(obj);  
  return str;

  // JSON.stringify()
  // receive: parse JSON to Object
  // obj.name

}


// http://stackoverflow.com/questions/8111446/turning-json-strings-into-objects-with-methods