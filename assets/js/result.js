$(function() {
  $.scrollify({
    section : ".sticky-scroll",
    scrollbars: false,
    scrollSpeed: 1100,
    before: function() {
      let currentId = $.scrollify.current().attr('id');
    },
    after: function() {
      let currentSlide = $.scrollify.current();
      let currentState = currentSlide.data('section-name');
      dynamicDiv(currentState);
    }
  });
});

function dynamicDiv(currentState) {

  let thisState = getCurrentState(currentState);
  let nextState = getNextState(currentState);
  let prevState = getPrevState(currentState);

  // $('.my-container').each(function() {
  //   if ($(this).data('section-name') !== currentState) {
  //     $(this).empty();
  //   }
  // });

  // $('.my-container').promise().done(function() {
    if (thisState !== -1) {
      if (!$('#'+thisState.id).has('nav').length) { 
        genContent(thisState);
        let data = getTimeSeries(thisState, 2013, 2015);
        createRingChart(data["median_age"], "median_age", "#"+thisState.abbreviation+"-chart");
      }
      initiateInput(thisState.name.replace(/\s+/g, '-'));
      returnToMap(thisState.name.replace(/\s+/g, '-'));

      //fill in wikipedia entry
      getWikipedia(5407,thisState.name.replace(/\s+/g, '-')+'-card-content');
      //necesary to allow scrolling in card without scrolling screen
      // $('.card').on('mouseover', function() {$.scrollify.disable();});
    // }
    // if (!$('#'+nextState.id).has('nav').length) genContent(nextState);
    // if (!$('#'+prevState.id).has('nav').length) genContent(prevState);

    // $('#'+prevState.id).css('opacity', '0');
    // $('#'+nextState.id).css('opacity', '0');
    // $('#landing-page').css('opacity', '0');

    if (thisState !== -1) {
      $('#'+thisState.id).fadeTo(1000, 1);
    } else {
      $('#landing-page').fadeTo(1000, 1);
    }

    initMap(thisState);
  }
  // });

    // click function for generating map with universities
    // $("#").on("click", initEducationMap(thisState)); //Not sure if this is the right approach, only want universities displayed when "Education Statistics" is clicked
}

/**
 * [genContent description]
 * @param  {[type]} makeState [description]
 * @return {[type]}           [description]
 */
function genContent(makeState) {
  let $info = $('<div>').addClass('row').attr('id', 'info-row');
  $info.append(mapColGen(makeState)).append(statColGen(makeState));

  let $cont = $('<section>').addClass('my-container sticky-scroll');
  $cont.attr('id', makeState.id).attr('data-section-name', makeState.name);
  $('#'+makeState.id).html(navGen(makeState)).append($info);
}

/**
 * [getCurrentState description]
 * @param  {[type]} currentState [description]
 * @return {[type]}              [description]
 */
function getCurrentState(currentState) {
  let index = states.findIndex(function(element){
    if (element.name === currentState.replace(/-+/g, ' ')) return element;
  });
  return index === -1 ? -1 : states[index];
}

/**
 * [getNextState description]
 * @param  {[type]} currentState [description]
 * @return {[type]}              [description]
 */
function getNextState(currentState) {
  let index = states.findIndex(function(element){
    if (element.name === currentState) return element;
  });
  if (index < 49) index++;
  return states[index];
}

/**
 * [getPrevState description]
 * @param  {[type]} currentState [description]
 * @return {[type]}              [description]
 */
function getPrevState(currentState) {
  let index = states.findIndex(function(element){
    if (element.name === currentState) return element;
  });
  if (index === -1) index = 0;
  if (index > 0) index--;
  return states[index];
}

