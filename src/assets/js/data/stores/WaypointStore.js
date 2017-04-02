'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import Waypoint from '../models/Waypoint';
import {ReduceStore} from 'flux/utils'
import Counter from '../../utils/Counter'
import Immutable from 'immutable'

class WaypointStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  validateData(data) {
    if (data.length>0) return null;
    else return 'error';
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.ADD_WAYPOINT:
        const id = Counter.increment();
        action.id = id;
        var validationError = this.validateData(action.address);
        if (!validationError) {
          return state.set(id, new Waypoint({
            id,
            routeId: action.routeId,
            address: action.address
          }));
        }
        else {
          action.validationError = validationError;
          return state;
        }
      case ActionTypes.EDIT_WAYPOINT:
        var state = state.setIn([action.id, 'address'], action.address)
        return state;
      case ActionTypes.SAVE_WAYPOINT:
        var validationError = this.validateData(state.get(action.id).address);

        if (!validationError) return state;
        else {
          action.validationError = validationError;
          return state
        }
      case ActionTypes.DELETE_WAYPOINT:
        return state.delete(action.id);
      default:
        return state;
    }
  }
}

export default new WaypointStore();
