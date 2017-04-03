'use strict'

import PointInputs from '../../views/form/inputs/PointInputs';
import {Container} from 'flux/utils';

import PointActions from '../../data/actions/PointActions';
import PointStore from '../../data/stores/PointStore';
import PointEditStore from '../../data/stores/PointEditStore';
import PointDraftStore from '../../data/stores/PointDraftStore';

function getStores() {
  return [
    PointStore,
    PointEditStore,
    PointDraftStore
  ];
}

function getState() {
  return {
    points: PointStore.getState(),
    pointEdited: PointEditStore.getState(),
    pointDraft: PointDraftStore.getState(),

    onAddPoint: PointActions.addPoint,
    onDeletePoint: PointActions.deletePoint,
    onSavePoint: PointActions.savePoint,
    onStartEditPoint: PointActions.startEditPoint,
    onEditPoint: PointActions.editPoint,
    onOpenPointDraft: PointActions.openPointDraft,
    onClosePointDraft: PointActions.closePointDraft,
    onUpdatePointDraft: PointActions.updatePointDraft,
  }
}

export default Container.createFunctional(PointInputs, getStores, getState);
