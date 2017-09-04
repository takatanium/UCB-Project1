function initMap() {

  let index = states.findIndex(function(element) {
        var userLocation =  element.capitol //need to pick this up via json
        var geocoder = new google.maps.Geocoder();  

        geocoder.geocode ({
          address: userLocation
        }, function(locResult) {
            console.log(locResult);
            var lat1 = locResult[0].geometry.location.lat();
            console.log(lat1);
            var lng1 = locResult[0].geometry.location.lng();
            console.log(lng1);
          // });

        var capLocation = {lat: lat1, lng: lng1};
        var map = new google.maps.Map(document.getElementById('#' + element.name), { //need json for printing to all maps
          zoom: 6,
          center: capLocation
        });
        var marker = new google.maps.Marker({
          position: capLocation,
          map: map
        });
    });
});
};

//AIzaSyDRdo3AR4eMaeOMWSVTgOmiW6Xu6WLSO6s = API key

// // $().ready(function() {

// var userLocation = "Springfield, Illinois"
// var geocoder = new google.maps.Geocoder();

// geocoder.geocode ({
// 	address: userLocation
//         }, function(locResult) {
//             console.log(locResult);
//             var lat1 = locResult[0].geometry.location.lat();
//             console.log(lat1);
//             var lng1 = locResult[0].geometry.location.lng();
//             console.log(lng1);
//             $("#map").html("latitude:" + lat1 + "<p>longitude:" + lng1 + "</p>");

//         //     initMap(lat1.toFixed(3), lng1.toFixed(3));
//         // });
// 	// });

//          //    function initMap(lat1, lng1) {
//         	// 	var uluru = {lat: parseInt(lat1), lng: parseInt(lng1)};
//         	// 	console.log(uluru);
//         	// 	var map = new google.maps.Map(document.getElementById('map'), {
//          //  		zoom: 4,
//          //  		center: uluru
//         	// });
//         		// var marker = new google.maps.Marker({
//           		// position: uluru,
//           		// map: map
//         // });
//     });

        




// 	// var capLat = locResult[].geometry.location.lat();
// 	// var capLng = locResult[].geometry.location.lng();

// 	// if (stateName !== undefined) {
// 	//   var state = {lat: lat, lng: long};
// 	//   var stateMap = new google.maps.Map(document.getElementById(stateName+'-map'), {
// 	//     zoom: 4,
// 	//     center: state
// 	//   });
// 	// }
// // }
