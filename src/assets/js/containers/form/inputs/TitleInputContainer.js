'use strict'

import TitleInputs from '../../views/form/inputs/TitleInputs';
import {Container} from 'flux/utils';

import TitleActions from '../../data/actions/TitleActions';
import TitleStore from '../../data/stores/TitleStore';
import TitleDraftStore from '../../data/stores/TitleDraftStore';

function getStores() {
  return [
    TitleStore,
    TitleDraftStore
  ];
}

function getState() {
  return {
    title: TitleStore.getState(),
    titleDraft: TitleDraftStore.getState(),

    onAddTitle: TitleActions.addTitle,
    onDeleteTitle: TitleActions.deleteTitle,
    onSaveTitle: TitleActions.saveTitle,
    onStartEditTitle: TitleActions.startEditTitle,
    onEditTitle: TitleActions.editTitle,
    onOpenTitleDraft: TitleActions.openTitleDraft,
    onCloseTitleDraft: TitleActions.closeTitleDraft,
    onUpdateTitleDraft: TitleActions.updateTitleDraft,
  }
}

export default Container.createFunctional(TitleInputs, getStores, getState);
