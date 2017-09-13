$(function() {
  $.scrollify({
    section : ".sticky-scroll",
    scrollbars: false,
    scrollSpeed: 1100,
    before: function() {
      let currentId = $.scrollify.current().attr('id');

      // console.log("This returns state ID: " + currentId + " before scroll event");
    },
    after: function() {
      let currentSlide = $.scrollify.current();
      let currentState = currentSlide.data('section-name');
      dynamicDiv(currentState);
    }
  });
});

/**
 * [dynamicDiv description]
 * @param  {[type]} currentState [description]
 * @return {[type]}              [description]
 */
function dynamicDiv(currentState) {

  let thisState = getCurrentState(currentState);
  let nextState = getNextState(currentState);
  let prevState = getPrevState(currentState);

  // console.log("This is where previous and next state IDs can be returned: " +
              // prevState.id + " and " + nextState.id);

  $('.my-container').each(function() {
    if ($(this).data('section-name') !== currentState) {
      $(this).empty();
    }
  });

  $('.my-container').promise().done(function() {
    if (currentState !== 'landing') {
      if (!$('#'+thisState.id).has('nav').length) genContent(thisState);
      //for page interactions
      initiateInput(thisState.name.replace(/\s+/g, '-'));
      returnToMap(thisState.name.replace(/\s+/g, '-'));
      dropSelection();
      let data = getTimeSeries(thisState, 2013, 2015);
      let eduData = getTimeSeries(thisState, 2015, 2017);

      //for stat information (text) - Employment
      //let income = statText('Median Income: ', tools.numberWithCommas(thisState.median_income["2015"]));
      let income = statText('Median Income:');
      $('#'+thisState.abbreviation+'-employment-stat').append(income);
      $('<div>').addClass('chart-median-income-'+thisState.abbreviation).appendTo('#'+thisState.abbreviation+'-employment-stat');
      createTimeSeries(data["median_income"], "median_income", ".chart-median-income-"+thisState.abbreviation, dimple.plot.line);
      let incomeMobile = statText('Median Income: ', tools.numberWithCommas(thisState.median_income["2015"]));
      $('#'+thisState.abbreviation+'-employment-stat-mobile').html(incomeMobile);

      // for education information
      let educationLevel = statText('Education Level:');
      $('#'+thisState.abbreviation+'-education-stat').append(educationLevel);
      $('<div>').addClass('chart-education-level-'+thisState.abbreviation).appendTo('#'+thisState.abbreviation+'-education-stat');
      let highSchoolJSON = [{"edu_level" : thisState.high_school_graduation["2017"]},
                            {"edu_level" : (tools.cutDecimal(1.0-thisState.high_school_graduation["2017"]))}];
      let collegeJSON = [{"edu_level" : thisState.some_college["2017"]},
                            {"edu_level" : (tools.cutDecimal(1.0-thisState.some_college["2017"]))}];

      createRingChart(highSchoolJSON, collegeJSON, "high_school_graduation", ".chart-education-level-"+thisState.abbreviation, 265);

      //for stat information (text) - Information
      let $stat = $('#'+thisState.abbreviation+'-information-stat');
      $stat.html(statText('Capitol: ', thisState.capitol));
      $stat.append(statText('Population: ', tools.numberWithCommas(thisState.population["2015"])));
      $stat.append(statText('Median Age: ', ''));
      let $mobileStat = $('#'+thisState.abbreviation+'-information-stat-mobile');
      $mobileStat.html(statText('Capitol: ', thisState.capitol));
      $mobileStat.append(statText('Population: ', tools.numberWithCommas(thisState.population["2015"])));
      $mobileStat.append(statText('Median Age: ', ''));

      //for chart generation
      $('<div>').addClass('chart-median-age-'+thisState.abbreviation).appendTo('#'+thisState.abbreviation+'-information-stat');
      createTimeSeries(data["median_age"], "median_age", ".chart-median-age-"+thisState.abbreviation, dimple.plot.line);
      $('<div>').addClass('chart-mobile'+thisState.abbreviation).appendTo('#'+thisState.abbreviation+'-information-stat-mobile');
      let dataMobile = getTimeSeries(thisState, 2013, 2015);
      createTimeSeries(dataMobile["median_age"], "median_age", ".chart-mobile"+thisState.abbreviation, dimple.plot.line);

      //for wikipedia information
      getWikipedia(5407, thisState.name.replace(/\s+/g, '-'));
      toggleScrolling(['.large-card-content','.card-image']);
    }
    if (!$('#'+nextState.id).has('nav').length) genContent(nextState);
    if (!$('#'+prevState.id).has('nav').length) genContent(prevState);

    $('#'+prevState.id).css('opacity', '0');
    $('#'+nextState.id).css('opacity', '0');
    $('#landing-page').css('opacity', '0');

    if (thisState !== -1) {
      $('#'+thisState.id).fadeTo(1000, 1);
    } else {
      $('#landing-page').fadeTo(1000, 1);
    }

    //generate google map
    //may need to only generate thisState map depending on load time
    initMap(thisState);

    // click function for generating map with universities
  // $('#' + thisState.abbreviation +'-stat-list').on("click", initEducationMap(thisState)); //Not sure if this is the right approach, only want universities displayed when "Education Statistics" is clicked
  });
}

