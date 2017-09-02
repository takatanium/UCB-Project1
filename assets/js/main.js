
const BASE_URL = 'https://api.datausa.io/api/?show=geo&sumlevel=state&required=pop,age,income&year=latest'

// Loads state object
$(document).ready(function($) {
  $.ajax({
    url: 'https://raw.githubusercontent.com/takatanium/UCB-Project1/master/assets/json/states.json',
    dataType: 'json',
    method: 'GET',
    success: function(res) {
      console.log(res);
    },
    error: function(e) {
      console.log(e);
    }
  })
});

// function getData() {}
