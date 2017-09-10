const BASE_URL = 'https://api.datausa.io/api/?show=geo&sumlevel=state&required=pop,age,income'
var states; // Global object that holds state information
let stats = ["population", "median_age", "median_income"];

// Loads state object
$(document).ready(function($) {

  getWikipedia(5407);

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

/**
 * [getData description]
 * @return {[type]} [description]
 */
function getData() {
  $.ajax({
    url: BASE_URL,
    dataType: 'json',
    method: 'GET',
    success: function(res) {

      for (let i = 0; i < res.data.length; i++) {
        let id = res.data[i][1];

        for (let j = 0; j < states.length; j++) {

          if (id == states[j].id) {

            let year = res.data[i][0];

            // @mmenschig - would love for this to be dynamic
            if (!states[j]['population'].hasOwnProperty(year)) {
              states[j]['population'][year] = res.data[i][2];
            }

            if (!states[j]['median_age'].hasOwnProperty(year)) {
              states[j]['median_age'][year] = res.data[i][3];
            }

            if (!states[j]['median_income'].hasOwnProperty(year)) {
              states[j]['median_income'][year] = res.data[i][4];
            }
          }
        }
      }

      createAllDivs();
      $.scrollify.move('#landing');
      $('#landing-page').fadeTo(2000, 1);
      initiateInput('landing');
      popDataInfo();
    },
    error: function(e) {
      console.log(e);
    }
  })
}

/**
 * Returns a Wikipedia API response object
 * @param  {string} state The state we are retrieving data for
 * @return {object}       Wikipedia API response
 */
function getWikipedia(pageid) {
  let BASEURL = 'https://en.wikipedia.org/w/api.php'
  let url = BASEURL + '?' + $.param({
    action: 'query',
    prop: 'extracts',
    exintro: null,
    explaintext: null,
    exsentences: 5,
    pageids: pageid,
    format: 'json'
  });

  console.log(url);

  $.ajax({
    url: url,
    dataType: 'jsonp',
    crossDomain: true,
    method: 'GET',
    success: function(res) {

      let extract = getExtract(res);
      console.log(extract);
      return extract;
    },
    error: function(e) {
      console.log(e);
    }
  })
}

function getExtract(data) {
  let pages = data.query.pages;

  for (var key in pages) {
    if (pages.hasOwnProperty(key)) {
      return pages[key]["extract"];
    }
  }

}
