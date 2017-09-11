// BASIC MAP AND CAPITOL MARKER GENERATION
var mapMobile;

// Google Maps function for generating latitude and longitude to be used for placing marker
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

// Geocoding the location
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

// setting zoom viewport appropriately based on json values (or the abscence thereof)
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

// Generating the map and placing a marker at the location geocoded previously
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

    // mapMobile = new google.maps.Map(document.getElementById(thisState.abbreviation+'-map'), { 
    // zoom: zoom,
    // center: location
    // });
    // var markerMobile = new google.maps.Marker({
    //   position: location,
    //   map: mapMobile
    // });
}

// =======================================================================
// GENERATING UNIVERSITY MARKERS
function initEducationMap(thisState) { //div is being dynamically generated in result.js line 193

  var location = {lat: lat, lng: lng};
      //searching for type term, displaying all items with that tag within given radius
        map = new google.maps.Map(document.getElementById(thisState.name.replace(/\s+/g, '-')+'-map'), {
          center: location,
          zoom: 10
        });

        infowindow = new google.maps.InfoWindow();
        var service = new google.maps.places.PlacesService(map);
        service.nearbySearch({
          location: location,
          radius: 100,
          type: ['university']
        }, callback);
      }
      //calling the function to create markers for each result
      function callback(results, status) {
        if (status === google.maps.places.PlacesServiceStatus.OK) {
          for (var i = 0; i < results.length; i++) {
            createMarker(results[i]);
          }
        }
      }
      //defining the function for creating location markers, and when they're clicked bringing up information
      function createMarker(place) {
        var placeLoc = place.geometry.location;
        var marker = new google.maps.Marker({
          map: map,
          position: place.geometry.location
        });

        google.maps.event.addListener(marker, 'click', function() {
          infowindow.setContent(place.name);
          infowindow.open(map, this);

})
      };
        //need to write code for returning map to just map with capitol marker, clear marker function?

















//AIzaSyDRdo3AR4eMaeOMWSVTgOmiW6Xu6WLSO6s = API key


