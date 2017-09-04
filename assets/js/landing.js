$(document).keydown(function(objEvent) {
    if (objEvent.keyCode == 9) { 
        objEvent.preventDefault(); 
    }
});

function initiateInput() {
  $('input').keyup(function(e) {
    let $input = $("#state-input");
    let $auto = $("#state-auto");

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
                $auto.val(tools.splitWords(states[i].name) + " ");
                $input.val(tools.splitWords(states[i].name) + " ");
                continue;
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

    if (e.which == 13 && $auto.val().length > 0) {
      $input.val($auto.val());
    }

    if ($input.val() === $auto.val()) {
      $.scrollify.move('#'+$auto.val().replace(/\s+/g, '-'));
      $auto.val('');
      $input.val('');
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