$(function() {
	$.scrollify({
		section : ".sticky-scroll",
		scrollSpeed: 1100,
		after: function() {
      var currentSlide = $.scrollify.current();
      let currentState = currentSlide.attr('id');
      dynamicDiv(currentState);
    }
	});
});

function dynamicDiv(currentState) {
  let nextState = getNextState(currentState);
  console.log(nextState);
  let prevState = getPrevState(currentState);
  console.log(prevState);

  var makeNew = true;
  $('.my-container').each(function() {
  	if (this.id === nextState.name) makeNew = false;
  });

  $('.my-container').promise().done(function() {
  	if (makeNew) {
  		console.log("Make " + nextState.name);

    	let $info = $('<div>').addClass('row').attr('id', 'info-row');
    	$info.append(mapColGen(nextState)).append(statColGen(nextState));

    	let $cont = $('<div>').addClass('my-container sticky-scroll');
			$cont.attr('id', nextState.name).append(navGen(nextState)).append($info);

			$cont.appendTo('body');

			$('body').promise().done(function(){
				$('#'+prevState.name).css('opacity', '0');
				$('#'+nextState.name).css('opacity', '0');
				$('#'+currentState).fadeTo(1000, 1);
				//if (currentState !== 'landing') {
				// 	initializeMap(currentState);
				// }
			});
			$.scrollify({
				section : ".sticky-scroll",
				scrollSpeed: 1100
			});
		}
		else {
			console.log("Don't make " + nextState.name);
			$('#'+prevState.name).css('opacity', '0');
			$('#'+nextState.name).css('opacity', '0');
			$('#'+currentState).fadeTo(1000, 1);
			// if (currentState !== 'landing') {
			// 	initializeMap(currentState);
			// }
		}
	});
}

function getNextState(currentState) {
	let index = states.findIndex(function(element){
		if (element.name === currentState) return element;
	});
	if (index < 49) index++;
	return states[index];
}

function getPrevState(currentState) {
	let index = states.findIndex(function(element){
		if (element.name === currentState) return element;
	});
	if (index === -1) index = 0;
	if (index > 0) index--;
	return states[index];
}

function navGen(state) {
	let $input = $('<input>').attr({
		id: 'search',
		type: 'search',
		placeholder: state.name,
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

function mapColGen(state) {
	let $card = $('<div>').addClass('card map').attr('id', state.name+'-map');
	$card.addClass('blue-grey darken-1');
	let $col = $('<div>').addClass('col s12 m6').attr('id', 'map-col');
	$col.html($card);

	return $col;
}

function statColGen(state) {
	let $ul = $('<ul>').addClass('collapsible grey lighten-5');
	$ul.attr('id', 'stat-list');
	
	$ul.append(displayStats(state, 'Employment Statistics', 'work', false));
	$ul.append(displayStats(state, 'Education Statistics', 'school', false));
	$ul.append(displayStats(state, 'State Information', 'whatshot', true));

	let $statDiv = $('<div>').attr('id', 'stat').html($ul);
	let $col = $('<div>').addClass('col s12 m6').attr('id', 'stat-col');
	$col.html($statDiv);

	$('.collapsible').collapsible();

	return $col;
}

function displayStats(state, title, icon, active) {
	let $liHeader = $('<div>').addClass('collapsible-header');

	$liHeader.html('<i class="material-icons">' + icon + '</i>'+ title);
	let $liBody = $('<div>').addClass('collapsible-body grey lighten-5');
	let $liContent = $('<span>').appendTo($liBody);
	let $li = $('<li>').html($liHeader).append($liBody);

	if (active) {
		$liHeader.addClass('active');
		$liBody.addClass('list-body');
		$liContent.append('<p>State Capitol: ' + state.capitol + '</p>');
		$liContent.append('<p>Population: ' + state.population + '</p>');
		$liContent.append('<p>Median Age: ' + state.median_age + '</p>');
	} 
	else if (title === 'Employment Statistics') {
		$liContent.append('<p>State Statistics</p>');
		$liContent.append('<p>Median Income: ' + state.median_income + '</p>');
	}
	else {
		$liContent.append('State Statistics');
	}

	return $li;
}

// locResult (needs to be an array of capitol results)

function initializeMap(stateName) {

	// var capLat = locResult[].geometry.location.lat();
	// var capLng = locResult[].geometry.location.lng();

	if (stateName !== undefined) {
	  var state = {lat: -25.363, lng: 131.044};
	  var stateMap = new google.maps.Map(document.getElementById(stateName+'-map'), {
	    zoom: 4,
	    center: state
	  });
	}
}

