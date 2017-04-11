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
  },
  toStep(stepIndex) {
    Dispatcher.dispatch({
      type: ActionTypes.TO_STEP,
      stepIndex: stepIndex
    })
  }
}

export default FormStateActions;
