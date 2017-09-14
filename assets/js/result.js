$(function() {
  $.scrollify({
    section : ".sticky-scroll",
    scrollbars: false,
    scrollSpeed: 1500,
    after: function() {
      let currentSlide = $.scrollify.current();
      let currentState = currentSlide.data('section-name');
      dynamicDiv(currentState);
      $.scrollify.disable();
    }
  });
});

/**
 * [Clears result divs, then builds all current state and the elements of previous and next states]
 * @param  {string} currentState [name of the current state]
 * @return {null}  
 */
function dynamicDiv(currentState) {

  let prevState = getStateObj(currentState, -1);
  let thisState = getStateObj(currentState, 0);
  let nextState = getStateObj(currentState, 1);

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

      // //for stat information (text) - Employment
      // let incomeTitle = statText('Median Income:');
      // let incomeTitleMobile = statText('Median Income:');
      // $('#'+thisState.abbreviation+'-employment-stat').append(incomeTitle);
      // $('#'+thisState.abbreviation+'-employment-stat-mobile').append(incomeTitleMobile);
      // $('<div>').addClass('chart-median-income-'+thisState.abbreviation).appendTo('#'+thisState.abbreviation+'-employment-stat');
      // $('<div>').addClass('chart-median-income-mobile-'+thisState.abbreviation).appendTo('#'+thisState.abbreviation+'-employment-stat-mobile');

      // createTimeSeries(data["median_income"], "median_income", ".chart-median-income-"+thisState.abbreviation, dimple.plot.line, 350, 150);
      // createTimeSeries(data["median_income"], "median_income", ".chart-median-income-mobile-"+thisState.abbreviation, dimple.plot.line, 350, 150);

      // let unemploymentTitle = statText('Unemployment:');
      // let unemploymentTitleMobile = statText('Unemployment:');
      // $('#'+thisState.abbreviation+'-employment-stat').append(unemploymentTitle);
      // $('#'+thisState.abbreviation+'-employment-stat-mobile').append(unemploymentTitleMobile);
      // $('<div>').addClass('chart-unemployment-'+thisState.abbreviation).appendTo('#'+thisState.abbreviation+'-employment-stat');
      // $('<div>').addClass('chart-unemployment-mobile-'+thisState.abbreviation).appendTo('#'+thisState.abbreviation+'-employment-stat-mobile');

      // createTimeSeries(eduData["unemployment"], "unemployment", ".chart-unemployment-"+thisState.abbreviation, dimple.plot.line, 350, 150);
      // createTimeSeries(eduData["unemployment"], "unemployment", ".chart-unemployment-mobile-"+thisState.abbreviation, dimple.plot.line, 350, 150);

      // for education information
      // let educationLevelTitle = statText('Education Level:');
      // let educationLevelTitleMobile = statText('Education Level:');
      // let educationLevelKey = $('<div>').html('<br><span class="badge" id="high_school_key">High School Graduate</span><span class="badge" id="some_college_key">Some College</span>');
      // let educationLevelKeyMobile = $('<div>').html('<br><span class="badge" id="high_school_key">High School Graduate</span><span class="badge" id="some_college_key">Some College</span><br>');

      // $('#'+thisState.abbreviation+'-education-stat').append(educationLevelTitle);
      // $('#'+thisState.abbreviation+'-education-stat').append(educationLevelKey);
      // $('#'+thisState.abbreviation+'-education-stat-mobile').append(educationLevelTitleMobile);
      // $('#'+thisState.abbreviation+'-education-stat-mobile').append(educationLevelKeyMobile);
      // $('<div>').addClass('chart-education-level-'+thisState.abbreviation).appendTo('#'+thisState.abbreviation+'-education-stat');
      // $('<div>').addClass('chart-education-level-mobile-'+thisState.abbreviation).appendTo('#'+thisState.abbreviation+'-education-stat-mobile');
      // let highSchoolJSON = [{"edu_level" : thisState.high_school_graduation["2017"]},
      //                       {"edu_level" : (tools.cutDecimal(1.0-thisState.high_school_graduation["2017"]))}];
      // let collegeJSON = [{"edu_level" : thisState.some_college["2017"]},
      //                       {"edu_level" : (tools.cutDecimal(1.0-thisState.some_college["2017"]))}];

      // createRingChart(highSchoolJSON, collegeJSON, "high_school_graduation", ".chart-education-level-"+thisState.abbreviation, 265);
      // createRingChart(highSchoolJSON, collegeJSON, "high_school_graduation", ".chart-education-level-mobile-"+thisState.abbreviation, 265);
      


      // //for stat information (text) - Information
      // let $stat = $('#'+thisState.abbreviation+'-information-stat');
      // $stat.html(statText('Capitol: ', thisState.capitol));
      // $stat.append(statText('Population: ', tools.numberWithCommas(thisState.population["2015"])));
      // $stat.append(statText('Median Age: ', ''));
      // let $mobileStat = $('#'+thisState.abbreviation+'-information-stat-mobile');
      // $mobileStat.html(statText('Capitol: ', thisState.capitol));
      // $mobileStat.append(statText('Population: ', tools.numberWithCommas(thisState.population["2015"])));
      // $mobileStat.append(statText('Median Age: ', ''));

      // //for chart generation
      // $('<div>').addClass('chart-median-age-'+thisState.abbreviation).appendTo('#'+thisState.abbreviation+'-information-stat');
      // createTimeSeries(data["median_age"], "median_age", ".chart-median-age-"+thisState.abbreviation, dimple.plot.line, 350, 200);
      // $('<div>').addClass('chart-mobile'+thisState.abbreviation).appendTo('#'+thisState.abbreviation+'-information-stat-mobile');
      // let dataMobile = getTimeSeries(thisState, 2013, 2015);
      // createTimeSeries(dataMobile["median_age"], "median_age", ".chart-mobile"+thisState.abbreviation, dimple.plot.line, 350, 200);

      populateInformation(thisState, data, "full");
      populateInformation(thisState, data, "mobile");

      populateEmployment(thisState, data, eduData, "full");
      populateEmployment(thisState, data, eduData, "mobile");

      populateEducation(thisState, "full");
      populateEducation(thisState, "mobile");
      
      //for wikipedia information
      getWikipedia(thisState.wiki_pageid, thisState.name.replace(/\s+/g, '-'));
      toggleScrolling(['.large-card-content','.card-image']);
    }
    if (!$('#'+nextState.id).has('nav').length) genContent(nextState);
    if (!$('#'+prevState.id).has('nav').length) genContent(prevState);

    $('#'+prevState.id).css('opacity', '0');
    $('#'+nextState.id).css('opacity', '0');
    $('#landing-page').css('opacity', '0');

    if (thisState !== -1) {
      $.when($('#'+thisState.id).fadeTo(1000, 1)).then(function() {
        $.scrollify.enable();
      });
    } else {
      $.when($('#landing-page').fadeTo(1000, 1)).then(function() {
        $.scrollify.enable();
      });
    }

    //generate google map
    //may need to only generate thisState map depending on load time
    initMap(thisState);

    // click function for generating map with universities
    // $('#' + thisState.abbreviation +'-stat-list').on("click", initEducationMap(thisState)); //Not sure if this is the right approach, only want universities displayed when "Education Statistics" is clicked
  });
}

