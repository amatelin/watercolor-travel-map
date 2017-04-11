'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import Route from '../models/Route';
import {ReduceStore} from 'flux/utils'
import Counter from '../../utils/Counter'
import Immutable from 'immutable'

class RouteStore extends ReduceStore {
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
  };

  withWaypoints(routes, waypoints) {
    return routes.map(route => {
      var routeWaypoints = waypoints.filter(waypoint => {
        if (waypoint.routeId === route.id) return waypoint;
      });

      route.waypoints = routeWaypoints;
      return route;
    });
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.ADD_ROUTE:
        const id = Counter.increment();
        action.id = id;
        var validationErrors = this.validateData(action.data);
        if (!validationErrors) {
          return state.set(id, new Route({
          id,
          type: action.routeType,
          departureAddress: action.data.departureAddress,
          arrivalAddress: action.data.arrivalAddress
        })); }
        else {
          action.validationErrors = validationErrors;
          return state;
        }
      case ActionTypes.EDIT_ROUTE:
        return state
                .setIn([action.id, 'departureAddress'], action.data.departureAddress)
                .setIn([action.id, 'arrivalAddress'], action.data.arrivalAddress)
      case ActionTypes.SAVE_ROUTE:
        var validationErrors = this.validateData({departureAddress: state.get(action.id).departureAddress,
                                                  arrivalAddress: state.get(action.id).arrivalAddress});
        if (!validationErrors) return state;
        else {
          action.validationErrors = validationErrors;
          return state;
        }
      case ActionTypes.DELETE_ROUTE:
        return state.delete(action.id);
      case ActionTypes.DELETE_ALL_ROUTES:
        return state.clear();
      default:
        return state;
    }
  }
}

export default new RouteStore();
