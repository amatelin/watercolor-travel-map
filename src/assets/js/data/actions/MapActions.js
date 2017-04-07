import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/Dispatcher';

const MapActions = {
  toggleLoader() {
    Dispatcher.dispatch({
      type: ActionTypes.TOGGLE_LOADER,
    });
  },
  toggleMagicOption() {
    Dispatcher.dispatch({
      type: ActionTypes.TOGGLE_MAGIC_OPTION,
    });
  }
}

export default MapActions;