/**
 * [formats the text for statistics]
 * @param  {string} title  [the text label]
 * @param  {number} number [a statistic]
 * @return {object} $p [p tag element]
 */
function statText(title, number) {
  let $title = $('<span>').addClass('title-stat').html(title);
  let $amt = $('<span>').addClass('number-stat').html(number);
  let $p = $('<p>').html($title).append($amt);
  return $p;
}

/**
 * [loops through an array of jquery selectors to toggle scrolling capabilities]
 * @param  {array} el [jquery id or class selectors]
 * @return {null} 
 */
function toggleScrolling(el) {
  for (let i = 0; i < el.length; i++) {
    $(el[i]).on('mouseenter',function() {
      $.scrollify.disable();
    });
    $(el[i]).on('mouseleave',function() {
      $.scrollify.enable();
    });
  }
}

/**
 * [How to populate the statistics of the general information tab]
 * @param  {object} state [state object]
 * @param  {object} data [data object]
 * @param  {string} size ["full" for full site, otherwise go to mobile size]
 * @return {null}
 */
function populateInformation(state, data, size) {
  let $stat, $chart;
  let classChart;
  if (size === "full") {
    $stat = $('#'+state.abbreviation+'-information-stat');
    $chart = $('<div>').addClass('chart-median-age-'+state.abbreviation);
    classChart = ".chart-median-age-"+state.abbreviation;
  } else {
    $stat = $('#'+state.abbreviation+'-information-stat-mobile');
    $chart = $('<div>').addClass('chart-mobile'+state.abbreviation);
    classChart = ".chart-mobile"+state.abbreviation;
  }
  $stat.html(statText('Capitol: ', state.capitol));
  $stat.append(statText('Population: ', tools.numberWithCommas(state.population["2015"])));
  $stat.append(statText('Median Age: ', ''));
  $stat.append($chart);
  createTimeSeries(data["median_age"], "median_age", classChart, dimple.plot.line, 350, 200);
}

