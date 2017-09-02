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
            states[j].population = res.data[i][2];
            states[j].median_age = res.data[i][3];
            states[j].median_income = res.data[i][4];
            console.log("State: " + states[j].name +
                        "\nPopulation: " + states[j].population +
                        "\nMedian Age: " + states[j].median_age +
                        "\nMedian Income: " + states[j].median_income);

          }
        }
      }
    },
    error: function(e) {
      console.log(e);
    }
  })
}
