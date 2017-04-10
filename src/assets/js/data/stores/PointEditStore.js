'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import PointStore from '../stores/PointStore'
import {ReduceStore} from 'flux/utils'

class PointEditStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return false;
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.START_EDIT_POINT:
        return {
          id: action.id
        };
      case ActionTypes.SAVE_POINT:
        Dispatcher.waitFor([PointStore.getDispatchToken()]);
        if (!action.validationError) return false;
        else return {
          id: state.id,
          validationError: action.validationError
        };
      default:
        return state;
    }
  }
}

export default new PointEditStore();
