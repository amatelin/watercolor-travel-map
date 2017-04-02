'use strict'

import GeodesicInputs from '../../../views/form/inputs/GeodesicInputs';
import {Container} from 'flux/utils';

import GeodesicActions from '../../../data/actions/GeodesicActions';
import GeodesicStore from '../../../data/stores/GeodesicStore';
import GeodesicEditStore from '../../../data/stores/GeodesicEditStore';
import GeodesicDraftStore from '../../../data/stores/GeodesicDraftStore';

function getStores() {
  return [
    GeodesicStore,
    GeodesicEditStore,
    GeodesicDraftStore
  ];
}

function getState() {
  return {
    geodesics: GeodesicStore.getState(),
    geodesicEdited: GeodesicEditStore.getState(),
    geodesicDraft: GeodesicDraftStore.getState(),

    onAddGeodesic: GeodesicActions.addGeodesic,
    onDeleteGeodesic: GeodesicActions.deleteGeodesic,
    onSaveGeodesic: GeodesicActions.saveGeodesic,
    onStartEditGeodesic: GeodesicActions.startEditGeodesic,
    onEditGeodesic: GeodesicActions.editGeodesic,
    onOpenGeodesicDraft: GeodesicActions.openGeodesicDraft,
    onCloseGeodesicDraft: GeodesicActions.closeGeodesicDraft,
    onUpdateGeodesicDraft: GeodesicActions.updateGeodesicDraft,
  }
}

export default Container.createFunctional(GeodesicInputs, getStores, getState);
