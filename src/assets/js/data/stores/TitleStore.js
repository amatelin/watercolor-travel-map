'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import {ReduceStore} from 'flux/utils';

class TitleStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return '';
  }

  validateData(data) {
    if (data.length>0) return null;
    else return 'error';
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.ADD_TITLE:
        var validationError = this.validateData(action.text);
        if (!validationError) {
          return action.text;
        }
        else {
          action.validationError = validationError;
          return state;
        }
      case ActionTypes.EDIT_TITLE:
        return action.text;
      case ActionTypes.SAVE_TITLE:
        var validationError = this.validateData(state);

        if (!validationError) return state;
        else {
          action.validationError = validationError;
          return state
        }
      case ActionTypes.DELETE_TITLE:
        return '';
      default:
        return state;
    }
  }
}

export default new TitleStore();
