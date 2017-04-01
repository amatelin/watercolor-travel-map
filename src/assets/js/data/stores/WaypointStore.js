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

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.ADD_WAYPOINT:
        console.log(action)
        const id = Counter.increment();
        action.id = id;
        return state.set(id, new Waypoint({
        id,
        routeId: action.routeId,
        address: action.address
      }));
      case ActionTypes.EDIT_WAYPOINT:
        return state.setIn([action.id, 'address'], action.address)
      case ActionTypes.SAVE_WAYPOINT:
          return state;
      case ActionTypes.DELETE_WAYPOINT:
        return state.delete(action.id);
      default:
        return state;
    }
  }
}

export default new WaypointStore();
