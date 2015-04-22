// This data will actually be in a database, but JS arrays work for an example
var locations = [

];

var centers = [

];

var stats = [
	//[Listens, Percent Users, Distance, Likes, Percent Likes, Age]

];

// This is really messy, needs to be stored in a database and loaded into js
var data = 
[
];

var options = {

}

/*
var locations = [
	"Stanford University",
	"UCLA",
	"UCSD"
];

var centers = [
	[37.427517, -122.169875, 1000],
	[34.068954, -118.445164, 1200],
	[32.880128, -117.234099, 1100]
];

var stats = [
	//[Listens, Percent Users, Distance, Likes, Percent Likes, Age]
	[523, 35, .4, 45, 78, 23],
	[654, 33, .5, 60, 80, 22],
	[494, 25, .3, 32, 66, 22]
];

// This is really messy, needs to be stored in a database and loaded into js
var data = 
[
	[ //Stanford
		{ //Total Listens
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "Listens",
		            fillColor: "rgba(236, 147, 7, 0.2)",
		            strokeColor: "rgba(236, 147, 7, 1)",
		            pointColor: "rgba(236, 147, 7, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [20, 30, 25, 33, 28, 25, 35]
		        },
		    ]
		},
		[ //Percent Users
		    {
		        value: 35,
		        color:"#F7464A",
		        highlight: "#FF5A5E",
		        label: "% users reached"
		    },
		    {
		        value: 65,
		        color: "#46BFBD",
		        highlight: "#5AD3D1",
		        label: "% users unreached"
		    },
		],
		{ //Average Distance
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "Listens",
		            fillColor: "rgba(236, 147, 7, 0.2)",
		            strokeColor: "rgba(236, 147, 7, 1)",
		            pointColor: "rgba(236, 147, 7, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [.35, .39, .43, .42, .35, .38, .40]
		        },
		    ]
		},
		{ //Total Likes
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "Listens",
		            fillColor: "rgba(236, 147, 7, 0.2)",
		            strokeColor: "rgba(236, 147, 7, 1)",
		            pointColor: "rgba(236, 147, 7, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [3, 4, 3, 2, 3, 2, 3]
		        },
		    ]
		},
		[ //Percent Liked
		    {
		        value: 78,
		        color:"#F7464A",
		        highlight: "#FF5A5E",
		        label: "% liked"
		    },
		    {
		        value: 22,
		        color: "#46BFBD",
		        highlight: "#5AD3D1",
		        label: "% disliked"
		    },
		],
		{ //Average Age
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "Listens",
		            fillColor: "rgba(236, 147, 7, 0.2)",
		            strokeColor: "rgba(236, 147, 7, 1)",
		            pointColor: "rgba(236, 147, 7, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [22, 23, 21, 22, 22, 24, 23]
		        },
		    ]
		}
	],

	[ //UCLA
		{ //Total Listens
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "Listens",
		            fillColor: "rgba(236, 147, 7, 0.2)",
		            strokeColor: "rgba(236, 147, 7, 1)",
		            pointColor: "rgba(236, 147, 7, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [40, 30, 35, 37, 28, 35, 26]
		        },
		    ]
		},
		[ //Percent Users
		    {
		        value: 33,
		        color:"#F7464A",
		        highlight: "#FF5A5E",
		        label: "% users reached"
		    },
		    {
		        value: 67,
		        color: "#46BFBD",
		        highlight: "#5AD3D1",
		        label: "% users unreached"
		    },
		],
		{ //Average Distance
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "Listens",
		            fillColor: "rgba(236, 147, 7, 0.2)",
		            strokeColor: "rgba(236, 147, 7, 1)",
		            pointColor: "rgba(236, 147, 7, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [.53, .46, .48, .52, .53, .46, .50]
		        },
		    ]
		},
		{ //Total Likes
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "Listens",
		            fillColor: "rgba(236, 147, 7, 0.2)",
		            strokeColor: "rgba(236, 147, 7, 1)",
		            pointColor: "rgba(236, 147, 7, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [2, 3, 2, 3, 3, 3, 4]
		        },
		    ]
		},
		[ //Percent Liked
		    {
		        value: 80,
		        color:"#F7464A",
		        highlight: "#FF5A5E",
		        label: "% liked"
		    },
		    {
		        value: 20,
		        color: "#46BFBD",
		        highlight: "#5AD3D1",
		        label: "% disliked"
		    },
		],
		{ //Average Age
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "Listens",
		            fillColor: "rgba(236, 147, 7, 0.2)",
		            strokeColor: "rgba(236, 147, 7, 1)",
		            pointColor: "rgba(236, 147, 7, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [21, 22, 22, 23, 23, 24, 24]
		        },
		    ]
		}
	],

	[ //UCSD
		{ //Total Listens
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "Listens",
		            fillColor: "rgba(236, 147, 7, 0.2)",
		            strokeColor: "rgba(236, 147, 7, 1)",
		            pointColor: "rgba(236, 147, 7, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [24, 29, 35, 25, 26, 39, 29]
		        },
		    ]
		},
		[ //Percent Users
		    {
		        value: 25,
		        color:"#F7464A",
		        highlight: "#FF5A5E",
		        label: "% users reached"
		    },
		    {
		        value: 75,
		        color: "#46BFBD",
		        highlight: "#5AD3D1",
		        label: "% users unreached"
		    },
		],
		{ //Average Distance
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "Listens",
		            fillColor: "rgba(236, 147, 7, 0.2)",
		            strokeColor: "rgba(236, 147, 7, 1)",
		            pointColor: "rgba(236, 147, 7, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [.34, .37, .39, .40, .42, .41, .42]
		        },
		    ]
		},
		{ //Total Likes
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "Listens",
		            fillColor: "rgba(236, 147, 7, 0.2)",
		            strokeColor: "rgba(236, 147, 7, 1)",
		            pointColor: "rgba(236, 147, 7, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [2, 3, 2, 1, 2, 2, 1]
		        },
		    ]
		},
		[ //Percent Liked
		    {
		        value: 66,
		        color:"#F7464A",
		        highlight: "#FF5A5E",
		        label: "% liked"
		    },
		    {
		        value: 34,
		        color: "#46BFBD",
		        highlight: "#5AD3D1",
		        label: "% disliked"
		    },
		],
		{ //Average Age
		    labels: ["January", "February", "March", "April", "May", "June", "July"],
		    datasets: [
		        {
		            label: "Listens",
		            fillColor: "rgba(236, 147, 7, 0.2)",
		            strokeColor: "rgba(236, 147, 7, 1)",
		            pointColor: "rgba(236, 147, 7, 1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: [20, 22, 22, 21, 23, 22, 21]
		        },
		    ]
		}
	]
];

var options = {

}
*/
