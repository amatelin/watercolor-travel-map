'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import GeodesicStore from '../stores/GeodesicStore'
import {ReduceStore} from 'flux/utils'

class GeodesicStoreDraftStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return false;
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.OPEN_GEODESIC_DRAFT:
        return {
          geodesicType: action.geodesicType,
          departureAddress: '',
          arrivalAddress: '',
          validationErrors: [null, null]
        };
      case ActionTypes.CLOSE_GEODESIC_DRAFT:
        return false;
      case ActionTypes.UPDATE_GEODESIC_DRAFT:
        return {
          geodesicType: state.geodesicType,
          departureAddress: action.data.departureAddress,
          arrivalAddress: action.data.arrivalAddress,
          validationErrors: [null, null]
        }
      case ActionTypes.ADD_GEODESIC:
        Dispatcher.waitFor([GeodesicStore.getDispatchToken()]);
        if (!action.validationErrors) return false;
        else return {
          geodesicType: state.geodesicType,
          departureAddress: state.departureAddress,
          arrivalAddress: state.arrivalAddress,
          validationErrors: action.validationErrors
        };
      default:
        return state;
    }
  }
}

export default new GeodesicStoreDraftStore();
