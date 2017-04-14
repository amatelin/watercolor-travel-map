'use strict'

import html2canvas from 'html2canvas';
require('./tile.stamen.js');
import FileSaver from 'file-saver';
import Counter from './Counter';
import ErrorActions from '../data/actions/ErrorActions'

const lineSymbols = {
      plainline: {
        path: 'M 0 0 0 20',
        scale: 4,
        repeat: '00px',
        rotate: -90,
      },
      dashline: {
        path: 'M 0,-1 0, 1',
        scale: 4,
        repeat: '20px',
        rotate: -90,
      },
      dots: {
        path: 'M 1 1 a 0.5 0.5 0 1 0 0.00001 0',
        scale: 3,
        repeat: '15px',
        rotate: 0,
      },
      longdash: {
        path: 'M 0, -2.5, 0, 1',
        scale: 4,
        repeat: '25px',
        rotate: 90,
      },
      mixeddash: {
        path: 'M 0 0 0 3 M 0 6 0 7',
        scale: 4,
        repeat: '40px',
        rotate: -90,
      },
      plusline: {
        path: 'M 1, 0, 1, 2, M 0, 1, 2, 1',
        scale: 3,
        repeat: '15px',
        rotate: 0,
      }
};

const markers = {
  startpoint: {
    url: 'assets/images/green-cross.png',
    scaledSize: new google.maps.Size(30, 30),
    anchor: new google.maps.Point(15, 15),
    labelOrigin: new google.maps.Point(15, -10),
  },
  endpoint: {
    url: 'assets/images/red-cross.png',
    scaledSize: new google.maps.Size(30, 30),
    anchor: new google.maps.Point(15, 15),
    labelOrigin: new google.maps.Point(15, -10),
  },
  waypoint: {
    url: 'assets/images/yellow-dot.png',
    scaledSize: new google.maps.Size(20, 20),
    anchor: new google.maps.Point(10, 10),
    labelOrigin: new google.maps.Point(15, -10),
  },
};

var directionsDisplay = null;
var directionsService = null;
var map = null;
var graphicOptions = null;
var googleMapsClient = null;
var legendOptions = {
  registered: [],
  options: {}
};

