/******* Variables *******/
var selectedRow = 0;

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

/******* Other *******/

function setInitials() {
	var analysisTitle = document.getElementById("analysis");
	analysisTitle.innerHTML = "Analysis: " + locations[0];
	var firstRow = $('#circleTable').find('tr').eq(3);
	firstRow.addClass('selectedRow');

	var numListens = document.getElementById("numListens");
	numListens.innerHTML += "<p>" + stats[0][0] + "</p>";
	var percentUsers = document.getElementById("percentUsers");
	percentUsers.innerHTML += "<p>" + stats[0][1] + "%</p>";
	var averageDistance = document.getElementById("averageDistance");
	averageDistance.innerHTML += "<p>" + stats[0][2] + " mi</p>";
	var numLikes = document.getElementById("numLikes");
	numLikes.innerHTML += "<p>" + stats[0][3] + "</p>";
	var percentLikes = document.getElementById("percentLikes");
	percentLikes.innerHTML += "<p>" + stats[0][4] + "%</p>";
	var averageAge = document.getElementById("averageAge");
	averageAge.innerHTML += "<p>" + stats[0][5] + " mi</p>";
}

function loader() {
	loadScript();
	resizeMap();
	setInitials();
}

window.onload = loader;
window.onresize = resizeMap;

function selectLocation(row) {
	selectedRow = row.index() - 3; //First two rows aren't locs, and we want to start from 0
	$('#circleTable').find('.location').removeClass('selectedRow');
	row.addClass('selectedRow');

	mapOptions = {
		zoom: 14,
	    center: new google.maps.LatLng(centers[selectedRow][0], centers[selectedRow][1])
	};

  	map = new google.maps.Map(document.getElementById('mapCanvas'),	mapOptions);

	var numListens = document.getElementById("numListens");
	var percentUsers = document.getElementById("percentUsers");
	var averageDistance = document.getElementById("averageDistance");
	var numLikes = document.getElementById("numLikes");
	var percentLikes = document.getElementById("percentLikes");
	var averageAge = document.getElementById("averageAge");

	numListens.innerHTML = "Total Listens<p>" + stats[selectedRow][0] + "</p>";
	percentUsers.innerHTML = "Percent of Users<p>" + stats[selectedRow][1] + "%</p>";
	averageDistance.innerHTML = "Average Distance<p>" + stats[selectedRow][2] + " mi</p>";
	numLikes.innerHTML = "Total Likes<p>" + stats[selectedRow][3] + "</p>";
	percentLikes.innerHTML = "Percent Likes<p>" + stats[selectedRow][4] + "%</p>";
	averageAge.innerHTML = "Average Age<p>" + stats[selectedRow][5] + " mi</p>";
}

$(document).ready(function(){

	$('#circleTable').find('.location').click(function() {
		selectLocation($(this));
	});

});