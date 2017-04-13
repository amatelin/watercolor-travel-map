'use strict'

import FormView from '../../views/form/FormView';
import {Container} from 'flux/utils';
import FormStateActions from '../../data/actions/FormStateActions';
import FormStateStore from '../../data/stores/FormStateStore';
import ErrorStore from '../../data/stores/ErrorStore';

function getStores() {
  return [
    FormStateStore,
    ErrorStore,
  ];
}

function getState() {
  return {
    formIndex: FormStateStore.getState(),
    errors: ErrorStore.getState(),

    onNextStep: FormStateActions.toNextStep,
    onPreviousStep: FormStateActions.toPreviousStep,
  }
}

export default Container.createFunctional(FormView, getStores, getState);
