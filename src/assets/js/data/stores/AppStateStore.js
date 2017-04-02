'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import {ReduceStore} from 'flux/utils';

const MAX_INDEX = 2;

class AppStateStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return 0;
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.TO_NEXT_STEP:
        var newIndex = state + 1;
        if (!(newIndex <= MAX_INDEX)) return state;
        return newIndex;
      case ActionTypes.TO_PREVIOUS_STEP:
        var newIndex = state - 1;
        if (!(newIndex >= 0)) return state;
        return newIndex
      default:
        return state;
    }
  }
}

export default new AppStateStore();
