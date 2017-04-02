'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import WaypointStore from '../stores/WaypointStore';
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
          address: '',
          validationError: null
        };
      case ActionTypes.CLOSE_WAYPOINT_DRAFT:
        return false;
      case ActionTypes.UPDATE_WAYPOINT_DRAFT:
        return {
          routeId: state.routeId,
          address: action.address,
          validationError: null
        }
      case ActionTypes.ADD_WAYPOINT:
        Dispatcher.waitFor([WaypointStore.getDispatchToken()]);
        if (!action.validationError) return false;
        else return {
          address: state.address,
          routeId: state.routeId,
          validationError: action.validationError
        }
        return false;
      default:
        return state;
    }
  }
}

export default new RouteDraftStore();
