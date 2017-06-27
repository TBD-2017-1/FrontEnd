angular.module('poliTweets')
	.controller('mapaCtrl', function($scope, leafletData, mapaService){

		$scope.rsr;
		$scope.regions = [];


		//$scope.mostrarMapa = function(){
			//if( typeof($scope.rsr) == "undefined" ){

				$scope.rsr = Raphael('mapa', '960', '660');

			// SEGMENTOS DEL MAPA

				$scope.path_1 = $scope.rsr.path("M165.485,50.469c1.994,1.606,4.656,2.835,5.563,5.393c1.521,3.426,1.706,7.313,3.477,10.631 c1.2,1.208,2.626,2.146,3.983,3.17c1.408,0.3,2.813,0.637,4.218,0.958c3.278,0.711,5.294,3.317,6.879,6.067 c0.57,0.923,1.16,1.837,1.749,2.751c0.792,1.916,0.51,3.863-0.413,5.671c-1.938,1.64-3.692,3.466-5.422,5.31 c-0.109,3.309,0.934,6.483,2.551,9.336c-2.473,2.442-6.117,2.628-9.156,3.983c-0.32,1.176-0.638,2.365-0.958,3.542 c-1.146-0.68-2.294-1.372-3.44-2.051c-2.292-0.989-4.413-2.338-6.482-3.736l-0.303,0.334c-6.732-5.223-13.543-10.33-20.299-15.507 c-3.367-1.854-6.504-4.111-9.38-6.647c-0.91-2.571,0.075-5.326,0.386-7.924c1.428-2.558,3.262-4.869,5.353-6.911 c2.653-1.674,4.703-4.209,5.793-7.147c1.127-1.889,1.994-4.06,3.704-5.524C157.083,50.441,161.381,50.364,165.485,50.469z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 1).data('name', 'Tarapacá');
				

				$scope.path_2 = $scope.rsr.path("M246.891,79.394c5.029,2.125,7.018,7.696,10.721,11.347c0.997,1.366,2.061,2.68,3.092,4.035 c0.878,1.13,1.815,2.218,2.767,3.303c0.511,1.159,1,2.313,1.491,3.479c-4.746,4.265-6.839,10.364-7.928,16.47 c-1.627,6.43,4.705,11.464,9.536,14.401c0.761,0.488,2.292,1.472,3.045,1.968c1.951,5.106-4.448,8.138-3.944,13.233 c1.607,2.768,4.63,5.394,4.403,8.788c-3.397,5.218-7.621,9.885-11.825,14.463c-0.884,3.063-1.468,6.276-3.796,8.667 c-3.836-2.454-7.742-5.028-10.522-8.7c-1.407-2.443-3.107-4.709-4.811-6.955c-4.494-2.912-9.062-5.729-13.265-9.087 c-4.987-3.252-7.083-9.752-12.926-11.896c-2.499,1.285-5.217,0.866-7.632-0.372c-0.542-1.923-1.14-3.826-1.791-5.708 c-3.073-5.154-7.242-9.52-10.558-14.497c-2.412-2.27-5.02-4.325-7.469-6.548c-1.74-2.361-4.241-3.937-6.402-5.879 c4.068-4.343,9.329-7.051,14.598-9.624c-1.424-1.729-3.771-3.322-3.405-5.877c0.44-2.101,1.511-3.983,2.204-5.999 c1.666-4.371,1.578-9.137,2.767-13.631c6.232,1.266,12.632,2.385,18.435,5.046c4.34,3.684,11.03,5.032,13.25,10.812 c4.704-2.601,10.002,0.197,14.846-1.615C242.339,85.28,243.859,81.802,246.891,79.394z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 2).data('name', 'Antofagasta');


				$scope.path_3 = $scope.rsr.path("M303.421,156.403c2.268,1.019,4.737,2.748,5.048,5.431c-0.092,1.791-0.891,3.441-1.415,5.133 c-1.456,3.427-2.686,7.314-1.211,10.959c1.015,1.022,2.045,2.056,3.074,3.076c1.402,2.593,1.965,5.49,1.918,8.413 c-0.001,4.121,1.571,7.997,3.614,11.505c1.869,2.247,3.447,4.698,4.826,7.272c1.764,3.504,5.365,5.402,7.759,8.386 c-1.397,1.763-2.695,3.656-4.417,5.124c-2.752,0.217-5.475-0.869-8.248-0.285c-1.067,1.169-2.118,2.365-3.13,3.592 c0.521,2.289,1.375,4.752,0.365,7.041c-2.074,3.421-6.174,4.471-9.725,5.65c-3.911-2.795-6.519-6.892-9.481-10.592 c-3.854-4.716-7.239-9.799-11.048-14.555c-2.314-3.022-6.162-4.414-8.407-7.456c-0.498-2.093-0.627-4.263-1.133-6.36 c-3.972-6.789-12.172-9.5-16.335-16.208c1.26-1.605,2.574-3.167,3.771-4.806c3.659-5.177,4.739-12.093,9.937-16.153 c2.97-2.635,3.378-6.982,1.945-10.518c-0.457-0.438-1.385-1.328-1.849-1.772c-0.208-1.364-0.408-2.722-0.615-4.086 c1.407-2.177,2.967-4.258,4.601-6.269c2.181,1.386,4.329,2.846,6.63,4.032c2.718,2.028,5.602,3.831,8.665,5.313 c1.414,1.581,2.454,3.438,3.598,5.214C294.96,157.109,299.758,154.761,303.421,156.403z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 3).data('name', 'Atacama');			


				$scope.path_4 = $scope.rsr.path("M330.606,218.962c5.647,3.036,10.064,7.929,14.713,12.267c0.052,2.733-0.811,5.917,1.196,8.196 c1.615,2.213,3.949,3.745,5.745,5.794c1.262,1.995,0.405,4.865,2.295,6.554c3.372,3.567,7.511,7.41,12.75,7.339 c3.347,0.012,5.79,2.74,7.95,4.989c-0.134,0.378-0.39,1.12-0.524,1.498c-4.545,1.872-10.321,2.411-12.496,7.602 c0.585,3.733-0.268,7.434-1.685,10.879c-3.446-3.461-7.869-5.463-12.656-6.104c-3.347-2.91-7.631-4.267-10.897-7.277 c-3.505-2.741-7.863-4.038-11.486-6.583c-3.65-2.256-3.937-6.897-5.834-10.381c-4.076-4.775-8.713-9.002-13.68-12.826 c1.714-1.422,3.582-2.635,5.563-3.653c1.837-1.046,5.489-2.093,4.224-4.909c-1.17-3.225-1.953-6.743-0.209-9.941 c2.703,0.841,5.156,2.251,7.472,3.856C325.721,223.997,327.937,221.235,330.606,218.962z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 4).data('name', 'Coquimbo');


				$scope.path_5 = $scope.rsr.path("M384.886,268.228c2.954,2.214,6.996,1.348,10.061,3.345c0.007,0.567,0.011,1.692,0.02,2.261 c-6.309,2.259-9.842,8.354-14.091,13.088c1.284,4.591,3.794,8.574,7.117,11.949c0.656,4.513,2.827,8.569,3.857,12.985 c-0.325,0.393-0.973,1.191-1.299,1.587c-1.773-1.063-3.472-2.27-4.878-3.792c-0.495-8.343-10.283-10.081-14.154-16.288 c-2.168-3.188-5.042-5.76-8.061-8.118c1.143-4.095,0.842-8.304,0.48-12.468c4.186-2.656,8.969-3.892,13.596-5.479 c0.306-0.753,0.929-2.249,1.234-3.002C380.822,265.581,382.855,266.911,384.886,268.228z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 5).data('name', 'Valparaíso');


				$scope.path_13 = $scope.rsr.path("M398.637,274.141c1.898-0.026,3.801-0.062,5.705-0.097c4.467,4.218,9.554,7.703,14.062,11.851 c1.086,1.64,3.245,4.501,0.631,5.771c-3.283,0.729-6.851-0.084-9.964,1.429c-1.734,0.771-3.469,1.525-5.264,2.132 c-0.472,0.532-1.422,1.615-1.887,2.155c0.76,2.823,1.279,5.709,1.34,8.642c-1.403-0.068-2.796-0.113-4.188-0.144 c-1.577,1.825-3.159,3.646-4.825,5.39c-0.749-2.547-0.859-5.226-1.544-7.773c-1.304-3.165-2.984-6.167-4.192-9.372 c-0.312-0.412-0.944-1.259-1.255-1.671c-0.592-0.928-1.195-1.84-1.818-2.729c-1.748-2.575,0.078-4.878,2.605-5.796 C392.245,281.478,395.762,278.04,398.637,274.141z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 13).data('name', 'Metropolitana de Santiago');


				$scope.path_6 = $scope.rsr.path("M419.519,293.902c3.605,2.681,5.754,6.859,7.277,10.977c-1.022,1.754-3.265,1.992-4.872,3.002 c-4.189,2.436-9,4.593-11.2,9.216c-1.296,4.436-3.487,9.003-7.985,10.911c-2.712-1.153-3.734-3.788-4.914-6.245 c-1.875-1.87-4.159-3.27-6.034-5.139c2.377-3.643,5.674-6.963,9.942-8.212c1.098-1.171,2.161-2.367,3.219-3.572 c0.29-1.444,0.591-2.886,0.851-4.327c0.705-1.968,1.667-3.822,2.734-5.605C412.214,294.811,415.918,294.759,419.519,293.902z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 6).data('name', 'OHiggins');


				$scope.path_7 = $scope.rsr.path("M443.979,318.746c0.895,0.544,2.366,0.78,2.606,1.989c1.347,4.806,0.134,9.781-0.246,14.635 c-0.216,3.121-3.093,5.063-5.28,6.917c-5.574,3.313-10.921,6.998-16.637,10.07c-1.626,0.845-3.261,1.682-4.881,2.552 c-4.963-3.286-9.144-8.056-11.049-13.765c-1.241-3.893-3.653-7.227-5.581-10.78c3.854-1.819,7.517-4.313,9.875-7.932 c1.175-2.77,1.398-6.14,3.821-8.228c3.091-2.741,7.028-4.229,10.641-6.162c1.404,0.947,2.817,1.902,4.243,2.841 C436.06,312.861,439.286,317.001,443.979,318.746z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 7).data('name', 'Maule');


				$scope.path_8 = $scope.rsr.path("M467.841,352.47c2.38,1.503,5.143,2.202,7.913,2.573c0.415,0.408,1.248,1.206,1.672,1.607 c-1.881,2.516-3.9,4.919-6.023,7.246c-3.944,2.525-7.258,6.063-11.714,7.737c-3.845,1.71-8.718,2.964-10.16,7.488 c-1.008,6.31,4.053,11.191,7.906,15.458c-0.38,1.816-0.813,3.616-1.258,5.434c-5.917-3.175-10.625-9.665-17.821-9.731 c-1.885-0.826-3.53-2.081-5.099-3.388c-0.255-7.693-3.75-14.648-6.565-21.643c-1.01-1.607-2.048-3.194-3.197-4.707 c-0.415-0.684-1.248-2.048-1.67-2.739c4.903-2.045,9.896-4.481,13.333-8.672c4.446-3.979,9.519-7.207,13.969-11.181 C455.086,343.122,461.117,348.298,467.841,352.47z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 8).data('name', 'Bio-Bio');


				$scope.path_9 = $scope.rsr.path("M477.425,358.217c3.05,0.046,5.177,2.689,7.633,4.162c3.082,1.794,2.368,5.658,2.912,8.641 c4.023,4.311,7.466,9.06,10.771,13.938c-1.798,2.188-3.655,4.353-5.827,6.189c-6.224,4.28-10.463,10.541-15.141,16.313 c-0.479,0.184-1.425,0.555-1.896,0.746c-4.782-2.288-10.579-2.687-14.335-6.787c-1.13-0.055-2.249-0.11-3.366-0.181 c1.524-2.965,2.079-6.838-0.252-9.564c-2.333-2.581-5.151-4.738-6.901-7.81c0.692-4.479,4.581-7.599,8.544-9.266 c4.525-1.506,9.467-2.523,13.099-5.834C475.268,365.746,474.792,361.182,477.425,358.217z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 9).data('name', 'La Araucanía');


				$scope.path_14 = $scope.rsr.path("M498.641,389.128c0.762,0.12,2.279,0.342,3.04,0.445c0.473,1.205,0.977,2.409,1.491,3.607 c4.847,4.607,9.959,8.993,14.241,14.151c-4.225,5.277-9.515,9.988-15.923,12.388c-0.179,0.24-0.529,0.716-0.708,0.956l-0.613-0.319 c-5.338,1.969-11.845,2.222-16.555-1.398c-3.141-2.057-5.561-6.186-3.883-9.908c2.248-3.869,5.362-7.185,9.016-9.747 C492.733,396.594,494.618,391.784,498.641,389.128z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 14).data('name', 'Los Ríos');


				$scope.path_10a = $scope.rsr.path("M543.214,456.364c1.226,0.931,2.458,1.872,3.7,2.804c-0.378,0.312-1.136,0.964-1.519,1.284l1.594,0.727 c-0.452,0.279-1.363,0.85-1.821,1.138l1.224,0.98l-1.256,1.021c0.419,0.18,1.278,0.529,1.713,0.708 c-0.64,0.805-1.272,1.619-1.889,2.446c-1.819-1.428-5.436-4.284-7.243-5.705c2.639,2.271,4.803,4.933,6.495,7.984 c0.054,1.023,0.124,2.062,0.21,3.113c-0.341,2.603-1.724,4.798-3.404,6.743c-5.91-2.479-10.941-7.094-13.547-12.985 c-5.141-4.04-10.065-8.338-15.394-12.13c1.37-1.874,2.868-3.685,4.892-4.901c0.231-0.097,0.698-0.313,0.936-0.42 c1.79,0.027,3.593,0.054,5.398,0.159c1.926,1.145,3.764,2.449,5.602,3.751l-1.208,0.512c2.311,3.732,6.056,5.785,9.836,7.747 c1.172-1.737,2.387-3.43,3.646-5.1C541.687,456.276,542.713,456.335,543.214,456.364z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 10).data('name', 'Los Lagos');

				$scope.path_10b = $scope.rsr.path("M532.406,449.068c1.376,1.002,2.751,2.005,4.129,3.02c0.995,1.656,1.908,3.402,1.87,5.416 c-0.899-0.091-2.686-0.283-3.581-0.379c-1.104-0.926-2.276-1.779-3.238-2.836C530.787,452.496,531.632,450.69,532.406,449.068z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 10).data('name', 'Los Lagos');

				$scope.path_10c = $scope.rsr.path("M561.035,439.826c6.021,1.546,11.59,4.812,16.208,8.932c-2.114,1.298-4.595,1.387-6.907,2.017 c-2.355,1.055-4.269,2.855-6.296,4.401c-0.327,1.424-0.676,2.831-0.979,4.276c-1.852,1.965-4.01,3.608-6.378,4.922l-0.855-0.933 c-0.183,0.39-0.555,1.166-0.746,1.553c-2.707-0.82-5.379-1.891-6.214-4.861c0.286-0.542,0.86-1.618,1.146-2.155 c-2.152-4.081-5.828-6.829-9.366-9.61c-1.688-1.911-3.564-3.616-5.396-5.363c0.546-0.562,1.628-1.683,2.176-2.244l-0.773-0.216 c-0.566-1.138-1.142-2.245-1.74-3.345l1.1-1.222c-3.127-1.32-5.182,2.173-7.528,3.603c-0.945-1.044-1.895-2.115-2.813-3.161 c0.386,0.14,1.166,0.426,1.559,0.56c-0.477-2.023,1.307-5.157-1.005-6.283c-3.15,1.866-5.761,4.594-7.604,7.739 c-0.336,2.018-0.848,3.999-1.303,5.987c-1.114,1.375-2.199,2.761-3.284,4.161c-10.613-3.095-18.863-11.155-26.279-18.976 c-0.096-0.457-0.272-1.362-0.358-1.814c1.372-0.444,2.738-0.88,4.1-1.356c3.186-1.521,6.293-3.205,9.519-4.665 c0.164-0.176,0.487-0.534,0.644-0.716c1.305-0.599,2.605-1.226,3.912-1.823c1.253-0.844,2.535-1.639,3.81-2.442 c2.176-1.134,4.313-2.361,6.457-3.571c1.036-0.695,2.058-1.419,3.068-2.147l0.87,0.688c0.204-0.513,0.606-1.535,0.816-2.045 c0.325,0.46,0.984,1.381,1.319,1.85l0.633-0.978c2.302,1.266,4.732,2.272,7.072,3.474c4.212,2.092,8.235,4.566,11.964,7.447 c0.376,0.682,1.118,2.047,1.481,2.731c-1.08,1.912-0.199,3.632,1.021,5.186c1.664,1.907,3.261,3.901,4.468,6.147 c1.85,1.899,3.99,3.481,6.164,4.988c1.578,0.23,3.149,0.505,4.724,0.786C559.836,440.968,560.639,440.213,561.035,439.826z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 10).data('name', 'Los Lagos');


				$scope.path_11a = $scope.rsr.path("M589.143,449.12c2.457,0.877,4.66,2.253,6.7,3.883c-1.22,2.148-2.217,4.421-3.042,6.765 c-0.045,1.101-0.1,2.218-0.147,3.341l0.737,0.468l-1.092,0.54c0.411,0.365,1.229,1.091,1.642,1.455 c1.785-0.999,3.57-1.992,5.345-3.023c0.711,0.066,2.152,0.2,2.864,0.268c1.535,1.28,3.029,2.632,4.21,4.283 c4.963,8.146,13.263,13.208,19.683,20.034c3.142,2.989,6.656,5.545,9.984,8.313c0.834,1.363,1.776,2.671,2.744,3.96 c-0.208,0.115-0.628,0.358-0.842,0.482c0.749,1.258,1.503,2.531,2.249,3.812c-0.08,0.115-0.232,0.339-0.31,0.455 c0.338,1.036,0.674,2.093,1.004,3.159c0.591,0.929,1.21,1.854,1.839,2.784l-1.045,0.818c3.542,3.434,7.924,5.812,11.497,9.205 c1.67,1.886,3.188,3.918,5.165,5.512c0.836,1.568,1.726,3.117,2.586,4.691c0.134,0.132,0.413,0.379,0.549,0.514 c0.421,1.252,0.875,2.518,1.346,3.771c-0.369,1.111-0.725,2.235-1.062,3.369c-6.089,3.558-14.19,0.964-19.451,6.313 c-0.82-0.256-2.458-0.749-3.282-0.995c-0.24-0.278-0.725-0.855-0.965-1.148l-0.677,1.174c-1.99-1.513-3.942-3.06-5.874-4.616 c1.127-1.356,2.269-2.685,3.427-4.001c0.147,0.298,0.457,0.873,0.604,1.172c1.577-2.07,3.176-4.119,4.66-6.248 c-0.82-0.09-1.637-0.173-2.441-0.238c-1.189-0.446-2.377-0.864-3.573-1.239c-1.146-0.806-2.276-1.6-3.402-2.404 c-0.893,1.092-1.769,2.186-2.633,3.303c-0.104,1.001-0.186,2.007-0.273,3.019c-1.206,1.521-2.406,3.032-3.627,4.542 c-1.262,0.366-2.511,0.768-3.749,1.188l-0.616-0.832l-0.716,1.804l-0.791-2.107c-0.236,0.313-0.715,0.915-0.957,1.221 c-1.634-1.333-3.279-2.639-4.93-3.922c-0.354-2.528-0.468-5.093,0.054-7.6c-1.834-1.456-3.658-2.902-5.459-4.367 c-2.29,1.922-4.681,3.715-7.091,5.468c-0.272-0.026-0.818-0.078-1.093-0.102c-0.472,0.608-1.436,1.823-1.913,2.427 c0.852,2.016,1.923,3.949,2.904,5.915l-1.655,1.266l2.156-0.742c-1.396,2.098-2.911,4.126-4.634,5.975 c-1.63-1.357-3.291-2.675-4.959-3.968l1.052-0.521c-0.407-0.388-1.217-1.17-1.625-1.558c-0.3-1.743-0.753-3.457-1.366-5.115 c-0.416-2.245-0.812-4.498-1.143-6.752c-0.164-0.131-0.501-0.383-0.672-0.506c-0.223-3.598-0.723-7.171-1.358-10.712 c1.553-2.699,3.741-4.946,6.544-6.324c1.32,0.64,2.645,1.27,4.02,1.834c3.013,0.858,6.034,1.684,9.129,2.171 c-0.577-0.674-1.728-2.007-2.303-2.667c-5.524-6.792-12.83-11.871-19.351-17.667c-1.209-1.581-2.344-3.209-3.259-4.97 c0.031-2.551-0.422-5.055-0.851-7.554c0.039-1.498,0.088-2.99,0.146-4.48c-1.492-1.691-2.818-3.815-5.356-3.593 c-1.395,1.307-2.901,2.498-4.459,3.611l-0.845-0.771l-0.753,1.241l-0.508-1.629l-0.321,1.34c-1.554-0.747-3.11-1.457-4.672-2.123 c-2.313-3.198,0.482-6.547,1.302-9.725c0.833-1.05,1.677-2.08,2.52-3.096c2.527-4.732,8.502-4.462,12.483-7.328l0.137,0.375 c1.005-0.492,2.017-0.965,3.039-1.418c1.292,0.256,2.595,0.525,3.896,0.818c0.428-0.492,1.287-1.48,1.716-1.971l0.711,0.792 L589.143,449.12z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 11).data('name', 'Aysén');

				$scope.path_11b = $scope.rsr.path("M572.49,473.069c1.939,1.498,3.866,3.025,5.831,4.508c-0.056,0.07-0.176,0.205-0.234,0.262 c1.998,2.019,1.575,4.822-0.229,6.81c-3.078-1.304-6.53-2.904-7.016-6.621l-0.129-0.383 C571.313,476.114,571.89,474.582,572.49,473.069z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 11).data('name', 'Aysén');

				$scope.path_11c = $scope.rsr.path("M583.578,496.537c1.913,1.452,3.813,2.936,5.652,4.494l-1.304,0.729l0.958,0.884 c-0.582,0.814-1.764,2.432-2.345,3.247c-2.322-1.917-4.674-3.781-7.009-5.646C580.883,499.005,582.245,497.787,583.578,496.537z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 11).data('name', 'Aysén');

				$scope.path_11d = $scope.rsr.path("M557.395,476.961c1.548,0.576,3.045,1.278,4.487,2.116c-1.841,1.195-3.724,2.316-5.702,3.264 c-1.1,0.71-2.171,1.469-3.205,2.271l-0.222-1.057c-0.373,0.471-1.118,1.412-1.482,1.888c-1.604-1.515-1.882-3.597-1.956-5.662 c1.938-1.462,3.95-2.84,6.068-4.031C555.887,476.047,556.896,476.657,557.395,476.961z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 11).data('name', 'Aysén');

				$scope.path_11e = $scope.rsr.path("M564.753,493.693c3.719-1.939,7.938-1.964,11.995-2.461c1.511,1.212,3.021,2.433,4.519,3.698 c-1.754,1.698-3.807,3.031-6.094,3.873c-0.077,0.242-0.229,0.725-0.302,0.959C571.203,498.272,567.569,496.529,564.753,493.693z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 11).data('name', 'Aysén');

				$scope.path_11f = $scope.rsr.path("M559.536,482.922c0.825,0.668,2.461,2.016,3.283,2.681c0.194,1.059,0.397,2.141,0.607,3.212 c-0.334,1.193-0.622,2.394-0.895,3.606l-1.333,0.91l2.24-0.474c-0.714,0.928-2.112,2.792-2.813,3.718 c-1.107-0.981-2.202-1.95-3.288-2.915c-0.177-1.695-0.392-3.384-0.644-5.065c0.332-0.451,0.994-1.365,1.327-1.817l-1.04-0.442 C557.617,485.484,558.9,483.771,559.536,482.922z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 11).data('name', 'Aysén');

				$scope.path_11g = $scope.rsr.path("M626.761,540.194c3.655-0.523,6.518,3.483,8.142,6.376c0.1,0.553,0.274,1.648,0.374,2.2 c-0.956,2.124-2.142,4.134-3.354,6.131c0.133,0.412,0.406,1.242,0.54,1.653c-0.966,2.118-1.947,4.238-3.015,6.314 c-2.648-1.973-5.085-4.196-7.486-6.446c0.507-0.785,1.016-1.569,1.536-2.341c1.642-0.588,4.814,0.805,5.285-1.388 c-0.309-0.591-0.937-1.764-1.246-2.354C625.908,547.354,624.265,543.164,626.761,540.194z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 11).data('name', 'Aysén');

				$scope.path_11h = $scope.rsr.path("M578.283,502.688c2.209,1.814,4.477,3.575,6.752,5.34c-0.843,0.773-1.677,1.554-2.513,2.333 c-2.125-1.683-4.259-3.401-5.696-5.727C577.192,504.143,577.912,503.171,578.283,502.688z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 11).data('name', 'Aysén');

				$scope.path_11i = $scope.rsr.path("M605.64,524.327c1.967,1.443,3.79,3.104,5.609,4.754c0.115,0.817,0.362,2.456,0.485,3.269 c-1.527,2.183-3.915,3.148-6.23,1.274C604.379,530.552,603.933,527.3,605.64,524.327z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 11).data('name', 'Aysén');

				$scope.path_11j = $scope.rsr.path("M618.73,540.296c0.503,0.896,1.515,2.692,2.016,3.588c0.398,0.433,1.209,1.277,1.613,1.701l-0.778,0.837 l1.071,0.646c-0.31,0.42-0.909,1.257-1.203,1.677c0.367,0.227,1.117,0.683,1.501,0.907c-0.751,0.913-2.238,2.744-2.988,3.657 l0.356-2.526l-1.061,2.35c-2.059-1.363-4.083-2.753-5.971-4.313C614.127,545.439,616.576,542.899,618.73,540.296z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 11).data('name', 'Aysén');

				$scope.path_11k = $scope.rsr.path("M580.148,514.705c2.182,1.644,4.321,3.389,6.49,5.096c-0.54,0.696-1.609,2.081-2.15,2.775 c-0.641,0.243-1.938,0.735-2.586,0.976c-1.02-0.681-2.035-1.359-3.044-2.021C578.771,519.181,579.304,516.883,580.148,514.705z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 11).data('name', 'Aysén');

				
				$scope.path_12a = $scope.rsr.path("M829.863,551.853c0.691,0.434,1.39,0.873,2.097,1.317c-0.599,1.591-1.219,3.194-1.915,4.748 c-1.286-0.471-2.549-0.937-3.81-1.439c0.348-1.229,0.705-2.451,1.063-3.661C828.144,552.493,829.003,552.166,829.863,551.853z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12b = $scope.rsr.path("M819.781,556.2c0.991,0.939,1.978,1.899,2.965,2.875c-0.297,1.182-0.581,2.359-0.848,3.551 c-1.07,1.283-2.081,2.639-3.252,3.841c-2.059,1.035-4.295-0.445-6.235-1.052C814.658,562.18,817.215,559.179,819.781,556.2z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12c = $scope.rsr.path("M829.188,568.01c1.416,1.033,2.817,2.081,4.231,3.151c0.259,2.248-0.257,4.377-1.868,6.022 c-1.12-0.839-2.283-1.579-3.238-2.58C827.861,572.356,828.654,570.152,829.188,568.01z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');
					
				$scope.path_12d = $scope.rsr.path("M814.409,571.796c3.56,0.502,7.37,0.587,10.46,2.692c-3.481,2.894-8.492,2.098-12.091,4.885 C812.163,576.642,812.275,573.859,814.409,571.796z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12e = $scope.rsr.path("M745.188,537.754c4.989-2.464,6.744-9.842,12.966-10.012c0.154,0.594,0.441,1.791,0.588,2.379 c-0.584,1.158-1.178,2.309-1.824,3.43c-2.021,1.066-3.559,2.78-4.972,4.546c-0.183,3.952,0.097,7.911-0.308,11.866 c-1.668,2.378-3.794,4.994-3.285,8.103c0.708,2.501,2.34,4.598,3.535,6.889c0.287,0.441,0.853,1.338,1.133,1.79 c3.004,4.855,7.174,8.803,10.694,13.265c-2.051,2.587-4.925,4.263-7.62,6.083c-1.476,0.691-2.959,1.367-4.435,2.021 c-1.165-0.911-2.312-1.846-3.433-2.784c-1.75-5.537-0.448-11.203-0.139-16.789c-2.017-1.868-4.893-1.941-7.437-2.338 c-2.469-0.783-3.474,2.11-4.8,3.571c-2.136,3.82-6.631,4.888-10.549,5.854c-0.262,0.2-0.775,0.609-1.029,0.815 c0.049,3.319,0.509,6.696-0.099,9.99c-0.521,2.396-2.941,2.646-4.952,2.672c-1.523-0.975-3.061-1.916-4.615-2.806 c-2-2.271-4.346-4.209-6.805-5.953c-4.231-1.339-8.641-3.634-13.18-2.437c-2.02,0.505-4.121,0.663-6.089-0.107 c0.001-2.015,1.863-5.053-0.974-5.901c-2.734-0.56-5.532-0.495-8.302-0.443c-1.073-0.852-2.11-1.687-3.168-2.525 c-2.479,0.649-4.932,1.49-7.5,1.686c-2.046-2.183-2.668-5.293-4.529-7.613c-1.58-2.694-4.703-3.662-7.177-5.256 c-5.366-2.761-10.111-6.548-14.531-10.613c1.159-2.17,2.927-3.869,4.805-5.431c5.703,2.544,11.729-0.118,17.264-1.754 c2.703,2.563,3.043,6.573,5.681,9.175c3.515,3.999,6.417,9.352,12.273,10.063c2.546-0.011,5.25,0.347,7.624-0.782 c2.379-2.031,3.936-5.495,7.396-5.853c2.385-0.609,4.654,0.553,6.512,1.961c4.702,3.486,9.053,7.431,13.865,10.776 c4.394-1.353,8.169-4.039,11.579-7.055C735.928,552.412,738.454,543.429,745.188,537.754z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12f = $scope.rsr.path("M766.618,535.028c12.57,9.902,24.978,20.008,37.606,29.83c-0.037,1.961,0.616,4.342-1.007,5.889 c-4.222,5.114-9.063,9.66-13.331,14.739c-2.35,0.063-4.923-0.152-6.949,1.292c-4.17,2.78-5.63,7.888-6.69,12.509 c-1.069,1.143-1.845,3.183-3.769,2.564c-1.459-1.246-1.313-3.3-1.618-5.009c0.711-1.313,1.414-2.618,2.103-3.937 c2.924-1.868,4.646-4.943,6.628-7.685c1.973-3.516,4.012-6.991,5.582-10.71c1.066-2.855,4.169-3.777,6.751-4.729 c1.532-1.019,3.049-2.075,4.433-3.287c-0.325-0.36-1.001-1.074-1.327-1.436c-3.185-0.521-6.402-0.827-9.629-0.845 c-2.416,2.627-5.472,5.501-9.363,4.84c-4.271-1.308-7.225-5.116-11.533-6.427c-1.064,1.198-2.091,2.427-3.137,3.652 c-2.365-1.544-4.003-3.852-5.523-6.167c-0.501-1.735-1.005-3.465-1.434-5.194c2.434-4.633,3.249-9.829,5.192-14.645 C762.037,538.669,764.365,536.89,766.618,535.028z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12g = $scope.rsr.path("M809.167,569.313c0.271,0.367,0.825,1.101,1.102,1.462c-1.102,1.614-2.342,3.144-3.205,4.909 c-0.855,2.334,0.131,4.777,0.521,7.103c-1.781,0.668-3.54,1.404-5.272,2.174c-1.17-0.877-2.338-1.752-3.484-2.622 C799.891,576.57,804.112,572.004,809.167,569.313z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12h = $scope.rsr.path("M793.421,589.076c0.819,0.623,1.652,1.261,2.483,1.905c-1.406,2.932-2.807,6.02-5.35,8.164 c-3.135,0.832-6.444,0.289-9.63,0.058C784.151,594.908,787.143,588.783,793.421,589.076z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12i = $scope.rsr.path("M771.541,574.356c0.503-0.315,1.513-0.957,2.007-1.278c0.31,2.848-1.479,5.004-3.087,7.111 c-0.521-0.529-1.592-1.594-2.124-2.131c-0.862-1.31-1.821-2.566-2.767-3.802c0.237-0.476,0.716-1.45,0.951-1.94 C768.192,572.979,769.87,573.646,771.541,574.356z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12j = $scope.rsr.path("M761.196,588.898c3.219-1.276,6.291-3.523,9.932-2.514c-1.6,2.356-3.1,4.843-5.171,6.826 c-1.834,1.25-3.979,1.974-5.958,2.943c-1.137-1.093-2.527-2.105-2.479-3.841C758.443,590.875,759.788,589.81,761.196,588.898z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');			

				$scope.path_12k = $scope.rsr.path("M739.286,571.449c1.078-1.198,2.602-1.076,4.056-0.88c-0.204,3.425-0.914,6.88-2.799,9.802 c0.246,4.893,1.783,10.693-2.349,14.473c-3.787-0.971-7.721-1.514-11.267-3.19c0.142-0.729,0.422-2.178,0.562-2.896 c0.884-1.099,1.755-2.198,2.64-3.266c-0.03-1.876-0.99-4.144,0.625-5.632C733.425,576.895,736.133,573.912,739.286,571.449z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');	

				$scope.path_12l = $scope.rsr.path("M748.824,592.271c3.597,1.052,7.08,2.641,9.746,5.366c-1.803,2.5-4.588,3.854-7.455,4.72 c-0.679,0.919-1.353,1.849-2.006,2.787c-3.811-0.941-7.584,0.421-11.396,0.497c-0.391-0.489-1.161-1.479-1.546-1.978 c2.271-3.267,5.434-6.03,9.533-6.469C746.549,595.431,747.697,593.854,748.824,592.271z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12m = $scope.rsr.path("M726.166,598.538c1.673-1.239,4.337-2.927,5.859-0.471c0.313,3.437-1.351,7.581-5.06,8.316 c-3.062,0.495-6.191,0.4-9.239,0.981c-0.341-0.359-1.024-1.094-1.367-1.452C719.555,603.369,722.949,601.068,726.166,598.538z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12n = $scope.rsr.path("M713.482,590.729c1.714,0.492,3.377,1.184,5.05,1.859c0.397,0.8,0.812,1.613,1.226,2.427 c-1.606,1.012-3.247,1.983-4.885,2.942c-0.555-0.107-1.68-0.313-2.241-0.411c-1.619-0.951-3.259-1.844-4.981-2.535 c-1.325-0.985-2.622-1.989-3.898-3.002c-0.765-1.207-1.582-2.401-2.37-3.563c-0.37-0.639-1.111-1.928-1.485-2.568 c2.565-4.602,9.617-1.716,10.683,2.637C711.525,589.254,712.494,589.996,713.482,590.729z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12o = $scope.rsr.path("M700.868,595.532c2.751,0.444,5.315,1.571,7.186,3.718c-1.369,1.226-2.843,2.314-4.372,3.311 c-1.686-1.401-3.306-3.655-5.763-2.246c-1.416-1.736-2.689-3.563-3.802-5.489c0.367-0.334,1.093-1.011,1.468-1.352 C697.37,594.085,699.142,594.75,700.868,595.532z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');;

				$scope.path_12p = $scope.rsr.path("M681.182,580.751c2.778,1.629,5.579,3.264,8.15,5.251c0.316,0.582,0.967,1.761,1.287,2.334 c-0.537,3.288-2.158,6.215-4.107,8.867C683.527,592.196,682.58,586.327,681.182,580.751z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12q = $scope.rsr.path("M645.061,551.883c6.423,5.45,13.254,10.355,19.852,15.587c-0.072,0.492-0.206,1.483-0.283,1.982 c-0.804,0.435-1.608,0.869-2.389,1.322c-1.164-0.399-2.328-0.799-3.468-1.18c-2.804,1.236-5.623,2.473-8.652,3.042 c-3.581-2.725-4.958-7.107-6.455-11.141c-1.178-1.202-2.35-2.396-3.505-3.596c-0.131-1.379-0.256-2.767-0.356-4.138 C641.542,553.1,643.291,552.456,645.061,551.883z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12r = $scope.rsr.path("M660.356,578.076c4.067-2.264,8.523-3.747,13.121-4.414c-0.06,0.834-0.105,1.664-0.144,2.516 c-4.045,1.273-7.865,3.145-11.389,5.495C661.334,580.496,660.832,579.294,660.356,578.076z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');

				$scope.path_12s = $scope.rsr.path("M674.882,579.394c0.378,4.255-1.438,8.941-6.058,9.86C667.975,584.789,671.813,581.849,674.882,579.394z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 12).data('name', 'Magallanes');


				$scope.path_15 = $scope.rsr.path("M138.201,45.719c3.162,1.742,6.304,3.557,9.589,5.063c0.18,0.449,0.526,1.349,0.698,1.792 c-1.098,2.575-2.641,4.925-4.532,6.986c-3.633,4.036-6.772,8.541-9.383,13.299c0.301,1.31,0.719,2.586,1.254,3.827 c-1.423,0.008-3.11,0.559-4.27-0.603c-5.479-4.357-11.02-8.636-16.375-13.149c-0.524-3.555,1.75-6.665,1.375-10.167 c-2.475-2.32-4.563-4.996-7.02-7.34c0.001-1.964-0.886-4.403,0.997-5.795c1.873-0.543,3.854-0.289,5.773-0.361 c3.271-0.036,6.757-0.666,9.813,0.889c3.426,1.925,6.072,5.122,9.907,6.336C136.576,46.304,137.654,45.909,138.201,45.719z")
					.attr({fill: '#83a8be', "stroke": '#0e374f', 'stroke-width': '0','stroke-opacity': '1'})
					.data('id', 15).data('name', 'Arica y Parinacota');

			// GRUPOS DE SEGMENTOS PARA REGIONES 12, 13 y 14

				$scope.path_10 = $scope.rsr.set();
				$scope.path_11 = $scope.rsr.set();
				$scope.path_12 = $scope.rsr.set();
				
				$scope.path_10.push(
					$scope.path_10a,
					$scope.path_10b,
					$scope.path_10c
					);

				$scope.path_11.push( 
					$scope.path_11a, 
					$scope.path_11b, 
					$scope.path_11c, 
					$scope.path_11d, 
					$scope.path_11e, 
					$scope.path_11f, 
					$scope.path_11g, 
					$scope.path_11h, 
					$scope.path_11i, 
					$scope.path_11j, 
					$scope.path_11k
					);

				$scope.path_12.push(
					$scope.path_12a,
					$scope.path_12b,
					$scope.path_12c,
					$scope.path_12d,
					$scope.path_12e,
					$scope.path_12f,
					$scope.path_12g,
					$scope.path_12h,
					$scope.path_12i,
					$scope.path_12j,
					$scope.path_12k,
					$scope.path_12l,
					$scope.path_12m,
					$scope.path_12n,
					$scope.path_12o,
					$scope.path_12p,
					$scope.path_12q,
					$scope.path_12r,
					$scope.path_12s
					);

				$scope.regions.push(
					$scope.path_1,
					$scope.path_2,
					$scope.path_3,
					$scope.path_4,
					$scope.path_5,
					$scope.path_6,
					$scope.path_7,
					$scope.path_8,
					$scope.path_9,
					$scope.path_10,
					$scope.path_11,
					$scope.path_12,
					$scope.path_13,
					$scope.path_14,
					$scope.path_15,
					);


			for (var i = 0; i < $scope.regions.length; i++) {

		    $scope.regions[i].mouseover(function(e){
	    		this.attr({'stroke-width': '3'});
	        this.node.style.opacity = 0.7;
	        document.getElementById('region-name').innerHTML = this.data('name');
	        $scope.updatePieGraph( this.data('id') ); console.log( this.data('name') );
		    });

		    $scope.regions[i].mouseout(function(e){
		    	this.attr({'stroke-width': '0'});
		      this.node.style.opacity = 1;
		    });
			}

			//}
		//}


		$scope.colores = ['#668fa7', '#467896', '#245776', '#154560', '#0e374f'];

		$scope.chile_data = [];

		$scope.aprob= [];                 // aprobación actual de cada region
		$scope.tasa_pos=[];            		// tasa de aprecioaciones positivas de cada region
		$scope.tasa_neu=[];             	// tasa de aprecioaciones neutrales de cada region
		$scope.tasa_neg=[];            		// tasa de aprecioaciones negativas de cada region
		$scope.tPos= ['Tasa Positiva'];
		$scope.tNeu= ['Tasa Neutral'];
		$scope.tNeg= ['Tasa Negativa'];


		$scope.partiPieChartA = c3.generate({
    	bindto: '#mapaChart1',
    	data: {
	      columns: [
	      	['Tasa Neutral', 20],
	      	['Tasa Positiva', 30],
	      	['Tasa Negativa', 50]
	      ],
	      type : 'pie',
	    },
	    color: {
	      pattern: ['#848f94', '#5fa752', '#d51c2a']
	    }
		});


		mapaService.getMapaAprob().then(function(data1){
			$scope.dataA = data1;

			mapaService.getMapaPos().then(function(data2){
				$scope.dataB = data2;

				mapaService.getMapaNeg().then(function(data3){
					$scope.dataC = data3;

					mapaService.getMapaNeu().then(function(data4){
						$scope.dataD = data4;

						$scope.loadMapa($scope.dataA, $scope.dataB, $scope.dataC, $scope.dataD);

					}, function(error){
					});
				}, function(error){
				});
			}, function(error){
			});
		}, function(error){
		});


		$scope.loadMapa = function(apr, pos, neg, neu){
			var aprob_data = apr.data;
			var pos_data = pos.data;
			var neg_data = neg.data;
			var neu_data = neu.data;

			var i = 0;
			var j = 0;

			while(i < 15){
				$scope.aprob[i] = 0;
				$scope.tasa_pos[i] = 0;
				$scope.tasa_neg[i] = 0;
				$scope.tasa_neu[i] = 0;
				i++;
			}

			i = 0;
			j = 0;
			while((i < 15) && (j < aprob_data.length)){

				var aux = aprob_data[j].region.id -1;

				if($scope.aprob[aux] == 0){
					$scope.aprob[aux] = aprob_data[j].valor;

					if(aprob_data[j].valor > 83){
						$scope.regions[i].attr({'fill': $scope.colores[4]});

					}else if(aprob_data[j].valor > 67){
						$scope.regions[i].attr({'fill': $scope.colores[3]});

					}else if(aprob_data[j].valor > 51){
						$scope.regions[i].attr({'fill': $scope.colores[2]});

					}else if(aprob_data[j].valor > 35){
						$scope.regions[i].attr({'fill': $scope.colores[1]});

					}else{
						$scope.regions[i].attr({'fill': $scope.colores[0]});
					}

					i++;
				}
				j++;
			}

			i = 0;
			j = 0;
			while((i < 15) && (j < pos_data.length)){

				var aux = pos_data[j].region.id -1;

				if($scope.tasa_pos[aux] == 0){
					$scope.tasa_pos[aux] = pos_data[j].valor;
					i++;
				}
				j++;
			}

			i = 0;
			j = 0;
			while((i < 15) && (j < neg_data.length)){

				var aux = neg_data[j].region.id -1;

				if($scope.tasa_neg[aux] == 0){
					$scope.tasa_neg[aux] = neg_data[j].valor;
					i++;
				}
				j++;
			}

			i = 0;
			j = 0;
			while((i < 15) && (j < neu_data.length)){

				var aux = neu_data[j].region.id -1;

				if($scope.tasa_neu[aux] == 0){
					$scope.tasa_neu[aux] = neu_data[j].valor;
					i++;
				}
				j++;
			}

			document.getElementById('region-name').innerHTML = 'Metropolitana de Santiago';
			$scope.updatePieGraph(13);
		}
		

    $scope.updatePieGraph = function(index){

  		$scope.tNeu[1] = $scope.tasa_neu[index - 1];
      $scope.tPos[1] = $scope.tasa_pos[index - 1];
      $scope.tNeg[1] = $scope.tasa_neg[index - 1];

    	$scope.partiPieChartA.load({
        columns: [
        	$scope.tNeu,
	        $scope.tPos,
	        $scope.tNeg,
        ]
      });
		}

});
