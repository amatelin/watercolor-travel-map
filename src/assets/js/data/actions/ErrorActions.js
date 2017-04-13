import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/Dispatcher';

const ErrorActions = {
  throwError(type, data) {
    Dispatcher.dispatch({
      type: ActionTypes.THROW_ERROR,
      errorType: type,
      data: data
    });
  },
}

export default ErrorActions;
