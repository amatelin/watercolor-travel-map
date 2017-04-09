'use strict'

import html2canvas from 'html2canvas';
import FileSaver from 'file-saver';

const lineSymbols = {
      plainline: {
        path: '',
        scale: 0,
        repeat: 0
      },
      dashline: {
        path: 'M 0,-1 0,1',
        scale: 4,
        repeat: '20px'
      },
      dots: {
        path: google.maps.SymbolPath.CIRCLE,
        scale: 2,
        repeat: '15px'
      },
      longdash: {
        path: 'M 0, -2.5, 0, 1',
        scale: 4,
        repeat: '25px'
      },
      mixeddash: {
        path: 'M 0, -2.5, 0, 1, M 0, 4, 0, 5',
        scale: 4,
        repeat: '40px'
      },
      plusline: {
        path: 'M 1, 0, 1, 2, M 0, 1, 2, 1',
        scale: 3,
        repeat: '15px'
      }
};

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
        disableDefaultUI:true
      };
      map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
      map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
      directionsDisplay.setMap(map);
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
  },

  drawRoute(options, response) {
    var strokeColor;
    var strokeOpacity;
    if (options.lineType == 'plainline') {
      strokeColor = options.color.hex;
      strokeOpacity = options.color.alpha / 100;
    } else {
      strokeColor = '#FF0000';
      strokeOpacity = 0;
    }

    var lineSymbol = {
      path: lineSymbols[options.lineType].path,
      strokeOpacity: options.color.alpha/100,
      strokeColor: options.color.hex,
      fillOpacity: options.color.alpha/100,
      fillColor: options.color.hex,
      scale: lineSymbols[options.lineType].scale
    };

    var directionsRenderer = new google.maps.DirectionsRenderer({
      suppressMarkers: true,
      polylineOptions: {
        strokeColor: strokeColor,
        strokeOpacity: strokeOpacity,
        strokeWeight: 4,
        icons: [{
          icon: lineSymbol,
          offset: '0',
          repeat: lineSymbols[options.lineType].repeat
        }]
      }
    });
    directionsRenderer.setMap(map);
    directionsRenderer.setDirections(response);
  },

  drawGeodesic(options, coordinates) {
    var strokeColor;
    var strokeOpacity;
    if (options.lineType == 'plainline') {
      strokeColor = options.color.hex;
      strokeOpacity = options.color.alpha / 100;
    } else {
      strokeColor = '#FF0000';
      strokeOpacity = 0;
    }

    var lineSymbol = {
      path: lineSymbols[options.lineType].path,
      strokeOpacity: options.color.alpha/100,
      strokeColor: options.color.hex,
      fillOpacity: options.color.alpha/100,
      fillColor: options.color.hex,
      scale: lineSymbols[options.lineType].scale
    };

    var geodesic = new google.maps.Polyline({
      path: coordinates,
      geodesic: true,
      strokeColor: strokeColor,
      strokeOpacity: strokeOpacity,
      icons: [{
        icon: lineSymbol,
        offset: '0',
        repeat: lineSymbols[options.lineType].repeat
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