/**
 * [How to populate the statistics of the employment tab]
 * @param  {object} state [state object]
 * @param  {object} data [data object]
 * @param  {object} eduData [data object]
 * @param  {string} size ["full" for full site, otherwise go to mobile size]
 * @return {null}
 */
function populateEmployment(state, data, eduData, size) {
  let incomeTitle = statText('Median Income:');
  let unemploymentTitle = statText('Unemployment:');

  let $employmentStat, $unemploymentChart, $incomeChart;
  let classIncomeChart, classUnemploymentChart;
  if (size === "full") {
    $employmentStat = $('#'+state.abbreviation+'-employment-stat');
    $incomeChart = $('<div>').addClass('chart-median-income-'+state.abbreviation)
    $unemploymentChart = $('<div>').addClass('chart-unemployment-'+state.abbreviation);
    classIncomeChart = ".chart-median-income-"+state.abbreviation;
    classUnemploymentChart = ".chart-unemployment-"+state.abbreviation;

  } else {
    $employmentStat = $('#'+state.abbreviation+'-employment-stat-mobile');
    $incomeChart = $('<div>').addClass('chart-median-income-mobile-'+state.abbreviation)
    $unemploymentChart = $('<div>').addClass('chart-unemployment-mobile-'+state.abbreviation);
    classIncomeChart = ".chart-median-income-mobile-"+state.abbreviation;
    classUnemploymentChart = ".chart-unemployment-mobile-"+state.abbreviation;
  }
  $employmentStat.append(statText('Median Income:'));
  $employmentStat.append($incomeChart);
  createTimeSeries(data["median_income"], "median_income", classIncomeChart, dimple.plot.line, 350, 150);

  $employmentStat.append(statText('Unemployment:'));
  $employmentStat.append($unemploymentChart);
  createTimeSeries(eduData["unemployment"], "unemployment", classUnemploymentChart, dimple.plot.line, 350, 150);
}

/**
 * [How to populate the statistics of the education tab]
 * @param  {object} state [state object]
 * @param  {string} size ["full" for full site, otherwise go to mobile size]
 * @return {null}
 */
