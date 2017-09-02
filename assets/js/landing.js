oldStates = {
  Alabama: "04000US01",
  Alaska: "04000US02",
  Arizona: "04000US04",
  Arkansas: "04000US05",
  California: "04000US06",
  Colorado: "04000US08",
  Connecticut: "04000US09",
  Delaware: "04000US10",
  Florida: "04000US12",
  Georgia: "04000US13",
  Hawaii: "04000US15",
  Idaho: "04000US16",
  Illinois: "04000US17",
  Indiana: "04000US18",
  Iowa: "04000US19",
  Kansas: "04000US20",
  Kentucky: "04000US21",
  Louisiana: "04000US22",
  Maine: "04000US23",
  Maryland: "04000US24",
  Massachusetts: "04000US25",
  Michigan: "04000US26",
  Minnesota: "04000US27",
  Mississippi: "04000US28",
  Missouri: "04000US29",
  Montana: "04000US30",
  Nebraska: "04000US31",
  Nevada: "04000US32",
  "New Hampshire": "04000US33",
  "New Jersey": "04000US34",
  "New Mexico": "04000US35",
  "New York": "04000US36",
  "North Carolina": "04000US37",
  "North Dakota": "04000US38",
  Ohio: "04000US39",
  Oklahoma: "04000US40",
  Oregon: "04000US41",
  Pennsylvania: "04000US42",
  "Rhode Island": "04000US44",
  "South Carolina": "04000US45",
  "South Dakota": "04000US46",
  Tennessee: "04000US47",
  Texas: "04000US48",
  Utah: "04000US49",
  Vermont: "04000US50",
  Virginia: "04000US51",
  Washington: "04000US53",
  "West Virginia": "04000US54",
  Wisconsin: "04000US55",
  Wyoming: "04000US56"
};

$(document).ready(function() {
  $(".fade").fadeTo(6000, 1);
});

$("#state-input").keyup(function(e) {
  //restrict to letters
  let str1 = tools.capFirst($("#state-input").val());
  $("#state-input").val(tools.capFirst($("#state-input").val()));
  // if (str1 == "No") {
  //   str1 = "North ";
  //   $("#state-auto").val(str1);
  //   $("#state-input").val(str1);
  //   return;
  // } else if (str1 == "So") {
  //   str1 = "South ";
  //   $("#state-auto").val(str1);
  //   $("#state-input").val(str1);
  // }
  //traverse states object and suggest state
  if (str1.length > 0) {
    for (var key in oldStates) {
      let str2 = key.slice(0, str1.length);

      if (str1 === str2) {
        if (tools.hasWhiteSpace(key) && str1.indexOf(" ") == -1) {
          console.log(tools.splitWords(key));
          $("#state-auto").val(tools.splitWords(key) + " ");
          $("#state-input").val(tools.splitWords(key) + " ");
          continue;
        }
        //compare to string
        $("#state-auto").val(key);
        break;
      } else {
        $("#state-auto").val("");
      }
    }
  } else {
    $("#state-auto").val("");
  }

  if (e.which == 13 && $("#state-auto").val().length > 0) {
    $("#state-input").val($("#state-auto").val());
  }

});
