'use strict'

import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';

// function run() {
//   console.log('run')
//   function mapLocation() {
//     console.log("map loc")
//
//
//
//
//     function calcRoutes() {
//       calcRoute("Montreal", "Vancouver", ["North Bay Canada", "Sault St Marie", "Thunder bay Canada", "Winnipeg", "Saskatoon", "Calgary", "Kelowna", "Toffino"]);
//       calcRoute("Denpasar", "Jakarta", ["Jember", "Lumajang", "Dampit", "Malang", "Yogjakarta", "Cirebon"]);
//       calcRoute("Singapore", "Penang", ["Mersing", "Pahang", "Temerloh", "Cameron Highlands"]);
//       calcRoute("Kuah Langkawi", "Kuah Langkawi", ["Shaka Langkawi", "Panorama Langkawi", "Tanjung Rhu Beach", "Kisap Langkawi"])
//       calcRoute("Satun", "Bangkok", ["Krabi", "Ranong", "Chumpon"]);
//       directionsDisplay.setMap(map);
//     }
//
//     function flightPaths() {
//       flightPath([{
//         lat: 49.246292,
//         lng: -123.116226
//       }, {
//         lat: -8.650000,
//         lng: 115.216667
//       }, ]);
//       flightPath([{
//         lat: -6.318540,
//         lng: 106.899117
//       }, {
//         lat: 1.290270,
//         lng: 103.851959
//       }])
//     }
//
//
//     initialize();
//   }
//   mapLocation();
// }

var directionsDisplay = null;
var directionsService = null;
var map = null;
var graphicOptions = null;
var googleMapsClient = null;

const Map = {

    addListener() {
      google.maps.event.addDomListener(window, 'load', this.initialize);
    },

    initialize() {
      console.log('init');
      googleMapsClient = require('@google/maps').createClient({
        key:  'AIzaSyBQfkTzNnYox6b-j6Byxi0Eq8wsdaxedxo',
        Promise: Promise
      });
      directionsService = new google.maps.DirectionsService();
      directionsDisplay = new google.maps.DirectionsRenderer({
        suppressMarkers: true
      });


      var center = new google.maps.LatLng(52.146973, -106.647034);
      var layer = "watercolor";
      var mapOptions = {
        zoom: 2,
        center: center,
        mapTypeId: layer,
        mapTypeControlOptions: {
          mapTypeIds: []
        },
        // navigationControl: false,
        disableDefaultUI:true
      };
      map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
      map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
      directionsDisplay.setMap(map);
      // calcRoutes();
      // flightPaths();
    },

  downloadImage(mapOptions, callback) {
    if (mapOptions.magicOptionChecked) document.getElementById("map-container").classList.add('magic-on');
    html2canvas(document.getElementById('map-container'),
    {
      useCORS: true,
      onrendered: function(canvas)
      {
          callback();
          canvas.toBlob(function(blob) {
          FileSaver.saveAs(blob, "Map.png")
        })
      }
    });
    callback();
    if (mapOptions.magicOptionChecked) document.getElementById('map-container').classList.remove('magic-on');
  },

  geoCodeAddress(address) {
    return googleMapsClient.geocode({
      address: address
    })
    .asPromise()
    // geocoder.geocode( { 'address': address}, function(results, status) {
    //   if (status == 'OK') {
    //         var temp = results[0].geometry.location;
    //   } else {
    //     alert('Geocode was not successful for the following reason: ' + status);
    //   }
    // });
  },

  drawRoute(options, response) {
    var directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: options.color.hex, //'#437070',
        strokeWeight: 4,
        strokeOpacity: options.color.alpha/100
      }
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setDirections(response);
  },

  drawGeodesic(options, coordinates) {
    console.log(options)
    var lineSymbol = {
      path: 'M 0,-1 0,1',
      strokeOpacity: options.color.alpha/100,
      strokeColor: options.color.hex,
      scale: 4
    };

    var geodesic = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: '#FF0000',
      strokeOpacity: 0,
      icons: [{
        icon: lineSymbol,
        offset: '0',
        repeat: '20px'
      }]
    });
    geodesic.setMap(map);
  },

  processRoute(that, routeType, departureAddress, arrivalAddress, waypoints) {
    var waypts = [];
    for (var i = 0; i < waypoints.length; i++) {
      waypts.push({
        location: waypoints[i].address,
        stopover: false
      });
    }

    var request = {
      origin: departureAddress,
      destination: arrivalAddress,
      waypoints: waypts,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
      if (status == google.maps.DirectionsStatus.OK) {
        var options = graphicOptions.find(option => {
          return option.inputType == routeType;
        });
        that.drawRoute(options.options, response);
      }
      else {
        alert("Directions Request from " + departureAddress + " to " + destination + " failed: " + status);
      }
    });

  },

  processGeodesic(geodesic) {
    var options = graphicOptions.find(option => {
      return option.inputType === geodesic.type;
    });

    var coordinates = []
    this.geoCodeAddress(geodesic.departureAddress)
    .then(firstResponse => {
      coordinates.push(firstResponse.json.results[0].geometry.location);
      this.geoCodeAddress(geodesic.arrivalAddress)
    .then(secondResponse => {
      coordinates.push(secondResponse.json.results[0].geometry.location)
      console.log(coordinates)
      this.drawGeodesic(options.options, coordinates)
    });
    })

  },

  generateMap(data) {
    this.initialize();

    graphicOptions = data.graphicOptions;

    const routesWithWaypoints = data.routesWithWaypoints(data.routes, data.waypoints);

    routesWithWaypoints.map(route => {
      const origin = route.departureAddress;
      const destination = route.arrivalAddress;
      const routeType = route.type;
      var waypoints = route.waypoints.toList().toJS();

      this.processRoute(this, routeType, origin, destination, waypoints);
    });

    data.geodesics.map(geodesic => {
      this.processGeodesic(geodesic);
    });
  },

}

export default Map;