/**
 * [navGen description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function navGen(state) {
  let $input = $('<input>').attr({
    id: 'search-'+state.name.replace(/\s+/g, '-'),
    type: 'search',
    required: 'required'
  }).addClass('search');

  let $inputAuto = $('<input>').attr({
    id: 'state-auto-'+state.name.replace(/\s+/g, '-'),
    type: 'search',
    placeholder: state.name,
  }).addClass('state-auto');

  let $icon1 = $('<img>').attr({
    id: 'map-icon-'+state.name.replace(/\s+/g, '-'),
    src: 'assets/img/usa.png'
  }).addClass('map-icon');
  let $icon2 = $('<i>').addClass('material-icons input-del');
  $icon2.text('close').attr('id', 'input-del-'+state.name.replace(/\s+/g, '-'));

  let $inputDiv = $('<div>').addClass('input-field');
  $inputDiv.html($inputAuto).append($input);
  $inputDiv.append($icon1).append($icon2);
  // $inputDiv.append($label).append($icon2);

  let $form = $('<form>').html($inputDiv);
  let $navWrap = $('<div>').addClass('nav-wrapper').html($form);
  let $nav = $('<nav>').addClass('nav-container').html($navWrap);

  return $nav;
}

/**
 * [mapColGen description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function mapColGen(state) {
  let $card = $('<div>').addClass('card map');
  // $card.addClass('blue-grey darken-1');

  let $img = $('<div>').addClass('card-image')
  $img.attr('id', state.name.replace(/\s+/g, '-')+'-map');

  let $content = $('<div>').addClass('card-content');
  $content.attr('id', state.name.replace(/\s+/g, '-')+'-card-content');
  $content.text("Place information here.");

  $card.html($img).append($content);

  // $card.attr('id', state.name.replace(/\s+/g, '-')+'-map');

  let $col = $('<div>').addClass('col s12 m6').attr('id', 'map-col');
  $col.html($card);

  return $col;
}

/**
 * [statColGen description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function statColGen(state) {
  let $ul = $('<ul>').addClass('collapsible grey lighten-5 stat-list');
  $ul.attr('id', state.abbreviation+'-stat-list');

  $ul.append(displayStats(state, 'Employment Statistics', 'work', false));
  $ul.append(displayStats(state, 'Education Statistics', 'school', false));
  $ul.append(displayStats(state, 'State Information', 'whatshot', true));

  let $statDiv = $('<div>').attr('id', state.abbreviation+'-stat').html($ul);
  let $col = $('<div>').addClass('col s12 m6 stat-col').attr('id', state.abbreviation+'-stat-col');
  $col.html($statDiv);

  $('.collapsible').collapsible();

  return $col;
}

/**
 * [displayStats description]
 * @param  {[type]} state  [description]
 * @param  {[type]} title  [description]
 * @param  {[type]} icon   [description]
 * @param  {[type]} active [description]
 * @return {[type]}        [description]
 */
function displayStats(state, title, icon, active) {
  let $liHeader = $('<div>').addClass('collapsible-header');
  $liHeader.attr('id', state.abbreviation+'-list-header');

  if (active) {
    let $flag = $('<img>').attr('src', 'assets/img/flags/' + state.abbreviation + '.png');
    $flag.css({
      width: '30px',
      height: '17px',
      margin: '2.5px 14.5px 0 0',
    });
    $liHeader.html($flag).append(state.name + ' Information');
  } else {
    $liHeader.html('<i class="material-icons">' + icon + '</i>'+ title);
  }
  let $liBody = $('<div>').addClass('collapsible-body grey lighten-5');
  $liBody.attr('id', state.abbreviation+'-list-body');
  let $liContent = $('<span>').appendTo($liBody);
  let $li = $('<li>').html($liHeader).append($liBody);

  if (active) {
    $liHeader.addClass('active');
    $liBody.addClass('list-body');
    $liContent.append('<p><span class="title-stat">Capitol: </span><span class="text-stat">' + state.capitol + '</span></p>');
    $liContent.append('<p><span class="title-stat">Population: </span><span class="number-stat">' + tools.numberWithCommas(state.population["2015"]) + '</span></p>');
    $liContent.append('<p><span class="title-stat">Median Age: </span><span class="number-stat"></p>');
    let $chart = $('<div>').addClass('chart');
    $chart.attr('id',state.abbreviation+'-chart');
    $liBody.append($chart);
  }
  else if (title === 'Employment Statistics') {
    $liContent.append('<p>State Statistics</p>');
    $liContent.append('<p><span class="title-stat">Median Income:</span> <span class="number-stat">' + tools.numberWithCommas(state.median_income["2015"]) + '</span></p>');
  }
  else {
    $liContent.append('State Statistics');
  }
  return $li;
}