/**
 * [statText description]
 * @param  {[type]} title  [description]
 * @param  {[type]} number [description]
 * @return {[type]}        [description]
 */
function statText(title, number) {
  let $title = $('<span>').addClass('title-stat').html(title);
  let $amt = $('<span>').addClass('number-stat').html(number);
  let $p = $('<p>').html($title).append($amt);
  return $p;
}

/**
 * [toggleScrolling description]
 * @param  {[type]} el [description]
 * @return {[type]}    [description]
 */
function toggleScrolling(el) {
  for (let i = 0; i < el.length; i++) {
    $(el[i]).on('mouseenter',function() {$.scrollify.disable()});
    $(el[i]).on('mouseleave',function() {
      $(this).promise().done($.scrollify.enable());
    });
  }
}

/**
 * [genContent description]
 * @param  {[type]} makeState [description]
 * @return {[type]}           [description]
 */
function genContent(makeState) {
  let $info = $('<div>').addClass('row').attr('id', 'info-row');
  $info.html(statMobileGen(makeState));
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
  let $form = $('<form>').html($inputDiv);

  let $drop = $('<select>').addClass('dropdown');
  $drop.append('<option disabled>Choose State</option>');
  for (let i = 0; i < states.length; i++) {
    if (states[i].name === state.name) {
      $drop.append('<option selected>'+states[i].name+'</option>');
    } else {
      $drop.append('<option>'+states[i].name+'</option>');
    }
  }

  let $navWrap = $('<div>').addClass('nav-wrapper').html($drop).append($form);
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

  let $content = $('<div>').addClass('card-content large-card-content');
  $content.attr('id', state.name.replace(/\s+/g, '-')+'-card-content');
  $content.text("Place information here.");

  $card.html($img).append($content);

  // $card.attr('id', state.name.replace(/\s+/g, '-')+'-map');

  let $col = $('<div>').addClass('col s12 m6 map-col');
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

  let $statDiv = $('<div>').addClass('stat').attr('id', state.abbreviation+'-stat').html($ul);
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
  let $li = $('<li>').html($liHeader).append($liBody);

  if (active) {
    $liHeader.addClass('active');
    $liBody.addClass('list-body').attr('id', state.abbreviation+'-information-stat');
  }
  else if (title === 'Employment Statistics') {
    $liBody.attr('id', state.abbreviation+'-employment-stat');
  }
  else {
    $liBody.attr('id', state.abbreviation+'-education-stat');
  }

  return $li;
}

/**
 * [statMobileGen description]
 * @param  {[type]} state [description]
 * @return {[type]}       [description]
 */
