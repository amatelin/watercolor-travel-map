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
          address: '',
          title: '',
          validationError: null
        };
      case ActionTypes.CLOSE_POINT_DRAFT:
        return false;
      case ActionTypes.UPDATE_POINT_DRAFT:
        return {
          pointType: state.pointType,
          address: action.data.address,
          title: action.data.title,
          validationError: null
        }
      case ActionTypes.ADD_POINT:
        Dispatcher.waitFor([PointStore.getDispatchToken()]);
        if (!action.validationError) return false;
        else return {
          pointType: state.pointType,
          address: state.address,
          title: state.title,
          validationError: action.validationError
        };
      default:
        return state;
    }
  }
}

export default new PointStoreDraftStore();
