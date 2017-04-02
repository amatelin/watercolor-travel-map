'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import TitleStore from '../stores/TitleStore'
import {ReduceStore} from 'flux/utils'

class TitleEditStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return false;
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.START_EDIT_TITLE:
        return true
      case ActionTypes.SAVE_TITLE:
        Dispatcher.waitFor([TitleStore.getDispatchToken()]); // enable if validation used
        if (!action.validationError) return false;
        else return {
          validationError: action.validationError
        }
      default:
        return state;
    }
  }
}

export default new TitleEditStore();
