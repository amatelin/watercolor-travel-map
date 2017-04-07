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
    if (data.departureAddress && data.arrivalAddress) return null;
    if (data.departureAddress && !data.arrivalAddress) return [null, 'error'];
    if (!data.departureAddress && data.arrivalAddress) return ['error', null];
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
            departureAddress: action.data.departureAddress,
            arrivalAddress: action.data.arrivalAddress
            })
          );
        }
        else {
          action.validationErrors = validationErrors;
          return state;
        }
      case ActionTypes.EDIT_GEODESIC:
        return state
                .setIn([action.id, departureAddress], action.data.departureAddress)
                .setIn([action.id, arrivalAddress], action.data.arrivalAddress)
      case ActionTypes.SAVE_GEODESIC:
        var validationErrors = this.validateData({departureAddress: state.get(action.id).departureAddress,
                                                  arrivalAddress: state.get(action.id).arrivalAddress});
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
