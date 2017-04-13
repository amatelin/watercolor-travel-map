'use strict'

import ThirdFormPanelView from '../../views/form/ThirdFormPanelView';
import {Container} from 'flux/utils';
import MapStore from '../../data/stores/MapStore';
import ErrorStore from '../../data/stores/ErrorStore';

import MapActions from '../../data/actions/MapActions';

function getStores() {
  return [
    MapStore,
    ErrorStore,
  ];
}

function getState() {
  return {
    mapOptions: MapStore.getState(),
    errors: ErrorStore.getState(),

    onToggleMagicOption: MapActions.toggleMagicOption,
    onToggleLoader: MapActions.toggleLoader,

  }
}

export default Container.createFunctional(ThirdFormPanelView, getStores, getState);
