'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import PointStore from '../stores/PointStore'
import {ReduceStore} from 'flux/utils'

class PointStoreDraftStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return false;
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.OPEN_POINT_DRAFT:
        return {
          pointType: action.pointType,
          latitude: '',
          longitude: '',
          title: '',
          validationErrors: [null, null]
        };
      case ActionTypes.CLOSE_POINT_DRAFT:
        return false;
      case ActionTypes.UPDATE_POINT_DRAFT:
        return {
          pointType: state.pointType,
          latitude: action.data.latitude,
          longitude: action.data.longitude,
          title: action.data.title,
          validationErrors: [null, null]
        }
      case ActionTypes.ADD_POINT:
        Dispatcher.waitFor([PointStore.getDispatchToken()]);
        if (!action.validationErrors) return false;
        else return {
          pointType: state.pointType,
          latitude: state.latitude,
          longitude: state.longitude,
          title: state.title,
          validationErrors: action.validationErrors
        };
      default:
        return state;
    }
  }
}

export default new PointStoreDraftStore();
