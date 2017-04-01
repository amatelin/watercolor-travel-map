'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import WaypointStore from '../stores/WaypointStore'
import {ReduceStore} from 'flux/utils'

class RouteDraftStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return false;
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.OPEN_WAYPOINT_DRAFT:
        return {
          routeId: action.routeId,
          address: ''
        };
      case ActionTypes.CLOSE_WAYPOINT_DRAFT:
        return false;
      case ActionTypes.UPDATE_WAYPOINT_DRAFT:
        return {
          routeId: state.routeId,
          address: action.address
        }
      case ActionTypes.ADD_WAYPOINT:
        // Dispatcher.waitFor([RouteStore.getDispatchToken()]);
        return false;
      default:
        return state;
    }
  }
}

export default new RouteDraftStore();