function statMobileGen(state) {
  //main card content
  let $main = $('<div>').addClass('card-content main-card-content');
  $main.html(mainMobileGen(state.abbreviation, 'General Information'));
  $main.append(mainMobileGen(state.abbreviation, 'Employment Statistics'));
  $main.append(mainMobileGen(state.abbreviation, 'Education Statistics'));

  //tab card content
  let $ul = $('<ul>').addClass('tabs tabs-fixed-width');
  $ul.html(tabMobileGen(state.abbreviation, 'stateinfo', 'whatshot'));
  $ul.append(tabMobileGen(state.abbreviation, 'workstats', 'work'));
  $ul.append(tabMobileGen(state.abbreviation, 'schoolstats', 'school'));

  let $tab = $('<div>').addClass('card-content tab-card-content');
  $tab.attr('id', state.abbreviation+'-tab-card');
  $('<div>').addClass('card-tabs').appendTo($tab).append($ul);

  //map reveal
  let $i = $('<i>').addClass('material-icons right').html('close');
  let $a = $('<a>').addClass('card-title grey-text text-darken-4');
  $a.html('Map').append($i);
  let $map = $('<div>').addClass('card-reveal').append($a);

  //map div
  let $mapDiv = $('<div>').attr('id', state.abbreviation+'-map');
  $mapDiv.addClass('mobile-map');
  $map.append($mapDiv);

  //append to card
  let $card = $('<div>').addClass('card mobile-card');
  $card.html($main).append($tab).append($map);

  // addTabClick(state.abbreviation);

  return $card;
}

/**
 * [mainMobileGen description]
 * @param  {[type]} abbr  [description]
 * @param  {[type]} title [description]
 * @return {[type]}       [description]
 */
function mainMobileGen(abbr, title) {
  let titleId, contentId;
  if (title === 'Education Statistics') {
    titleId = abbr+'schoolstats';
    contentId = abbr+'-education-stat-mobile';
  }
  else if (title === 'Employment Statistics') {
    titleId = abbr+'workstats';
    contentId = abbr+'-employment-stat-mobile';
  } else {
    titleId = abbr+'stateinfo';
    contentId = abbr+'-information-stat-mobile';
  }

  let $id = $('<div>').attr('id', titleId);
  let $icon = $('<i>').addClass('material-icons right').html('pin_drop');
  let $span = $('<span>').addClass('card-title activator grey-text text-darken-4 card-title-mobile');
  $span.html(title).append($icon);
  $id.html($span);

  showMobileMap(mapMobile);

  if (title === 'General Information') {
    $id.css('display', 'block');
    $id.addClass('active mobile-content');
  } else {
    $id.css('display', 'none');
    $id.addClass('mobile-content');
  }

  //content
  let $content = $('<div>').attr('id', contentId);
  $id.append($content);
  // let $mapDiv = $('<div>').attr('id', abbr+'-map');
  // $mapDiv.addClass('mobile-map');
  // $id.append($mapDiv);

  return $id;
}

/**
 * [tabMobileGen description]
 * @param  {[type]} abbr [description]
 * @param  {[type]} id   [description]
 * @param  {[type]} icon [description]
 * @return {[type]}      [description]
 */
function tabMobileGen(abbr, id, icon) {
  let $i = $('<i>').addClass('material-icons').html(icon);
  let $a = $('<a>').attr('id', 'M'+abbr+id).html($i);

  $a.on('click', function() {
    clearMobileActive(abbr);

    $('#'+abbr+id).css('display', 'block');
    $('#'+abbr+id).addClass('active');
    $('#M'+abbr+id).addClass('active');
  });

  let $li = $('<li>').addClass('tab').html($a);
  if (icon === 'whatshot') $a.addClass('active');

  return $li;
}

/**
 * [clearMobileActive description]
 * @param  {[type]} abbr [description]
 * @return {[type]}      [description]
 */
function clearMobileActive(abbr) {
  $('#M'+abbr+'stateinfo').removeClass('active');
  $('#M'+abbr+'workstats').removeClass('active');
  $('#M'+abbr+'schoolstats').removeClass('active');

  $('#'+abbr+'stateinfo').css('display', 'none');
  $('#'+abbr+'stateinfo').removeClass('active');
  $('#'+abbr+'workstats').css('display', 'none');
  $('#'+abbr+'workstats').removeClass('active');
  $('#'+abbr+'schoolstats').css('display', 'none');
  $('#'+abbr+'schoolstats').removeClass('active');
}

/**
 * [showMobileMap description]
 * @param  {[type]} map [description]
 * @return {[type]}     [description]
 */
function showMobileMap(map) {
  $('.card-title-mobile').on('click', function() {
    console.log("MAP");
    google.maps.event.trigger(map, "resize");
  });
}
