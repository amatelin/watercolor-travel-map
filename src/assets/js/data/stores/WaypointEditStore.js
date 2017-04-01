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
        Dispatcher.waitFor([WaypointStore.getDispatchToken()]); // enable if validation used
        if (!action.validationError) return false;
        else return {
          id: state.id,
          validationError: action.validationError
        }
      default:
        return state;
    }
  }
}

export default new WaypointEditStore();
