import Shepherd from 'tether-shepherd';
import RouteActions from '../data/actions/RouteActions';
import WaypointActions from '../data/actions/WaypointActions';
import GeodesicActions from '../data/actions/GeodesicActions';
import PointActions from '../data/actions/PointActions';
import RouteStore from '../data/stores/RouteStore';
import TitleActions from '../data/actions/TitleActions';
import FormStateActions from '../data/actions/FormStateActions';
import Map from './Map'

const ESCAPE_KEY_CODE = 27;
const LEFT_ARROW_KEY_CODE = 37;
const RIGHT_ARROW_KEY_CODE = 39;

let Tour = new Shepherd.Tour({
  defaults: {
    classes: 'shepherd-theme-arrows demo-content',
    showCancelLink: true,
    scrollTo: true,
  }
});

Tour.addListeners = function() {
  const start = () => {this.start()};
  window.onload = start;

  const onKeyDown = (event) => {
    if (event.keyCode === ESCAPE_KEY_CODE) Tour.cancel();
    if (event.keyCode === LEFT_ARROW_KEY_CODE) Tour.back();
    if (event.keyCode === RIGHT_ARROW_KEY_CODE) Tour.next();
  }
  document.addEventListener("keydown", onKeyDown, false);
};

Tour.addStep('first-demo-step', {
  title: 'Welcome to the Watercolor map creator!',
  text: "<p>So you want to show your friends the extent of your recent travels</p>\
  <p>Just give us a few information about your journey and a beautiful map\
  will be generated just for you! You can then save the map as an image.</p> \
  <p>Let's see how.</p>",
  buttons: [
    {text: 'Cancel',
    action: Tour.cancel,
    classes: 'btn btn-default'},
    {text: 'Next',
    action: Tour.next,
    classes: 'btn btn-primary'}
  ]
});

Tour.addStep('second-step-demo', {
  title: 'How it works',
  text: "<p>Start by adding the elements that will be drawn on the map</p>\
        <p>Let's say that your journey is defined as so:</p>\
        <ul>\
          <li>You left Paris to cycle to Berlin. On the way you went through Bruxelles.</li>\
          <li>You took a train from Berlin to Moscow</li>\
          <li>You flew from Moscow to Istanbul</li>\
        </ul>",
  attachTo: {element:'.form-panel', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ]
});

const onThirdStep = () => {
  RouteActions.closeRouteDraft();
}

Tour.addStep('third-step-demo', {
  title: 'Adding a new route',
  text: "<p>Let's add a new cycling route from Paris to Berlin.</p>",
  attachTo: {element:'#route-input-cycling', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onThirdStep
  }
});

const onFourthStep = () => {
  RouteActions.closeRouteDraft();
  RouteActions.deleteAllRoutes();
  RouteActions.openRouteDraft('cycling');
}
Tour.addStep('fourth-step-demo', {
  title: 'Setting up route parameters',
  text: "<p>This is where we add the parameters of our the first leg of our journey.\
          The resulting path will be drawn following the shortest route found between \
          these two points\
        </p>\
        <p>In our example, \
            we departed from Paris to arrive at Berlin.</p> \
        <p>\
            We fill in the information\
            and click save to register the new route.\
        </p>",
  attachTo: {element:'#route-input-cycling', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onFourthStep
  }
});

const onFifthStep = () => {
  RouteActions.deleteAllRoutes();
  RouteActions.addRoute('cycling', {departureAddress: 'Paris', arrivalAddress: 'Berlin'});
}

Tour.addStep('fifth-step-demo', {
  title: 'Adding a waypoint',
  text: "<p>We need to add a waypoint to ensure that the route will go\
          through Bruxelles.\
        </p>",
  attachTo: {element:'#route-input-cycling', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onFifthStep
  }
});

const onSixthStep = () => {
  RouteActions.deleteAllRoutes();
  RouteActions.addRoute('cycling', {departureAddress: 'Paris', arrivalAddress: 'Berlin'});

  var routes = RouteStore.getState().toArray();
  var id = routes[0].id

  WaypointActions.deleteAllWaypoints();
  WaypointActions.openWaypointDraft(id);
}

Tour.addStep('sixth-step-demo', {
  title: 'Adding a waypoint',
  text: "<p>We enter Bruxelles as the waypoint location and save it.\
        </p> ",
  attachTo: {element:'#route-input-cycling', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onSixthStep
  }
});

