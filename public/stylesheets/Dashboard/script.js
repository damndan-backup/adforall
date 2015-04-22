/******* Variables *******/
var selectedRow;
var myChart;

/******* Maps API Stuff *******/

function setMap(i) {
	var mapOptions = {
    	zoom: 14,
    	scrollwheel: false,
    	center: new google.maps.LatLng(centers[i][0], centers[i][1])
  	};

  	var map = new google.maps.Map(document.getElementById('mapCanvas'), mapOptions);
  	addCircles(map);

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
	setMap(0);
}

function loadScript() {
  	var script = document.createElement('script');
  	script.type = 'text/javascript';
  	script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
      			 'callback=initializeMap';
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

/******* Charts API Stuff ********/

function setChart(location, stat) {
	Chart.defaults.global.responsive = true;
	Chart.defaults.global.scaleBeginAtZero = true;
	$('#stats').find('.stat').removeClass('selectedStat');
	$('#stats').find('.stat').eq(stat).addClass('selectedStat');
	var ctx = document.getElementById("chartCanvas").getContext("2d");
	var statDescription = document.getElementById("statDescription");
	if (typeof myChart !== 'undefined')
		myChart.destroy();
	
	switch (stat) {
		case 0: //Total Listens
			Chart.defaults.global.scaleBeginAtZero = true;
			statDescription.innerHTML = "Total number of listens to your ad";
			myChart = new Chart(ctx).Line(data[location][0], options);
			break;
		case 1: //Percent Users
			statDescription.innerHTML = "Percent of users in the area who have heard your ad";
			myChart = new Chart(ctx).Pie(data[location][1], options);
			break;
		case 2: //Average Distance
			Chart.defaults.global.scaleBeginAtZero = false;
			statDescription.innerHTML = "Average listener distance from your circle's center";
			myChart = new Chart(ctx).Line(data[location][2], options);
			break;
		case 3: //Total Likes
			Chart.defaults.global.scaleBeginAtZero = true;
			statDescription.innerHTML = "Total number of likes";
			myChart = new Chart(ctx).Line(data[location][3], options);
			break;
		case 4: //Percent Liked
			statDescription.innerHTML = "Percent of users who liked your ad";
			myChart = new Chart(ctx).Pie(data[location][4], options);
			break;
		case 5: //Average Age
			Chart.defaults.global.scaleBeginAtZero = false;
			statDescription.innerHTML = "Average listener age";
			myChart = new Chart(ctx).Line(data[location][5], options);
			break;
		default:
			statDescription.innerHTML = "Total number of listens to your ad";
			myChart = new Chart(ctx).Line(data[location][0], options);
	}

}

/******* Other *******/

function setData(selectedRow) {
	var analysisTitle = document.getElementById("analysis");
	analysisTitle.innerHTML = "Analysis: " + locations[selectedRow];
	var firstRow = $('#circleTable').find('tr').eq(3);
	$('#circleTable').find('.location').eq(selectedRow).addClass('selectedRow');

	var numListens = document.getElementById("numListens");
	numListens.innerHTML = "Total Listens<p>" + stats[selectedRow][0] + "</p>";
	var percentUsers = document.getElementById("percentUsers");
	percentUsers.innerHTML = "Percent of Users<p>" + stats[selectedRow][1] + "%</p>";
	var averageDistance = document.getElementById("averageDistance");
	averageDistance.innerHTML = "Average Distance<p>" + stats[selectedRow][2] + " mi</p>";
	var numLikes = document.getElementById("numLikes");
	numLikes.innerHTML = "Total Likes<p>" + stats[selectedRow][3] + "</p>";
	var percentLikes = document.getElementById("percentLikes");
	percentLikes.innerHTML = "Percent Liked<p>" + stats[selectedRow][4] + "%</p>";
	var averageAge = document.getElementById("averageAge");
	averageAge.innerHTML = "Average Age<p>" + stats[selectedRow][5] + " mi</p>";
}

function loader() {
	loadScript();
	resize();
	setData(0);
	setChart(0, 0);
}
function resize() {
	resizeMap();
}

window.onload = loader;
window.onresize = resize;

function selectLocation(row) {
	rowIndex = row.index() - 3; //First two rows aren't locs, and we want to start from 0
	$('#circleTable').find('.location').removeClass('selectedRow');

	selectedRow = rowIndex;

	setMap(rowIndex);
	setData(rowIndex);
	setChart(rowIndex, 0);
}

function selectStat(stat) {
	statIndex = stat.index() / 2;

	setChart(selectedRow, statIndex);
}

$(document).ready(function(){

	selectedRow = 0;

	$('#circleTable').find('.location').click(function() {
		selectLocation($(this));
	});

	$('#stats').find('.stat').click(function() {
		selectStat($(this));
	});

});