const Map = {

  addListener() {
    const initialize = () => this.initialize(this);
    google.maps.event.addDomListener(window, 'load', initialize);
  },

  initialize(that) {
    legendOptions = {
      registered: [],
      options: {}
    };

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
      zoomControl: false,
      scaleControl: false,
      streetViewControl: false,
      mapTypeControl: false
    };

    map = new google.maps.Map(document.getElementById('map-container'), mapOptions);
    map.mapTypes.set(layer, new google.maps.StamenMapType(layer));
    directionsDisplay.setMap(map);
  },

  processLegend() {
    var legendContainer = document.createElement('div');
    legendContainer.setAttribute('id', 'map-legend');

    legendOptions.registered.map(routeType => {
      var legendOption = this.generateLegend(legendOptions.options[routeType])
      legendContainer.appendChild(legendOption)
    })

    map.controls[google.maps.ControlPosition.RIGHT_BOTTOM].push(legendContainer);
  },

  generateLegend(options) {
    var div = document.createElement('div');
    var path = lineSymbols[options.lineType].path.replace(/\,/g, '');;
    var scale = Number(lineSymbols[options.lineType].scale)*2;
    var repeat = Number(lineSymbols[options.lineType].repeat.slice(0,2));
    var rotate = lineSymbols[options.lineType].rotate;
    var strokeWidth = 1;
    var id = options.lineType + Counter.increment();

    // dirty hack
    switch(options.lineType) {
      case 'mixeddash':
        repeat = repeat*2;
        break;
      case 'dots':
        strokeWidth = 0.5;
        break;
      case 'plusline':
        strokeWidth = 0.5;
        repeat = repeat * 1.5;
        break;
    }

    var wrapper = document.createElement('div');
    wrapper.setAttribute('class', 'row vertical-align-middle');

    var canvasContainer = document.createElement('div');
    canvasContainer.setAttribute('class', 'col-md-6');

    var textContainer = document.createElement('div');
    textContainer.setAttribute('class', 'col-md-6');

    var text = document.createElement('div')
    text.innerHTML = '<h4>&nbsp ' + options.title+ '</h4>';
    textContainer.appendChild(text);

    var svg = "<svg height='20' width='120' xmlns='http://www.w3.org/2000/svg' xmlns:xlink='http://www.w3.org/1999/xlink'> \
                          <defs>\
                            <symbol id='"+ id +"'>\
                              <g transform='scale(" + String(scale) + ") rotate("+ rotate +")'> \
                              <path d='" + path +"' stroke='"+options.color+"' stroke-opacity='"+options.opacity/100+"' fill='"+options.color+"' stroke-width='"+ strokeWidth +"'/>\
                              </g> \
                            </symbol> \
                          </defs>\
                          <use xlink:href='#"+id+"' x='0'/>\
                          <use xlink:href='#"+id+"' x='"+ String(repeat) +"'/>\
                          <use xlink:href='#"+id+"' x='" + String(2*repeat) +"'/>\
                          <use xlink:href='#"+id+"' x='" + String(3*repeat) +"'/>\
                          <use xlink:href='#"+id+"' x='" + String(4*repeat) +"'/>\
                          <use xlink:href='#"+id+"' x='" + String(5*repeat) +"'/>\
                          <use xlink:href='#"+id+"' x='" + String(6*repeat) +"'/>\
                          <use xlink:href='#"+id+"' x='" + String(7*repeat) +"'/>\
                        </svg>";

    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', 'canvas-' + Counter.increment());
    canvas.setAttribute('class', 'svg-canvas');
    canvg(canvas, svg)

    canvasContainer.appendChild(canvas);
    wrapper.appendChild(canvasContainer)
    wrapper.appendChild(textContainer);

    return wrapper
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
          FileSaver.saveAs(blob, "My-travel-map.png")
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
    var path = lineSymbols[options.lineType].path;
    if (options.lineType == 'plainline') {
      strokeColor = options.color.hex;
      strokeOpacity = options.color.alpha / 100;
      path = '';
    } else {
      strokeColor = '#FF0000';
      strokeOpacity = 0;
    }

    var lineSymbol = {
      path: path,
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
    var options = graphicOptions.find(option => {
      return option.inputType == routeType;
    });

    if (legendOptions.registered.indexOf(routeType) === -1)  {
      legendOptions.registered.push(routeType);
      legendOptions.options[routeType] = {
        title: routeType,
        lineType: options.options.lineType,
        color: options.options.color.hex,
        opacity: options.options.color.alpha
      };
    }

    var waypts = [];
    for (var i = 0; i < waypoints.length; i++) {
      waypts.push({
        location: waypoints[i].address,
        stopover: false
      });
    };

    var request = {
      origin: departureAddress,
      destination: arrivalAddress,
      waypoints: waypts,
      travelMode: google.maps.TravelMode.DRIVING
    };

    directionsService.route(request, function(response, status) {
      console.log(status);
      switch(status) {
        case google.maps.DirectionsStatus.OK:
          return that.drawRoute(options.options, response);
        case google.maps.DirectionsStatus.NOT_FOUND:
          return ErrorActions.throwError('ERROR_DIRECTION_NO_RESULTS', {type: routeType + ' route(s)'});
        case google.maps.DirectionsStatus.ZERO_RESULTS:
          return ErrorActions.throwError('ERROR_DIRECTION_NO_RESULTS', {type: routeType + ' route(s)'});
        case google.maps.DirectionsStatus.OVER_QUERY_LIMIT:
          return ErrorActions.throwError('ERROR_QUERY_LIMIT', {})
        default:
          return ErrorActions.throwError('ERROR_DIRECTION_SERVICE', {});
      }
    });

  },

  processGeodesic(geodesic) {
    var options = graphicOptions.find(option => {
      return option.inputType == geodesic.type;
    });

    if (legendOptions.registered.indexOf(geodesic.type) === -1)  {
      legendOptions.registered.push(geodesic.type);
      legendOptions.options[geodesic.type] = {
        title: geodesic.type,
        lineType: options.options.lineType,
        color: options.options.color.hex,
        opacity: options.options.color.alpha
      };
    }

    var coordinates = []
    this.geoCodeAddress(geodesic.departureAddress)
    .catch(error => {
      ErrorActions.throwError('ERROR_GEOCODING_SERVICE', {});
    })
    .then(firstResponse => {
      if (firstResponse.json.status === 'ZERO_RESULTS') {
        var errorInfo = {
          type: 'geodesics'
        }
        return ErrorActions.throwError('ERROR_GEOCODING_NO_RESULTS', errorInfo);
      }
      coordinates.push(firstResponse.json.results[0].geometry.location);
      this.geoCodeAddress(geodesic.arrivalAddress)
    .catch(error => {
      ErrorActions.throwError('ERROR_GEOCODING_SERVICE', {});
    })
    .then(secondResponse => {
      if (secondResponse.json.status === 'ZERO_RESULTS') {
        var errorInfo = {
          type: 'geodesics'
        }
        return ErrorActions.throwError('ERROR_GEOCODING_NO_RESULTS', errorInfo);
      }
      coordinates.push(secondResponse.json.results[0].geometry.location)
      this.drawGeodesic(options.options, coordinates)
    });
    })

  },

  processPoint(point) {
    var coordinates;
    this.geoCodeAddress(point.address)
    .catch(error => {

    })
    .then(response => {
      if (response.json.status === 'ZERO_RESULTS') {
        var errorInfo = {
          type: 'points'
        }
        return ErrorActions.throwError('ERROR_GEOCODING_NO_RESULTS', errorInfo);
      }
      var coordinates = response.json.results[0].geometry.location;
      this.drawPoint(coordinates, point.title, point.type)
    })
  },

  drawPoint(coordinates, text, markerType) {
    // silly hack because otherwise when empty the text will be [object Object]
    if (text.length === 0) text = ' ';

    var label = {
      color: '#4D4D4D',
      fontFamily: 'Homemade apple',
      fontSize: '20px',
      fontWeight: 'bold',
      text: text
    }
    var marker = new google.maps.Marker({
    position: coordinates,
    label: label,
    icon: markers[markerType]
    });

    marker.setMap(map);
  },

  addTitle(title) {
    var mapTitle = document.createElement('div');
    mapTitle.setAttribute('id', 'map-title');
    mapTitle.innerHTML = '<h2>' + title + '</h2>'
    map.controls[google.maps.ControlPosition.TOP_CENTER].push(mapTitle);
  },

  generateMap(data) {
    // re-initialize map in case it was already generated once
    this.initialize(this);

    graphicOptions = data.graphicOptions;

    // Draw routes
    // link waypoints with corresponding route
    const routesWithWaypoints = data.routesWithWaypoints(data.routes, data.waypoints);

    var counter = 0;
    routesWithWaypoints.map(route => {
      counter++
      var timeOut = 0;
      const origin = route.departureAddress;
      const destination = route.arrivalAddress;
      const routeType = route.type;
      var waypoints = route.waypoints.toList().toJS();

      if (counter >= 10) {
        timeOut = 1000*(counter-9);
      }

      const func = () => this.processRoute(this, routeType, origin, destination, waypoints);
      window.setTimeout(func, timeOut);

    });

    // Draw geodesics
    data.geodesics.map(geodesic => this.processGeodesic(geodesic));

    // Draw points
    data.points.map(point => this.processPoint(point));

    // Draw legend
    this.processLegend(legendOptions);

    // Draw title
    if (data.title) this.addTitle(data.title);
  },

}

export default Map;
