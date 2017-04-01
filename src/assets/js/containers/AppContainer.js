'use strict'

import AppView from '../views/AppView';
import {Container} from 'flux/utils';
import Actions from '../data/actions/Actions';
import AppStateStore from '../data/stores/AppStateStore';

function getStores() {
  return [
    AppStateStore,
  ];
}

function getState() {
  return {
    formIndex: AppStateStore.getState(),

    onNextStep: Actions.toNextStep,
    onPreviousStep: Actions.toPreviousStep,
  }
}

export default Container.createFunctional(AppView, getStores, getState);
