'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import RouteStore from '../stores/RouteStore'
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
      case ActionTypes.OPEN_ROUTE_DRAFT:
        return {
          routeType: action.routeType,
          arrivalAddress: '',
          departureAddress: '',
          validationErrors: [null, null]
        };
      case ActionTypes.CLOSE_ROUTE_DRAFT:
        return false;
      case ActionTypes.UPDATE_ROUTE_DRAFT:
        return {
          routeType: state.routeType,
          departureAddress: action.data.departureAddress,
          arrivalAddress: action.data.arrivalAddress,
          validationErrors: [null, null]
        }
      case ActionTypes.ADD_ROUTE:
        Dispatcher.waitFor([RouteStore.getDispatchToken()]);
        if (!action.validationErrors) return false;
        else return {
          routeType: state.routeType,
          departureAddress: state.departureAddress,
          arrivalAddress: state.arrivalAddress,
          validationErrors: action.validationErrors
        };
      default:
        return state;
    }
  }
}

export default new RouteDraftStore();
