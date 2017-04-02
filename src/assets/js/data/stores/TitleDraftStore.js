'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import TitleStore from '../stores/TitleStore';
import {ReduceStore} from 'flux/utils'

class RouteDraftStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return false;
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.OPEN_TITLE_DRAFT:
        return {
          text: '',
          validationError: null
        };
      case ActionTypes.CLOSE_TITLE_DRAFT:
        return false;
      case ActionTypes.UPDATE_TITLE_DRAFT:
        return {
          text: action.text,
          validationError: null
        }
      case ActionTypes.ADD_TITLE:
        Dispatcher.waitFor([TitleStore.getDispatchToken()]);
        if (!action.validationError) return false;
        else return {
          text: state.text,
          validationError: action.validationError
        }
        return false;
      default:
        return state;
    }
  }
}

export default new RouteDraftStore();
