import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/Dispatcher';

const MapActions = {
  toggleLoader() {
    Dispatcher.dispatch({
      type: ActionTypes.TOGGLE_LOADER,
    });
  },
  toggleMagicOption() {
    console.log('dispatched')
    Dispatcher.dispatch({
      type: ActionTypes.TOGGLE_MAGIC_OPTION,
    });
  }
}

export default MapActions;