const onSeventhStep = () => {
  RouteActions.deleteAllRoutes();
  RouteActions.addRoute('cycling', {departureAddress: 'Paris', arrivalAddress: 'Berlin'});

  var routes = RouteStore.getState().toArray();
  var id = routes[0].id

  WaypointActions.closeWaypointDraft();
  WaypointActions.deleteAllWaypoints();
  WaypointActions.addWaypoint(id, 'Bruxelles');
}

Tour.addStep('seventh-step-demo', {
  title: 'Cycling route complete!',
  text: "<p>You are all set with the cycling leg of your trip. The route\
          generated will leave Paris, pass by Bruxelles and reach Berlin.\
        </p>\
        <p>Note: only 8 waypoints/route are allowed. The first one will be used \
          right after the departure location, the last one before the arrival location.\
            .</p> ",
  attachTo: {element:'#route-input-cycling', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onSeventhStep
  }
});

const onEigthStep = () => {
  RouteActions.deleteAllRoutes();
  RouteActions.addRoute('cycling', {departureAddress: 'Paris', arrivalAddress: 'Berlin'});
  var routes = RouteStore.getState().toArray();
  var id = routes[0].id

  WaypointActions.deleteAllWaypoints();
  WaypointActions.addWaypoint(id, 'Bruxelles');
}

Tour.addStep('eigth-step-demo', {
  title: 'Adding a train route',
  text: "<p>You can now add your train ride between Berlin and Moscow.\
        </p>The process is the same for any type of routes.</p>",
  attachTo: {element:'#route-input-train', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onEigthStep
  }
});

const onNinethStep = () => {
  RouteActions.deleteAllRoutes();
  RouteActions.addRoute('cycling', {departureAddress: 'Paris', arrivalAddress: 'Berlin'});
  var routes = RouteStore.getState().toArray();
  var id = routes[0].id

  WaypointActions.deleteAllWaypoints();
  WaypointActions.addWaypoint(id, 'Bruxelles');

  RouteActions.addRoute('train', {departureAddress: 'Berlin', arrivalAddress: 'Moscow'});
}

Tour.addStep('nineth-step-demo', {
  title: 'Train route complete!',
  text: "<p>No waypoint to add this time</p>\
        </p>Let's take care of our flight now.\
            .</p> ",
  attachTo: {element:'#route-input-train', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onNinethStep
  }
});

const onTenthStep = () => {
  GeodesicActions.closeGeodesicDraft();
}

Tour.addStep('tenth-step-demo', {
  title: 'Adding a new geodesic',
  text: "<p>Let's add your flight between Moscow and Istanbul.</p>\
        <p>A geodesic is the shortest path between two path on a curved plane.\
        We use it to represent direct links between two places.\
        </p> ",
  attachTo: {element:'#geodesic-input-flight', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onTenthStep
  }
});

const onEleventhStep = () => {
  GeodesicActions.openGeodesicDraft('flight');
  GeodesicActions.updateGeodesicDraft({departureAddress: 'Moscow', arrivalAddress: 'Istanbul'});
  GeodesicActions.deleteAllGeodesics();
}

Tour.addStep('eleventh-step-demo', {
  title: 'Adding a new geodesic',
  text: "<p>The process is in all ways similar to the way we added the route, except\
    that no waypoint is allowed.\
        </p>",
  attachTo: {element:'#geodesic-input-flight', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onEleventhStep
  }
});

const onTwelvthStep = () => {
  PointActions.deleteAllPoints();

  GeodesicActions.closeGeodesicDraft();
  GeodesicActions.deleteAllGeodesics();
  GeodesicActions.addGeodesic('flight', {departureAddress: 'Moscow', arrivalAddress: 'Istanbul'});
}

Tour.addStep('twelvth-step-demo', {
  title: 'Flight route complete!',
  text: "<p>We're almost there.\
        </p>\
        <p>We'll just add two markers to show where your journey started and ended as well as a title for the map.\
        </p> ",
  attachTo: {element:'#geodesic-input-flight', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onTwelvthStep
  }
});

const onThirteenthStep = () => {
  PointActions.deleteAllPoints();
  PointActions.addPoint('startpoint', {address: 'Paris', title: 'Paris'});
}

