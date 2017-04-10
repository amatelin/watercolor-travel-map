
'use strict'

import Dispatcher from '../dispatcher/Dispatcher';
import ActionTypes from '../constants/ActionTypes';
import Graphic from '../models/Graphic';
import {ReduceStore} from 'flux/utils';
import Counter from '../../utils/Counter';
import Immutable from 'immutable';

const graphicDefaultOptions = [
  {inputType: 'cycling',
  inputFamily: 'route',
  options: {
    lineType: 'plainline',
    color: {
      hex: '#805500',
      alpha: 75
    }
  }},
  {inputType: 'bus',
  inputFamily: 'route',
  options: {
    lineType: 'plainline',
    color: {
      hex: '#BDA068',
      alpha: 75
    }
  }},
  {inputType: 'train',
  inputFamily: 'route',
  options: {
    lineType: 'plainline',
    color: {
      hex: '#302814',
      alpha: 75
    }
  }},
  {inputType: 'other',
  inputFamily: 'route',
  options: {
    lineType: 'dashline',
    color: {
      hex: '#BDB8AF',
      alpha: 75
    }
  }},
  {inputType: 'flight',
  inputFamily: 'geodesic',
  options: {
    lineType: 'dots',
    color: {
      hex: '#0042ad',
      alpha: 100
    }
  }},
  {inputType: 'ferry',
  inputFamily: 'geodesic',
  options: {
    lineType: 'plusline',
    color: {
      hex: '#6C9EF0',
      alpha: 100
    }
  }},
]

class GraphicStore extends ReduceStore {
  constructor() {
    super(Dispatcher);
  }

  addDefaultData(state, data) {
    // break the link between the copy and the original
    var dataCopy = JSON.parse(JSON.stringify(data))

    dataCopy.map(graphicOptions => {
      const id = Counter.increment();
      state = state.set(id, new Graphic({
        id,
        inputType: graphicOptions.inputType,
        inputFamily: graphicOptions.inputFamily,
        options: graphicOptions.options
      }))
    });

    return state;
  }

  getInitialState() {
    var state = Immutable.OrderedMap();
    state = this.addDefaultData(state, graphicDefaultOptions);
    return state;
  }

  reduce(state, action) {
    switch(action.type) {
      case ActionTypes.EDIT_GRAPHIC:
        var editedOptions = state.get(action.id).options;
        editedOptions[action.optionType] = action.data;
        return state.setIn([action.id, 'options'], editedOptions)
      case ActionTypes.RESET_GRAPHIC_OPTIONS:
        state = state.clear();
        state = this.addDefaultData(state, graphicDefaultOptions);
        return state;
      default:
        return state;
    }
  }
}

export default new GraphicStore();
