//Prevents the default tabbing keyboard event
$(document).keydown(function(objEvent) {
    if (objEvent.keyCode == 9)  { // Tab
        objEvent.preventDefault();
    }
});

/**
 * [User keyboard input handler]
 * @param  {string} state [current page input area identifier]
 * @return {null}
 */
function initiateInput(state) {
  $('#search-'+state).keyup(function(e) {
    let $input = $("#search-"+state);
    let $auto = $("#state-auto-"+state);
    let regex = /^[a-zA-Z\s]*$/;
    if (regex.test($(this).val())) {
    // if (e.keyCode>=65 && e.keyCode<=90) {
      if ($input.val().trim() === "" && e.keyCode === 32) {
        $input.val($input.val().trim());
      }

      inputArr = $input.val().split(" ");
      let capped = "";
      for (let i = 0; i < inputArr.length; i++) {
        capped += tools.capFirst(inputArr[i]);
        if (i !== inputArr.length - 1) capped += " ";
      }
      $input.val(capped);

      let str1 = $input.val();
      if (str1.length > 0) {
        for (var i = 0; i < states.length; i++) {
          let str2 = states[i].name.slice(0, str1.length);

          if (str1 === str2) {
            if (e.keyCode !== 8) {
              if (tools.hasWhiteSpace(states[i].name) && str1.indexOf(" ") == -1) {
                $input.val(tools.splitWords(states[i].name) + " ");
              }
            }
            $auto.val(states[i].name);
            break;
          } else {
            $auto.val("");
          }
        }
      } else {
        $auto.val("");
      }
    } else {
      $input.val($input.val().slice(0, -1));
    }

    if ($input.val() !== "") {
      $auto.attr('placeholder', '');
    } else {
      if (state !== 'landing') {
        $auto.attr('placeholder', state);
      } else {
        $auto.attr('placeholder', 'Enter State');
      }
    }

    if (e.which == 13 && $auto.val().length > 0) {
      $input.val($auto.val());
    }

    if ($input.val() === $auto.val()) {
      $.scrollify.move('#'+$auto.val().replace(/\s+/g, '-'));
      $auto.val('');
      $input.val('');
    }
  });

  $('#input-del-'+state).on('click', function() {
    $('#search-'+state).val('');
    $('#state-auto-'+state).val('');
    if (state !== 'landing') {
      $('#state-auto-'+state).attr('placeholder', state);
    } else {
      $('#state-auto-'+state).attr('placeholder', 'Enter State');
    }
  });
}

/**
 * [Builds all main div elements for the dynamically added pages]
 * @return {null}
 */
function createAllDivs() {
  for (var i = 0; i < states.length; i++) {
    let $div = $('<section>').addClass('my-container sticky-scroll');
    $div.attr('id', states[i].id);
    $div.attr('data-section-name', states[i].name.replace(/\s+/g, '-'));
    $div.appendTo('body');
    populateDataInfo(i);
    populateDropDown(i);
  }
  $.scrollify({
    section : ".sticky-scroll",
    scrollSpeed: 1800
  });
}

/**
 * [sets appropriate variables and scroll information to each new state div]
 * @return {null}
 */
function populateDataInfo(stateNum) {
  // for (var i = 0; i < states.length; i++) {
  let $state = $('#'+states[stateNum].abbreviation);
  let name = states[stateNum].name;
  $state.attr('data-info', name);
  $state.on('click', function() {
    $.scrollify.move('#'+name.replace(/\s+/g, '-'));
  });
  // }
}

/**
 * [Builds a dropdown option element for mobile view]
 * @param  {num} state [number corresponding to state]
 * @return {null}
 */
function populateDropDown(stateNum) {
  let $option = $('<option>').html(states[stateNum].name);
  $('.dropdown').append($option);
}

/**
 * [click handler for map icon on each page]
 * @param  {string} state [name of page]
 * @return {null} 
 */
function returnToMap(state) {
  $('#map-icon-'+state).on('click', function() {
    $.scrollify.move('#landing');
  });
}

/**
 * [click handler for dropdown selection]
 * @return {null} 
 */
function dropSelection() {
  $('select').on('click', function(){
    if ($(this).val()!==null) {
      $.scrollify.move('#'+$(this).val().replace(/\s+/g, '-'));
    }
  });
}

/**
 * [initiates interactivity for landing page]
 * @return {null} 
 */
function initiateLanding() {
  $("path").hover(function(e) {
    $('#search-landing').val($(this).data('info'));
    $('#state-auto-landing').val($(this).data('info'));
  });
  $("path").mouseleave(function(e) {
    $('#search-landing').val('');
    $('#state-auto-landing').val('');
    $('#state-auto-landing').attr('placeholder', 'Enter State');
  });
  $('#menu').on('click', function() {
    $('.tap-target').tapTarget('open');
  });
  returnToMap('landing');
  initiateInput('landing');
  dropSelection();
}
