const BASE_URL = 'https://api.datausa.io/api/?show=geo&sumlevel=state&required=pop,age,income&year=latest'

// Global object that holds API data
var states;

// Loads state object
$(document).ready(function($) {
  $.ajax({
    url: 'https://raw.githubusercontent.com/takatanium/UCB-Project1/master/assets/json/states.json',
    dataType: 'json',
    method: 'GET',
    success: function(res) {

      states = res;

      for (let i = 0; i < states.length; i++) {
        states[i]['population'] = null
        states[i]['median_age'] = null
        states[i]['median_income'] = null
      }
      
      console.log("Modified States object: ")
      console.log(states);

      console.log("API data response: ")
      getData();

    },
    error: function(e) {
      console.log(e);
    }
  })
});

function getData() {
  $.ajax({
    url: BASE_URL,
    dataType: 'json',
    method: 'GET',
    success: function(res) {
      console.log(res);
    },
    error: function(e) {
      console.log(e);
    }
  })
}
