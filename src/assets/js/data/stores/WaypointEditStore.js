'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import WaypointStore from '../stores/WaypointStore'
import {ReduceStore} from 'flux/utils'

class WaypointEditStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return false;
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.START_EDIT_WAYPOINT:
        return {
          id: action.id
        };
      case ActionTypes.SAVE_WAYPOINT:
        // Dispatcher.waitFor([RouteStore.getDispatchToken()]); // enable if validation used
        return false;
      default:
        return state;
    }
  }
}

export default new WaypointEditStore();
