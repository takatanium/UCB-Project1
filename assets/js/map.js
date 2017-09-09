function initMap(thisState) {

  if (thisState !== undefined && thisState !== -1) {

    var userLocation =  thisState.capitol + "," + thisState.abbreviation; 

    geoCodeAddress(userLocation)
    .then(function(results) {
      // console.log(results);
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
  // console.log(stateName);
    var location = {lat: lat, lng: lng};
    var map = new google.maps.Map(document.getElementById(stateName.replace(/\s+/g, '-')+'-map'), {
      zoom: 6,
      // zoom: thisState.scale, else zoom: 6
    //   {
    //   if (stateName == "Alaska" || "California" || "Idaho" || "Michigan" || "Minnesota" || "Montana" || "North Carolina" || "Colorado" || "Florida" || "Kansas" || "Nebraska" || "Nevada" || "New York" || "Oregon" || "Texas" || "Virginia" || "Washington" || "Wyoming") {
    //     zoom: 5 {
    //       else if (stateName == "Delaware" || "Connecticut" || "Maryland" || "Massachusetts" || "Rhode Island" || "New Hampshire" || "New Jersey" || "Vermont") {
    //         zoom: 7,
    //       } else {
    //         zoom: 6
    //       }
    //     }
    //   }
    // },    
      center: location
    });
    var marker = new google.maps.Marker({
      position: location,
      map: map
    });
}


//AIzaSyDRdo3AR4eMaeOMWSVTgOmiW6Xu6WLSO6s = API key


