

const POPULATION_BY_STATE = 'https://api.datausa.io/api/?show=geo&sumlevel=state&required=pop&year=latest'



function getData(url) {

  let californiaId = states["California"]
  console.log(californiaId);

  console.log(url)

  $.ajax({
    url: url,
    method: "GET",
    dataType: "json",
    success: function(res) {
      console.log(res);
      // console.log("California population: " + res.data)

      for (let i = 0; i < res.data.length; i++) {
        console.log(res.data[i]);
        console.log(res.data[i][1])

        if (res.data[i][1] == californiaId) {
          console.log("california population: " + res.data[i][2]);
        }
      }

    },
    error: function(e) {
      console.log(e);
    }
  })
}

getData(POPULATION_BY_STATE);

