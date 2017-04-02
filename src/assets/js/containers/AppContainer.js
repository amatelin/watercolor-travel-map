'use strict'

import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import AppStateActions from '../data/actions/AppStateActions';
import AppStateStore from '../data/stores/AppStateStore';

function getStores() {
  return [
    AppStateStore,
  ];
}

function getState() {
  return {
    formIndex: AppStateStore.getState(),

    onNextStep: AppStateActions.toNextStep,
    onPreviousStep: AppStateActions.toPreviousStep,
  }
}

export default Container.createFunctional(AppView, getStores, getState);
