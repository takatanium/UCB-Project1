function initMap(thisState) {

  if (thisState !== undefined) {

    var userLocation =  thisState.capitol; 

    geoCodeAddress(userLocation)
    .then(function(results) {
      console.log(results);
      let lat1 = results[0].geometry.location.lat();
      let lng1 = results[0].geometry.location.lng();
      tagLocation(thisState.name, lat1, lng1);
    })
    .catch(function(status) {
      alert(status);
    });
  }
}

function geoCodeAddress(address) {
  var geocoder = new google.maps.Geocoder();  
  return new Promise(function(resolve,reject) {
    geocoder.geocode( { 'address': address}, function(results, status) {
      if (status == google.maps.GeocoderStatus.OK) {
        resolve(results);
      } else {
        reject(status);
      }
    });
  });
}

function tagLocation(stateName, lat, lng) {
  console.log(stateName);
    var location = {lat: lat, lng: lng};
    var map = new google.maps.Map(document.getElementById(stateName+'-map'), {
      zoom: 6,
      center: location
    });
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
}


//AIzaSyDRdo3AR4eMaeOMWSVTgOmiW6Xu6WLSO6s = API key