Tour.addStep('thirteenth-step-demo', {
  title: 'Adding a new starting point',
  text: "<p>No difficulties here. We simply set Paris as the location for our starting point marker.\
        </p>\
        <p>We also set the name of the city as a title for the marker (this is optional).\
        </p> ",
  attachTo: {element:'#point-input-startpoint', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onThirteenthStep
  }
});

const onFourteenthStep = () => {
  PointActions.deleteAllPoints();
  PointActions.addPoint('startpoint', {address: 'Paris', title: 'Paris'});
  PointActions.addPoint('endpoint', {address: 'Istanbul', title: 'Istanbul'});

  TitleActions.deleteTitle();
}

Tour.addStep('fourteenth-step-demo', {
  title: 'Adding a new arrival point',
  text: "<p>And we do the same thing adding an arrival marker on Istanbul.\
        </p> ",
  attachTo: {element:'#point-input-endpoint', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onFourteenthStep
  }
});

const onFifteenthStep = () => {
  TitleActions.addTitle('My incredible journey across Europe');
}

Tour.addStep('fifteenth-step-demo', {
  title: 'Setting a title for the map',
  text: "<p>Finally we add a title that will be displayed centered at the top of the map.\
        </p> ",
  attachTo: {element:'#title-input', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    show: onFifteenthStep
  }
});

const onSixteenthStep = () => {
  FormStateActions.toStep(0);
}

Tour.addStep('sixtheenth-step-demo', {
  title: 'Next: setting the graphical parameters',
  text: "<p>You're ready to move on to the next step.\
        </p> ",
  attachTo: {element:'#next-step-button', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    'before-show': onSixteenthStep
  }
});

const onSeventeenthStep = () => {
  FormStateActions.toStep(1);
}

Tour.addStep('seventeenth-step-demo', {
  title: 'Setting graphical parameters',
  text: "<p>Here you can choose the color and line type of every route and geodesic type.\
        </p> \
        <p>We'll just leave it on default for the demo.</p>",
  attachTo: {element:'#second-step-form-panel', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    'before-show': onSeventeenthStep
  }
});
const onEighteenthStep = () => {
  FormStateActions.toStep(1);
}

Tour.addStep('eighteenth-step-demo', {
  title: 'Generate the map',
  text: "<p>The different elements we set-up during the next step.\
        will now be drawn on the map, using the colors and line types \
        chosen in this section</p>",
  attachTo: {element:'#generate-map-button-container', on:'right'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    'before-show': onEighteenthStep
  }
});

const onNineteenthStep = () => {
  var button = document.getElementById("generate-map-button");
  if (button) button.click();
}

Tour.addStep('nineteenth-step-demo', {
  title: 'Adjusting the zoom level',
  text: "<p>The map is now ready. Adjust the zoom level to and center the map \
        according to the end result you are looking for.</p>",
  attachTo: {element:'#map-wrapper', on:'left'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Next',
      action: Tour.next,
    classes: 'btn btn-primary'},
  ],
  when: {
    'before-show': onNineteenthStep
  }
});

const onTwentiethStep = () => {
  FormStateActions.toStep(2);
}

Tour.addStep('twentieth-step-demo', {
  title: 'Downloading the map',
  text: "<p>When you are satisfied with the layout of your map, download the image as a .png</p>\
        <p>That's it!</p>",
  attachTo: {element:'#download-button-container', on:'bottom'},
  buttons: [
    {text: 'Previous',
    action: Tour.back,
    classes: 'btn btn-primary'},
    {text: 'Got it!',
      action: Tour.complete,
    classes: 'btn btn-success'},
  ],
  when: {
    show: onTwentiethStep
  }
});

Tour.on('complete', function() {
  WaypointActions.deleteAllWaypoints();
  RouteActions.deleteAllRoutes();
  GeodesicActions.deleteAllGeodesics();
  PointActions.deleteAllPoints();
  TitleActions.deleteTitle();
  FormStateActions.toStep(0);
  Map.initialize();
});

Tour.on('cancel', function() {
  WaypointActions.deleteAllWaypoints();
  RouteActions.deleteAllRoutes();
  GeodesicActions.deleteAllGeodesics();
  PointActions.deleteAllPoints();
  TitleActions.deleteTitle();
  FormStateActions.toState(0);
  Map.initialize();
});


export default Tour;
