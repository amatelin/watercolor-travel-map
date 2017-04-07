'use strict'

import FormView from '../../views/form/FormView';
import {Container} from 'flux/utils';
import FormStateActions from '../../data/actions/FormStateActions';
import FormStateStore from '../../data/stores/FormStateStore';

function getStores() {
  return [
    FormStateStore,
  ];
}

function getState() {
  return {
    formIndex: FormStateStore.getState(),

    onNextStep: FormStateActions.toNextStep,
    onPreviousStep: FormStateActions.toPreviousStep,
  }
}

export default Container.createFunctional(FormView, getStores, getState);
