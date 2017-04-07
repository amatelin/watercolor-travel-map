'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import {ReduceStore} from 'flux/utils';

class MapStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return {
      magicOptionChecked: false,
      loaderOn: false
    };
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.TOGGLE_LOADER:
        var newState = state;
        return {
          magicOptionChecked: state.magicOptionChecked,
          loaderOn: !state.loaderOn
        };
      case ActionTypes.TOGGLE_MAGIC_OPTION:
      return {
        magicOptionChecked: !state.magicOptionChecked,
        loaderOn: state.loaderOn
      };
      default:
        return state;
    }
  }
}

export default new MapStore();
