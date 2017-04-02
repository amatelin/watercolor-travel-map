'use strict'

import TitleInput from '../../../views/form/inputs/TitleInput';
import {Container} from 'flux/utils';

import TitleActions from '../../../data/actions/TitleActions';
import TitleStore from '../../../data/stores/TitleStore';
import TitleDraftStore from '../../../data/stores/TitleDraftStore';
import TitleEditStore from '../../../data/stores/TitleEditStore';

function getStores() {
  return [
    TitleStore,
    TitleDraftStore,
    TitleEditStore
  ];
}

function getState() {
  return {
    title: TitleStore.getState(),
    titleDraft: TitleDraftStore.getState(),
    titleEdited: TitleEditStore.getState(),

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

export default Container.createFunctional(TitleInput, getStores, getState);
