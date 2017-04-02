'use strict'

import GraphicInputs from '../../../views/form/inputs/GraphicInputs';
import {Container} from 'flux/utils';

// import GraphicActions from '../../../data/actions/GraphicActions';
import GraphicStore from '../../../data/stores/GraphicStore';
// import GraphicDraftStore from '../../../data/stores/GraphicDraftStore';
// import GraphicEditStore from '../../../data/stores/GraphicEditStore';

function getStores() {
  return [
    GraphicStore,
    // GraphicDraftStore,
    // GraphicEditStore
  ];
}

function getState() {
  return {
    // title: GraphicStore.getState(),
    // titleDraft: GraphicDraftStore.getState(),
    // titleEdited: GraphicEditStore.getState(),
    //
    // onAddGraphic: GraphicActions.addGraphic,
    // onDeleteGraphic: GraphicActions.deleteGraphic,
    // onSaveGraphic: GraphicActions.saveGraphic,
    // onStartEditGraphic: GraphicActions.startEditGraphic,
    // onEditGraphic: GraphicActions.editGraphic,
    // onOpenGraphicDraft: GraphicActions.openGraphicDraft,
    // onCloseGraphicDraft: GraphicActions.closeGraphicDraft,
    // onUpdateGraphicDraft: GraphicActions.updateGraphicDraft,
  }
}

export default Container.createFunctional(GraphicInputs, getStores, getState);
