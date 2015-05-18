// Temporary switch to dashboard page on Enter; 
// will later be built in with the login submission.
window.onkeyup = function(e) {
//	signup(e);
};

function enter() {
	if (location.href.split("/").slice(-1) == 'createAccount.html') {
		if (document.getElementById('pass').value != document.getElementById('pass2').value) {
			alert("Your passwords don't match");
			return;
		}
	}
	window.location = "Dashboard";
}
function signup(e) {
	var key = e.keyCode ? e.keyCode : e.which;

	if (key == 13) {
		if (location.href.split("/").slice(-1) == 'createAccount.html') {
			if (document.getElementById('pass').value != document.getElementById('pass2').value) {
				alert("Your passwords don't match");
				return;
			}
		}
		window.location = "Dashboard";
	}
};
