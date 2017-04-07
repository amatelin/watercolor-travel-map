import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/Dispatcher';

const FormStateActions = {
  toNextStep() {
    Dispatcher.dispatch({
      type: ActionTypes.TO_NEXT_STEP
    });
  },
  toPreviousStep() {
    Dispatcher.dispatch({
      type: ActionTypes.TO_PREVIOUS_STEP
    });
  }
}

export default FormStateActions;
