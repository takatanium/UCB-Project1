const BASE_URL = 'https://api.datausa.io/api/?show=geo&sumlevel=state&required=pop,age,income'

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
        states[i]['population'] = {}
        states[i]['median_age'] = {}
        states[i]['median_income'] = {}
      }
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

      for(let i = 0; i < res.data.length; i++) {
        let id = res.data[i][1];
        
        for(let j = 0; j < states.length; j++) {
          if (id == states[j].id) {
            
            let year = res.data[i][0];

            if (!states[j]['population'].hasOwnProperty(res.data[i][0])) {
              states[j]['population'][year] = res.data[i][2];
            }            

            if (!states[j]['median_age'].hasOwnProperty(res.data[i][0])) {
              states[j]['median_age'][year] = res.data[i][3];
            }            

            if (!states[j]['median_income'].hasOwnProperty(res.data[i][0])) {
              states[j]['median_income'][year] = res.data[i][4];
            }
          }
        }
      }
      // end result

      console.log(states);
      createAllDivs();
      if (window.location.hash.slice(1).trim() === "landing" || 
          window.location.hash.slice(1).trim() === "") {
        dynamicDiv(window.location.hash.slice(1));
      }
    },
    error: function(e) {
      console.log(e);
    }
  })
}
