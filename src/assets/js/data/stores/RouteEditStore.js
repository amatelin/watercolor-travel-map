'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import RouteStore from '../stores/RouteStore'
import {ReduceStore} from 'flux/utils'

class RouteEditStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return false;
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.START_EDIT_ROUTE:
        console.log('edit route')
        return {
          id: action.id
        };
      case ActionTypes.SAVE_ROUTE:
        Dispatcher.waitFor([RouteStore.getDispatchToken()]);
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

export default new RouteEditStore();
