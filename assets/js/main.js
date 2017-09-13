const BASE_URL = 'https://api.datausa.io/api/?show=geo&sumlevel=state&required=pop,age,income'
const CHR_URL = 'https://api.datausa.io/api/?show=geo&sumlevel=state&required=unemployment,uninsured,high_school_graduation,some_college'

const JOIN_URL = 'https://api.datausa.io/api/join/?required=pop,age,income,unemployment,uninsured,high_school_graduation,some_college&show=geo&sumlevel=state'

let stats = ["population", "median_age", "median_income"];
let states; // Global object that holds state information

/*
******************************************************
STATISTICS DESCRIPTION
******************************************************

American Community Survey (ACS)
  pop                    - Population
  age                    - Median Age
  income                 - Median household income

County Health Rankings (CHR)
  unemployment           - Percentage of the civilian labor force, age 16 and older, that is unemployed but seeking work 
  uninsured              - Percentage of the population under age 65 thath has no health insurance coverage
  high_school_graduation - Percentage of nith-grade cohort in public schools that graduates from high school in four years
  some_college           - Percentage of the population ages 25-44 with some post-secondary education, such as enrollment
                           in vocational/technical school, junior colleges, or four-year colleges, including individuals
                           who pursued education following high school but did not receive a degree
 */


// Loads state object
$(document).ready(function($) {

  // Forces the page to #landing
  location.hash = 'landing';
  
  $.ajax({
    url: 'https://raw.githubusercontent.com/takatanium/UCB-Project1/master/assets/json/states.json',
    dataType: 'json',
    method: 'GET',
    success: function(res) {
      states = res;

      // @mmenschig - Optimize this routine
      for (let i = 0; i < states.length; i++) {
        states[i]['population'] = {};
        states[i]['median_age'] = {};
        states[i]['median_income'] = {};
        states[i]['unemployment'] = {};
        states[i]['uninsured'] = {};
        states[i]['high_school_graduation'] = {};
        states[i]['some_college'] = {};
      }
      getACSData();
      getCHRData();
    },
    error: function(e) {
      console.log(e);
    }
  })
});

/**
 * [getCHRData description]
 * @return {[type]} [description]
 */
function getCHRData() {
  $.ajax({
    url: CHR_URL,
    dataType: 'json',
    method: 'GET',
    success: function(res) {

      for (let i = 0; i < res.data.length; i++) {
        let id = res.data[i][1];
        
        for (let j = 0; j < states.length; j++) {
          if (id == states[j].id) {
            
            let year = res.data[i][0];
            // @mmenschig - optimize this routine
            if (!states[j]['unemployment'].hasOwnProperty(year)) {
              states[j]['unemployment'][year] = res.data[i][2];
            }

            if (!states[j]['uninsured'].hasOwnProperty(year)) {
              states[j]['uninsured'][year] = res.data[i][3];
            }

            if (!states[j]['high_school_graduation'].hasOwnProperty(year)) {
              states[j]['high_school_graduation'][year] = res.data[i][4];
            }

            if (!states[j]['some_college'].hasOwnProperty(year)) {
              states[j]['some_college'][year] = res.data[i][5];
            }

          }
        }
      }

    },
    error: function(e) {
      console.log(e);
    }
  })
}

/**
 * [getData description]
 * @return {[type]} [description]
 */
function getACSData() {
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
function getWikipedia(pageid, state) {
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

  $.ajax({
    url: url,
    dataType: 'jsonp',
    crossDomain: true,
    method: 'GET',
    success: function(res) {

      let extract = getExtract(res);
      $('#'+state+'-card-content').html(extract);
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
