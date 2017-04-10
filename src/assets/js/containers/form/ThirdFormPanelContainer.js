'use strict'

import ThirdFormPanelView from '../../views/form/ThirdFormPanelView';
import {Container} from 'flux/utils';
import MapStore from '../../data/stores/MapStore';

import MapActions from '../../data/actions/MapActions';

function getStores() {
  return [
    MapStore,
  ];
}

function getState() {
  return {
    mapOptions: MapStore.getState(),

    onToggleMagicOption: MapActions.toggleMagicOption,
    onToggleLoader: MapActions.toggleLoader,

  }
}

export default Container.createFunctional(ThirdFormPanelView, getStores, getState);
