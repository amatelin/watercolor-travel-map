
'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import Graphic from '../models/Graphic';
import {ReduceStore} from 'flux/utils'
import Counter from '../../utils/Counter'
import Immutable from 'immutable'

class GraphicStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  getInitialState() {
    return Immutable.OrderedMap();
  }

  validateData(data) {
    if (data.latitude && data.longitude) return null;
    if (data.latitude && !data.longitude) return [null, 'error'];
    if (!data.latitude && data.longitude) return ['error', null];
    else return ['error', 'error'];
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.ADD_GRAPHIC:
        const id = Counter.increment();
        action.id = id;
        var validationErrors = this.validateData(action.data);
        if (!validationErrors) {
          return state.set(id, new Graphic({
          id,
          type: action.pointType,
          coordinates: {latitude: action.data.latitude,
                        longitude: action.data.longitude},
          title: action.data.title
        })); }
        else {
          action.validationErrors = validationErrors;
          return state;
        }
      case ActionTypes.EDIT_GRAPHIC:
        return state
                .setIn([action.id, 'coordinates'], {latitude: action.data.latitude,
                                                    longitude: action.data.longitude,
                                                    title: action.data.title})
                .setIn([action.id, 'title'], action.data.title)
      case ActionTypes.SAVE_GRAPHIC:
        var validationErrors = this.validateData({latitude: state.get(action.id).coordinates.latitude,
                                                  longitude: state.get(action.id).coordinates.longitude});
        if (!validationErrors) return state;
        else {
          action.validationErrors = validationErrors;
          return state;
        }
      case ActionTypes.DELETE_GRAPHIC:
        return state.delete(action.id);
      default:
        return state;
    }
  }
}

export default new GraphicStore();
