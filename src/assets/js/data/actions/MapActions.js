import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/Dispatcher';
import Map from '../../utils/Map';

const MapActions = {
  toggleLoader() {
    Dispatcher.dispatch({
      type: ActionTypes.TOGGLE_LOADER,
    });
  },
  toggleMagicOption() {
    console.log('dispatched')
    Dispatcher.dispatch({
      type: ActionTypes.TOGGLE_MAGIC_OPTION,
    });
  },
  generateMap(data) {
    Map.generateMap({
      points: data.points,
      routes: data.routes,
      title: data.title,
      waypoints: data.waypoints,
      geodesics: data.geodesics,
      graphicOptions: data.graphicOptions,
      routesWithWaypoints: data.routesWithWaypoints
    });

    Dispatcher.dispatch({
      type: ActionTypes.GENERATE_MAP
    });
  },
}

export default MapActions;
