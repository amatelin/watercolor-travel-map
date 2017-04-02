'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import Geodesic from '../models/Geodesic';
import {ReduceStore} from 'flux/utils'
import Counter from '../../utils/Counter'
import Immutable from 'immutable'

class GeodesicStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  validateData(data) {
    if (data.latitude && data.longitude) return null;
    if (data.latitude && !data.longitude) return [null, 'error'];
    if (!data.latitude && data.longitude) return ['error', null];
    else return ['error', 'error'];
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.ADD_GEODESIC:
        const id = Counter.increment();
        action.id = id;
        var validationErrors = this.validateData(action.data);
        if (!validationErrors) {
          return state.set(id, new Geodesic({
          id,
          type: action.geodesicType,
          coordinates: {latitude: action.data.latitude,
                        longitude: action.data.longitude}
        })); }
        else {
          action.validationErrors = validationErrors;
          return state;
        }
      case ActionTypes.EDIT_GEODESIC:
        return state
                .setIn([action.id, 'coordinates'], action.data)
      case ActionTypes.SAVE_GEODESIC:
        var validationErrors = this.validateData({latitude: state.get(action.id).coordinates.latitude,
                                                  longitude: state.get(action.id).coordinates.longitude});
        if (!validationErrors) return state;
        else {
          action.validationErrors = validationErrors;
          return state;
        }
      case ActionTypes.DELETE_GEODESIC:
        return state.delete(action.id);
      default:
        return state;
    }
  }
}

export default new GeodesicStore();
