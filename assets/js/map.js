function initMap(thisState) {

  if (thisState !== undefined && thisState !== -1) {

    var userLocation =  thisState.capitol + "," + thisState.abbreviation; 

    geoCodeAddress(userLocation)
    .then(function(results) {
      let lat1 = results[0].geometry.location.lat();
      let lng1 = results[0].geometry.location.lng();
      tagLocation(thisState, lat1, lng1);
      
    })
    .catch(function(status) {
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

function mapZoom (thisState) {
  var zoom;
    console.log(thisState);
  if(thisState.scale !== undefined) {
    zoom = thisState.scale;
    } 
    else {
    zoom = 6;
  }
  return zoom;
  console.log(zoom);
}


function tagLocation(thisState, lat, lng) {

    var location = {lat: lat, lng: lng};
    console.log(location);
    console.log('testing',thisState);

    var zoom = mapZoom(thisState);

    var map = new google.maps.Map(document.getElementById(thisState.name.replace(/\s+/g, '-')+'-map'), { 
    zoom: zoom,
    center: location
    });
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
}


//AIzaSyDRdo3AR4eMaeOMWSVTgOmiW6Xu6WLSO6s = API key


