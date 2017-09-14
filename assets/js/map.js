// BASIC MAP AND CAPITOL MARKER GENERATION
var mapMobile;

// Google Maps function for generating latitude and longitude to be used for placing marker
// $(document).on('ready', 

  function initMap(thisState) {

  if (thisState !== undefined && thisState !== -1) {

    var userLocation =  thisState.capitol + "," + thisState.abbreviation; 

    geoCodeAddress(userLocation)
    .then(function(results) {
      let lat1 = results[0].geometry.location.lat();
      let lng1 = results[0].geometry.location.lng();
      tagLocation(thisState, lat1, lng1);

      // $(document).on('click', '#' + thisState.abbreviation +'-stat-list', 
      //$('#AL-list-head').on('click', initEducationMap(thisState, lat1, lng1))
        initEducationMap(thisState, lat1, lng1);
      
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

  //Mobile responsiveness
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
// $(document).on('click', '#AL-stat-list', 
  function initEducationMap(thisState, lat, lng) {

  var location = {lat: lat, lng: lng};
  console.log(location)

      //searching for type term, displaying all items with that tag within given radius
        var map = new google.maps.Map(document.getElementById(thisState.name.replace(/\s+/g, '-')+'-map'), {
          
          center: location,
          zoom: 8
        });
        
        infowindow = new google.maps.InfoWindow({});
        var service = new google.maps.places.PlacesService(map); //error: LatLngLiteral: in property lat: not a number...fixed by taking out "typeof"? Test when data.js is working again.
        service.nearbySearch({ 
          location: location, //research setCenter function so it doesn't throw errors like a turd
          radius: 5000,
          type: ['university']
        }, callback);
      // }
      //calling the function to create markers for each result
      function callback(results, status) {
        var bounds = new google.maps.LatLngBounds();
          console.log("=====results======", results)
        if(Array.isArray(results)){
        if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (var i = 0; i < results.length; i++) {
        var position = new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng());
        bounds.extend(position);
        

        var marker = new google.maps.Marker({
        position: position,
        map: map
      });
      map.fitBounds(bounds)
      google.maps.event.addListener(marker, 'click', (function(marker, i) {
        return function() {
          infowindow.setContent(results[i][0]);
          infowindow.open(map, marker);
          }
        })(marker, i));
      }
    }
  }else {createMarker(results)}
        console.log(results);
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
          console.log(place.name);
          infowindow.open(map, this);

})
      };

    };
        //need to write code for returning map to just map with capitol marker, clear marker function?


//AIzaSyDRdo3AR4eMaeOMWSVTgOmiW6Xu6WLSO6s = API key


