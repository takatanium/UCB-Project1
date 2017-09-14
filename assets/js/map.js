// BASIC MAP AND CAPITOL MARKER GENERATION
// var mapMobile;

// Google Maps function for generating latitude and longitude to be used for placing marker
// $(document).on('ready', 
  // let overlay;

  // PoiOverlay.prototype = new google.maps.OverlayView();


function initMap(thisState, showPoi) { //Poi = points of interest

  if (thisState !== undefined && thisState !== -1) {

    let userLocation =  thisState.capitol + "," + thisState.abbreviation; 
    geoCodeAddress(userLocation)
    .then(function(results) {
      let lat1 = results[0].geometry.location.lat();
      let lng1 = results[0].geometry.location.lng();
      if (showPoi) {
        initEducationMap(thisState, lat1, lng1);
      } else {
        tagLocation(thisState, lat1, lng1);
      }
    })
    .catch(function(status) {
    });
  }
}

// Geocoding the location
function geoCodeAddress(address) {
  let geocoder = new google.maps.Geocoder();  
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
  let zoom;
  if(thisState.scale !== undefined) {
    zoom = thisState.scale;
    } 
    else {
    zoom = 6;
  }
  return zoom;
}

// Generating the map and placing a marker at the location geocoded previously
function tagLocation(thisState, lat, lng) {

  let location = {lat: lat, lng: lng};

  let zoom = mapZoom(thisState);

  let map = new google.maps.Map(document.getElementById(thisState.name.replace(/\s+/g, '-')+'-map'), { 
  zoom: zoom,
  center: location
  });
  let marker = new google.maps.Marker({
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
function initEducationMap(thisState, lat, lng) {

  let location = {lat: lat, lng: lng};

  //searching for type term, displaying all items with that tag within given radius
  let map = new google.maps.Map(document.getElementById(thisState.name.replace(/\s+/g, '-')+'-map'), {
    center: location,
    zoom: 8
  });
    
  infowindow = new google.maps.InfoWindow({});
  let service = new google.maps.places.PlacesService(map); //error: LatLngLiteral: in property lat: not a number...fixed by taking out "typeof"? Test when data.js is working again.
  service.nearbySearch({ 
    location: location, //research setCenter function so it doesn't throw errors like a turd
    radius: 5000,
    type: ['university']
  }, callback);

  //calling the function to create markers for each result
  function callback(results, status) {
    let bounds = new google.maps.LatLngBounds();
    if(Array.isArray(results)){
      if (status === google.maps.places.PlacesServiceStatus.OK) {
        for (let i = 0; i < results.length; i++) {
          let position = new google.maps.LatLng(results[i].geometry.location.lat(), results[i].geometry.location.lng());
          bounds.extend(position);

          let marker = new google.maps.Marker({
            position: position,
            map: map
          });
          map.fitBounds(bounds)
          google.maps.event.addListener(marker, 'click', (function(marker, i) {
            return function() {
              infowindow.setContent(results[i].name);
              infowindow.open(map, marker);
            }
          })(marker, i));
        }
      }
    } else {createMarker(results)}
  }
}
      
    
//defining the function for creating location markers, and when they're clicked bringing up information
function createMarker(place) {
  let placeLoc = place.geometry.location;
  let marker = new google.maps.Marker({
    map: map,
    position: place.geometry.location
  });

  google.maps.event.addListener(marker, 'click', function() {
    infowindow.setContent(place.name);
    infowindow.open(map, this);
  });
}

//AIzaSyDRdo3AR4eMaeOMWSVTgOmiW6Xu6WLSO6s = API key