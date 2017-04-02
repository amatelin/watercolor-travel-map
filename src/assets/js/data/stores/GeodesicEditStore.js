'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import GeodesicStore from '../stores/GeodesicStore'
import {ReduceStore} from 'flux/utils'

class GeodesicEditStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return false;
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.START_EDIT_GEODESIC:
        return {
          id: action.id
        };
      case ActionTypes.SAVE_GEODESIC:
        Dispatcher.waitFor([GeodesicStore.getDispatchToken()]);
        if (!action.validationErrors) return false;
        else return {
          id: state.id,
          validationErrors: action.validationErrors
        };
      default:
        return state;
    }
  }
}

export default new GeodesicEditStore();
