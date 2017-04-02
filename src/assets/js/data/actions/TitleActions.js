import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/Dispatcher';

const TitleActions = {
  addTitle(text) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_TITLE,
      text: text
    });
  },
  deleteTitle() {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_TITLE,
    });
  },
  startEditTitle() {
    Dispatcher.dispatch({
      type: ActionTypes.START_EDIT_TITLE,
    })
  },
  editTitle(text) {
    Dispatcher.dispatch({
      type: ActionTypes.EDIT_TITLE,
      text: text,
    });
  },
  saveTitle() {
    Dispatcher.dispatch({
      type: ActionTypes.SAVE_TITLE,
    })
  },
  openTitleDraft() {
    Dispatcher.dispatch({
      type: ActionTypes.OPEN_TITLE_DRAFT,
    });
  },
  closeTitleDraft() {
    Dispatcher.dispatch({
      type: ActionTypes.CLOSE_TITLE_DRAFT
    })
  },
  updateTitleDraft(text) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_TITLE_DRAFT,
      text: text
    })
  },
}

export default TitleActions;
