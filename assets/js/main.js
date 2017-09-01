

const POPULATION_BY_STATE = 'https://api.datausa.io/api/?show=geo&sumlevel=state&required=pop&year=latest'



function getData(url) {

  console.log(url)

  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    success: function(res) {
      console.log(res)
    },
    error: function(e) {
      console.log(e);
    }
  })
}

getData(POPULATION_BY_STATE);