// Temporary switch to dashboard page on Enter; 
// will later be built in withthe login submission.
window.onkeyup = function(e) {
	var key = e.keyCode ? e.keyCode : e.which;

	if (key == 13)
		window.location = "../Dashboard";
};