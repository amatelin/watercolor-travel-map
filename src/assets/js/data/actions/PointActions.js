import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/Dispatcher';

const PointActions = {
  addPoint(type, data) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_POINT,
      pointType: type,
      data: data
    });
  },
  deletePoint(id) {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_POINT,
      id: id
    });
  },
  deleteAllPoints() {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_ALL_POINTS
    });
  },
  startEditPoint(id) {
    Dispatcher.dispatch({
      type: ActionTypes.START_EDIT_POINT,
      id: id
    })
  },
  editPoint(id, data) {
    Dispatcher.dispatch({
      type: ActionTypes.EDIT_POINT,
      id: id,
      data: data,
    });
  },
  savePoint(id) {
    Dispatcher.dispatch({
      type: ActionTypes.SAVE_POINT,
      id: id
    })
  },
  openPointDraft(pointType) {
    Dispatcher.dispatch({
      type: ActionTypes.OPEN_POINT_DRAFT,
      pointType: pointType,
    });
  },
  closePointDraft() {
    Dispatcher.dispatch({
      type: ActionTypes.CLOSE_POINT_DRAFT
    })
  },
  updatePointDraft(data) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_POINT_DRAFT,
      data: data
    })
  },
}

export default PointActions;
