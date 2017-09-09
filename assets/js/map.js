function initMap(thisState) {

  if (thisState !== undefined && thisState !== -1) {

    var userLocation =  thisState.capitol + "," + thisState.abbreviation; 

    geoCodeAddress(userLocation)
    .then(function(results) {
      // console.log(results);
      let lat1 = results[0].geometry.location.lat();
      let lng1 = results[0].geometry.location.lng();
      tagLocation(thisState, lat1, lng1);
    })
    .catch(function(status) {
      // alert(status);
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

function tagLocation(thisState, lat, lng) {
  // console.log(stateName);
    var location = {lat: lat, lng: lng};
    console.log('wfehwefhweiuhu',thisState);

    var zoom;
    console.log('========', thisState);
    if(thisState.scale !== undefined) {
      zoom = thisState.scale;
      console.log(stateName.scale);
    } else {
      zoom = 6;
    }

    var map = new google.maps.Map(document.getElementById(thisState.name.replace(/\s+/g, '-')+'-map'), {
     // zoom: 6, 
    zoom: zoom,
    center: location
    });
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
}


//AIzaSyDRdo3AR4eMaeOMWSVTgOmiW6Xu6WLSO6s = API key