function populateEducation(state, size) {
  let educationLevelTitle = statText('Education Level:');
  let $educationLevelKey = $('<div>').html('<br><span class="badge" id="high_school_key">High School Graduate</span>');
  $educationLevelKey.append('<span class="badge" id="some_college_key">Some College</span>');

  let $eduStat, $eduChart;
  let classEduChart;
  if (size === "full") {
    $eduStat = $('#'+state.abbreviation+'-education-stat');
    $eduChart = $('<div>').addClass('chart-education-level-'+state.abbreviation);
    classEduChart = ".chart-education-level-"+state.abbreviation;
  } else {
    $eduStat = $('#'+state.abbreviation+'-education-stat-mobile');
    $eduChart = $('<div>').addClass('chart-education-level-mobile-'+state.abbreviation);
    classEduChart = ".chart-education-level-mobile-"+state.abbreviation;   
  }
  $eduStat.append(educationLevelTitle);
  $eduStat.append($educationLevelKey);
  $eduStat.append($eduChart);
  let highSchoolJSON = [{"edu_level" : state.high_school_graduation["2017"]},
                        {"edu_level" : (tools.cutDecimal(1.0-state.high_school_graduation["2017"]))}];
  let collegeJSON = [{"edu_level" : state.some_college["2017"]},
                        {"edu_level" : (tools.cutDecimal(1.0-state.some_college["2017"]))}];
  createRingChart(highSchoolJSON, collegeJSON, "high_school_graduation", classEduChart, 265);
}

/**
 * [high level generation of the html elements for th state pages]
 * @param  {object} makeState [state object]
 * @return {null}
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
 * [determines which state object to return]
 * @param  {string} currentState [state name of current state]
 * @param  {number} inc [which way to increment]
 * @return {number or object} states[index] [if on landing page return -1, else return a state object]
 */
function getStateObj(currentState, inc) {
  let index = states.findIndex(function(element){
    if (element.name === currentState.replace(/-+/g, ' ')) return element;
  });
  index += inc;
  if (index > 49) index = 49;
  if (index <= -1 && inc === -1) index = 0;
  return index === -1 ? -1 : states[index];
}

/**
 * [mid level generation of the nav bar on state pages]
 * @param  {object} state [state object]
 * @return {object} $nav [html element for the entire nav bar]
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
 * [mid level generation of the map column]
 * @param  {object} state [state object]
 * @return {object} $col [html element of the map column]
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
 * [mid level generation of the stats column]
 * @param  {object} state [state object]
 * @return {object} $col [html element of stats column]
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
 * [low level generation of the list items of stats column]
 * @param  {object} state  [state object]
 * @param  {string} title  [title of list item]
 * @param  {string} icon   [which icon]
 * @param  {boolean} active [is this list item active on load]
 * @return {object} $li [html element of list item]
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
 * [mid level generation of stats card for mobile view]
 * @param  {object} state [state object]
 * @return {object} $card [html element for the stats card]
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

  return $card;
}

/**
 * [low level generation of the stats tabs]
 * @param  {string} abbr  [state abbreviation]
 * @param  {string} title [title of tab]
 * @return {object} $id [html element of the stats tab]
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

  if (title === 'General Information') {
    $id.css('display', 'block');
    $id.addClass('active mobile-content');
  } else {
    $id.css('display', 'none');
    $id.addClass('mobile-content');
  }

  let $content = $('<div>').attr('id', contentId);
  $id.append($content);

  return $id;
}

/**
 * [low level generation of the tab icons for stats card in mobile view]
 * @param  {string} abbr [state abbreviation]
 * @param  {string} id   [jquery selector]
 * @param  {string} icon [designates icon]
 * @return {object} $li [html element of the tab]
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
 * [clearing of active and display settings in mobile view]
 * @param  {string} abbr [state abbreviation]
 * @return {null} 
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
 * [Test function to show google map in mobile view]
 * @param  {object} map [google map object]
 * @return {null}
 */
function showMobileMap(map) {
  $('.card-title-mobile').on('click', function() {
    google.maps.event.trigger(map, "resize");
  });
}
