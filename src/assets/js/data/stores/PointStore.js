'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import Point from '../models/Point';
import {ReduceStore} from 'flux/utils'
import Counter from '../../utils/Counter'
import Immutable from 'immutable'

class PointStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  validateData(data) {
    if (data.address.length > 0) return null;
    else return 'error'
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.ADD_POINT:
        const id = Counter.increment();
        action.id = id;
        var validationError = this.validateData(action.data);
        if (!validationError) {
          return state.set(id, new Point({
          id,
          type: action.pointType,
          address: action.data.address,
          title: action.data.title
        })); }
        else {
          action.validationError = validationError;
          return state;
        }
      case ActionTypes.EDIT_POINT:
        return state
                .setIn([action.id, 'address'], action.data.address)
                .setIn([action.id, 'title'], action.data.title)
      case ActionTypes.SAVE_POINT:
        var validationError = this.validateData(state.get(action.id));
        if (!validationError) return state;
        else {
          action.validationError = validationError;
          return state;
        }
      case ActionTypes.DELETE_POINT:
        return state.delete(action.id);
      default:
        return state;
    }
  }
}

export default new PointStore();
