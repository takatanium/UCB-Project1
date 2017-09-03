var states = [
  "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "NewHampshire",
    "NewJersey",
    "NewMexico",
    "NewYork",
    "NorthCarolina",
    "NorthDakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "RhodeIsland",
    "SouthCarolina",
    "SouthDakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "WestVirginia",
    "Wisconsin",
    "Wyoming"
];

$(function() {
	$.scrollify({
		section : ".sticky-scroll",
		scrollSpeed: 1100,
		after: function() {

      var currentSlide = $.scrollify.current();
      let currentState = currentSlide.attr('id');

      let nextState = getNextState(currentState);
      let prevState = getPrevState(currentState);
      var makeNew = true;
      $('.my-container').each(function() {
      	if (this.id === nextState) makeNew = false;
      });

      $('.my-container').promise().done(function() {
      	if (makeNew) {
      		console.log("Make " + nextState);

	      	let $info = $('<div>').addClass('row').attr('id', 'info-row');
	      	$info.append(mapColGen(nextState)).append(statColGen(nextState));

	      	let $cont = $('<div>').addClass('my-container sticky-scroll');
					$cont.attr('id', nextState).append(navGen(nextState)).append($info);

					$cont.appendTo('body');

					$('body').promise().done(function(){
  					$('#'+prevState).css('opacity', '0');
  					$('#'+nextState).css('opacity', '0');
  					$('#'+currentState).fadeTo(600, 1);
  					if (currentState !== 'landing') {
							// initMap(currentState);
						}
					});

					$.scrollify({
						section : ".sticky-scroll",
						scrollSpeed: 1100
					});
				}
				else {
      		console.log("Don't make " + nextState);
    			$('#'+prevState).css('opacity', '0');
					$('#'+nextState).css('opacity', '0');
					$('#'+currentState).fadeTo(1000, 1);
					if (currentState !== 'landing') {
						// initMap(currentState);
					}
				}
      });
    }
	});
});

function getNextState(currentState) {
	let index = states.indexOf(tools.capFirst(currentState));
	if (index < 49) index++;
	return states[index];
}

function getPrevState(currentState) {
	let index = states.indexOf(tools.capFirst(currentState));
	if (index > 0) index--;
	return states[index];
}

function navGen(stateName) {
	let $input = $('<input>').attr({
		id: 'search',
		type: 'search',
		placeholder: stateName,
		required: null
	});
	let $icon1 = $('<i>').addClass('material-icons').text('search');
	$icon1.attr('id', 'magnify');
	let $label = $('<label>').addClass('label-icon');
	$label.attr('for', 'search').append($icon1);
	let $icon2 = $('<i>').addClass('material-icons').text('close');

	let $inputDiv = $('<div>').addClass('input-field');
	$inputDiv.html($input).append($label).append($icon2);

	let $form = $('<form>').html($inputDiv);
	let $navWrap = $('<div>').addClass('nav-wrapper').html($form);
	let $nav = $('<nav>').addClass('nav-container').html($navWrap);

	return $nav;
}

function mapColGen(stateName) {
	let $card = $('<div>').addClass('card map').attr('id', stateName+'-map');
	$card.addClass('blue-grey darken-1');
	let $col = $('<div>').addClass('col s12 m6').attr('id', 'map-col');
	$col.html($card);

	return $col;
}

function statColGen(stateName) {
	let $ul = $('<ul>').addClass('collapsible grey lighten-5');
	$ul.attr('id', 'stat-list');
	
	let $liHeader = $('<div>').addClass('collapsible-header active');
	$liHeader.html('<i class="material-icons">whatshot</i>State Info');
	// let $liContent = $('<span>').html('State Info');
	let $liBody = $('<div>').addClass('collapsible-body grey lighten-5 list-body');
	$liBody.html('<span>State Info</span>');
	$liBody.attr('id', stateName+'-info');
	let $li = $('<li>').html($liHeader).append($liBody);

	$ul.append(displayStats('Statistic One', 'filter_drama'));
	$ul.append(displayStats('Statistic Two', 'place'));
	$ul.append($li);

	let $statDiv = $('<div>').attr('id', 'stat').html($ul);
	let $col = $('<div>').addClass('col s12 m6').attr('id', 'stat-col');
	$col.html($statDiv);

	$('.collapsible').collapsible();

	return $col;
}

function displayStats(name, icon) {
	let $liHeader = $('<div>').addClass('collapsible-header');
	$liHeader.html('<i class="material-icons">' + icon + '</i>'+ name);
	let $liBody = $('<div>').addClass('collapsible-body grey lighten-5');
	let $liContent = $('<span>').text('State Stats').appendTo($liBody);
	let $li = $('<li>').html($liHeader).append($liBody);

	return $li;
}

function initMap() {
        var capLocation = {lat: -25.363, lng: 131.044};
        var map = new google.maps.Map(document.getElementById('printMap'), {
          zoom: 4,
          center: capLocation
        });
        var marker = new google.maps.Marker({
          position: capLocation,
          map: map
        });

      }

//AIzaSyAR7thdysEm9VOkjjSV9RxmoNSNP5Ncypc = API key

// // $().ready(function() {

// var userLocation = "Springfield, Illinois"
// var geocoder = new google.maps.Geocoder();

// geocoder.geocode ({
// 	address: userLocation
//         }, function(locResult) {
//             console.log(locResult);
//             var lat1 = locResult[0].geometry.location.lat();
//             console.log(lat1);
//             var lng1 = locResult[0].geometry.location.lng();
//             console.log(lng1);
//             $("#map").html("latitude:" + lat1 + "<p>longitude:" + lng1 + "</p>");

//         //     initMap(lat1.toFixed(3), lng1.toFixed(3));
//         // });
// 	// });

//          //    function initMap(lat1, lng1) {
//         	// 	var uluru = {lat: parseInt(lat1), lng: parseInt(lng1)};
//         	// 	console.log(uluru);
//         	// 	var map = new google.maps.Map(document.getElementById('map'), {
//          //  		zoom: 4,
//          //  		center: uluru
//         	// });
//         		// var marker = new google.maps.Marker({
//           		// position: uluru,
//           		// map: map
//         // });
//     });

        




// 	// var capLat = locResult[].geometry.location.lat();
// 	// var capLng = locResult[].geometry.location.lng();

// 	// if (stateName !== undefined) {
// 	//   var state = {lat: lat, lng: long};
// 	//   var stateMap = new google.maps.Map(document.getElementById(stateName+'-map'), {
// 	//     zoom: 4,
// 	//     center: state
// 	//   });
// 	// }
// // }

