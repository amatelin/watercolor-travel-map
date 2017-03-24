//var myCenter = new google.maps.LatLng(51.508742, -0.120850);
function run() {
  function mapLocation() {
    var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;


    function initialize() {
      directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
      });


      var center = new google.maps.LatLng(52.146973, -106.647034);
      var layer = "watercolor";

      var mapOptions = {
        zoom: 1,
        center: center,
        mapTypeId: layer,
        mapTypeControlOptions: {
          mapTypeIds: [layer]
        }
      };
      map = new google.maps.Map(document.getElementById('googleMap'), mapOptions);
      map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
      directionsDisplay.setMap(map);
      calcRoutes();
      flightPaths();
    }

    function renderDirections(result) {
      var directionsRenderer = new google.maps.DirectionsRenderer({
        suppressMarkers: true,
        polylineOptions: {
          strokeColor: "#805500", //'#437070',
          strokeWeight: 4,
          strokeOpacity: 0.75
        }
      });
      directionsRenderer.setMap(map);
      directionsRenderer.setDirections(result);
    }

    function calcRoute(origin, destination, waypoints) {
      var waypts = [];
      for (var i = 0; i < waypoints.length; i++) {
        waypts.push({
          location: waypoints[i],
          stopover: false
        });
      }

      var request = {
        origin: origin,
        destination: destination,
        waypoints: waypts,
        travelMode: google.maps.TravelMode.DRIVING
      };
      directionsService.route(request, function(response, status) {
        if (status == google.maps.DirectionsStatus.OK) {
          renderDirections(response);

        }
        else {
          alert("Directions Request from " + origin + " to " + destination + " failed: " + status);
        }
      });

    }

    function calcRoutes() {
      calcRoute("Montreal", "Vancouver", ["North Bay Canada", "Sault St Marie", "Thunder bay Canada", "Winnipeg", "Saskatoon", "Calgary", "Kelowna", "Toffino"]);
      calcRoute("Denpasar", "Jakarta", ["Jember", "Lumajang", "Dampit", "Malang", "Yogjakarta", "Cirebon"]);
      calcRoute("Singapore", "Penang", ["Mersing", "Pahang", "Temerloh", "Cameron Highlands"]);
      calcRoute("Kuah Langkawi", "Kuah Langkawi", ["Shaka Langkawi", "Panorama Langkawi", "Tanjung Rhu Beach", "Kisap Langkawi"])
      calcRoute("Satun", "Bangkok", ["Krabi", "Ranong", "Chumpon"]);
      directionsDisplay.setMap(map);
    }

    function flightPath(flightPlanCoordinates) {
      var lineSymbol = {
        path: 'M 0,-1 0,1',
        strokeOpacity: 1,
        strokeColor: "#0042ad",
        scale: 4
      };


      var flightPath = new google.maps.Polyline({
        path: flightPlanCoordinates,
        geodesic: true,
        strokeColor: '#FF0000',
        strokeOpacity: 0,
        icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: '20px'
        }]
      });
      flightPath.setMap(map);
    }

    function flightPaths() {
      flightPath([{
        lat: 49.246292,
        lng: -123.116226
      }, {
        lat: -8.650000,
        lng: 115.216667
      }, ]);
      flightPath([{
        lat: -6.318540,
        lng: 106.899117
      }, {
        lat: 1.290270,
        lng: 103.851959
      }])
    }


    google.maps.event.addDomListener(window, 'load', initialize);
  }
  mapLocation();
}

run();
