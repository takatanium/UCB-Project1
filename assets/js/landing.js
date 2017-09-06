$(document).keydown(function(objEvent) {
    if (objEvent.keyCode == 9) { 
        objEvent.preventDefault(); 
    }
});

function initiateInput(state) {
  $('#search-'+state).keyup(function(e) {
    let $input = $("#search-"+state);
    let $auto = $("#state-auto-"+state);

    let regex = /^[a-zA-Z\s]*$/; 
    if (regex.test($(this).val())) {
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

function createAllDivs() {
  for (var i = 0; i < states.length; i++) {
    let $div = $('<section>').addClass('my-container sticky-scroll');
    $div.attr('id', states[i].id);
    $div.attr('data-section-name', states[i].name.replace(/\s+/g, '-'));
    $div.appendTo('body');
  }
  $.scrollify({
    section : ".sticky-scroll",
    scrollSpeed: 1100
  });
}

//For interactive map
function popDataInfo() {
  for (var i = 0; i < states.length; i++) {
    let $state = $('#'+states[i].abbreviation);
    let name = states[i].name;
    $state.attr('data-info', name);
    $state.on('click', function() {
      $.scrollify.move('#'+name.replace(/\s+/g, '-'));
    });
  }
}

function returnToMap(state) {
  $('#map-icon-'+state).on('click', function() {
    $.scrollify.move('#landing');
  });
}

$(document).ready(function() {
  $("path").hover(function(e) {
    $('#search-landing').val($(this).data('info'));
    $('#state-auto-landing').val($(this).data('info'));
  });
  $("path").mouseleave(function(e) {
    $('#search-landing').val('');
    $('#state-auto-landing').val('');
    $('#state-auto-landing').attr('placeholder', 'Enter State');
  });
  returnToMap('landing');
  $('#feature').on('click', function() {
      $('.tap-target').tapTarget('open');
  });
});