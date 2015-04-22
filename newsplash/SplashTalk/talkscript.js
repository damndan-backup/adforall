$(function(){

	$('#goButton').click(function() {
		if (!hasClicked)
			alert("Click a location on the map first!");
		else {
			$('html,body').animate({
	          scrollTop: $('#goButton').offset().top
	        }, 400);
	        window.setTimeout(changePic, 400);
		}
	});

	$('#endTime').blur(function() {
		var timeE = $('#endTime').val();
		if (!validTime(timeE)) {
			alert("Invalid end time (e.g., 9:00 pm)");
			$('#endTime').val("9:00 pm");
		}
	});

	$('#startTime').blur(function() {
		var timeS = $('#startTime').val();
		if (!validTime(timeS)) {
			alert("Invalid start time (e.g., 8:00 am)");
			$('#startTime').val("8:00 am");
		}
	});

	$('#endAge').blur(function() {
		var ageE = $('#endAge').val();
		if (!validAge(ageE)) {
			alert("Invalid end age (e.g., 24)");
			$('#endAge').val("24");
		}
	});

	$('#startAge').blur(function() {
		var ageS = $('#startAge').val();
		if (!validAge(ageS)) {
			alert("Invalid start age (e.g., 18)");
			$('#startAge').val("18");
		}
	});

});

function validTime(str) {
	if (!(str[0] >= '0' && str[0] <= '9')) // first char must be digit
		return false;

	var numDigits = 0;
	var numSpaces = 0;
	var numChars = 0;
	var numColons = 0;
	for (var i = 0; i < str.length; i++) {
		if (str[i] >= '0' && str[i] <= '9')
			numDigits++;
		else if (str[i] == ' ')
			numSpaces++;
		else if (str[i] == 'a' || str[i] == 'A' || str[i] == 'p' || str[i] == 'P' || str[i] == 'm' || str[i] == 'M')
			numChars++;
		else if (str[i] == ':') {
			if (numDigits < 1 || numDigits > 2)
				return false;
			numColons++;
		}
		else // no other valid chars
			return false;
	}
	if (numDigits < 3 || numDigits > 4)
		return false;
	if (numChars != 2 || (str.indexOf("am") == -1 && str.indexOf("pm") == -1 && str.indexOf("AM") == -1 && str.indexOf("PM") == -1)) // must contain exactly one am or pm
		return false;
	if (numSpaces > 1) // only 0 or 1 spaces allowed
		return false;
	return numColons == 1; // must contain exactly one :
}

function validAge(age) {
	var numDigits = 0;
	for (var i = 0; i < age.length; i++) {
		if (age[i] >= '0' && age[i] <= '9')
			numDigits++;
		else
			return false;
	}
	console.log(numDigits);
	if (numDigits < 1 || numDigits > 3)
		return false;
	if (age[0] == '0')
		return false;
	return true;
}

function changePic() {
	placePic();
	var rand = Math.floor(Math.random()*dummyAds.length);
	document.getElementById('ad').innerHTML = dummyAds[rand];
}

function placePic() {
	$('#ad').css({
		'background-color': 'white',
		'left': $('#screen').offset().left + 38,
	});
}

$(window).resize(function() {
	placePic();
});

var dummyAds = [
	"Get 50% off your meal at Arby's! <br> <a href='http://www.arbys.com'>arbys.com/splash?=182048</a>",
	"Free drink with your meal at In-N-Out! <br> <a href='http://www.innout.com'>innout.com/splash?=248128</a>",
	"Buy one taco get one free at Taco Bell! <br> <a href='http://www.tacobell.com'>tacobell.com/splash?=384819</a>"
];