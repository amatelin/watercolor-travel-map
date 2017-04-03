import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/Dispatcher';

const GraphicActions = {
  editGraphic(id, optionType, data) {
    Dispatcher.dispatch({
      type: ActionTypes.EDIT_GRAPHIC,
      id: id,
      optionType: optionType,
      data: data,
    });
  },
  resetGraphicOptions() {
    Dispatcher.dispatch({
      type: ActionTypes.RESET_GRAPHIC_OPTIONS,
    });
  }
}

export default GraphicActions;
