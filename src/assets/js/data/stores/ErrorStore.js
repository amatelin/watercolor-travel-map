'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import {ReduceStore} from 'flux/utils';
import Immutable from 'immutable';
import Error from '../models/Error';
import Counter from '../../utils/Counter';

class ErrorStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.THROW_ERROR:
        var errorType = action.errorType;
        var data = action.data;
        const id = Counter.increment();
        return state.set(id, new Error({
          id,
          type: errorType,
          data: data
        }));
      case ActionTypes.GENERATE_MAP:
        return state.clear();
      default:
        return state;
    }
  }
}

export default new ErrorStore();
