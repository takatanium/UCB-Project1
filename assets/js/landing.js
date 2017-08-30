states = {
  "Alabama": null,
  "Alaska": null,
  "Arizona": null,
  "Arkansas": null,
  "California": null,
  "Colorado": null,
  "Connecticut": null,
  "Delaware": null,
  "Florida": null,
  "Georgia": null,
  "Hawaii": null,
  "Idaho": null,
  "Illinois": null,
  "Indiana": null,
  "Iowa": null,
  "Kansas": null,
  "Kentucky": null,
  "Louisiana": null,
  "Maine": null,
  "Maryland": null,
  "Massachusetts": null,
  "Michigan": null,
  "Minnesota": null,
  "Mississippi": null,
  "Missouri": null,
  "Montana": null,
  "Nebraska": null,
  "Nevada": null,
  "New Hampshire": null,
  "New Jersey": null,
  "New Mexico": null,
  "New York": null,
  "North Carolina": null,
  "North Dakota": null,
  "Ohio": null,
  "Oklahoma": null,
  "Oregon": null,
  "Pennsylvania": null,
  "South Carolina": null,
  "South Dakota": null,
  "Tennessee": null,
  "Texas": null,
  "Utah": null,
  "Vermont": null,
  "Virginia": null,
  "Washington": null,
  "West Virginia": null,
  "Wisconsin": null,
  "Wyoming": null
}


$('#state-input').keyup(function(e){
  //restrict to letters
  let str1 = tools.capFirst($('#state-input').val());
  $('#state-input').val(str1);
  //traverse states object and suggest state
  if (str1.length > 0) {
    for (var key in states) {
      let str2 = key.slice(0,str1.length);
      //compare to string
      if (str1 === str2) {
        $('#state-auto').val(key);
        break;
      } 
      else {
        $('#state-auto').val("");
      }
    }
  }
  else {
    $('#state-auto').val("");
  }

  if (e.which == 13 && $('#state-auto').val().length > 0) {
     $('#state-input').val($('#state-auto').val());
  }
});



