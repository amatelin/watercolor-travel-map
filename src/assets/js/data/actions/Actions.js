import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/Dispatcher';

const Actions = {
  toNextStep() {
    Dispatcher.dispatch({
      type: ActionTypes.TO_NEXT_STEP
    });
  },
  toPreviousStep() {
    Dispatcher.dispatch({
      type: ActionTypes.TO_PREVIOUS_STEP
    });
  },
  addRoute(type, data) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_ROUTE,
      routeType: type,
      data: data
    });
  },
  deleteRoute(id) {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_ROUTE,
      id: id
    });
  },
  startEditRoute(id) {
    Dispatcher.dispatch({
      type: ActionTypes.START_EDIT_ROUTE,
      id: id
    })
  },
  editRoute(id, data) {
    Dispatcher.dispatch({
      type: ActionTypes.EDIT_ROUTE,
      id: id,
      data: data,
    });
  },
  saveRoute(id) {
    Dispatcher.dispatch({
      type: ActionTypes.SAVE_ROUTE,
      id: id
    })
  },
  isRouteEditValid(id) {
    Dispatcher.dispatch({
      type: ActionTypes.IS_ROUTE_EDIT_VALID,
      id: id
    });
  },
  saveRouteEditChanges(id, data) {
    Dispatcher.dispatch({
      type: ActionTypes.SAVE_ROUTE_EDIT_CHANGES,
      id: id,
      data: data,
    });
  },
  openRouteDraft() {
    Dispatcher.dispatch({
      type: ActionTypes.OPEN_ROUTE_DRAFT,
    });
  },
  closeRouteDraft() {
    Dispatcher.dispatch({
      type: ActionTypes.CLOSE_ROUTE_DRAFT
    })
  },
  updateRouteDraft(data) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_ROUTE_DRAFT,
      data: data
    })
  }
}

export default Actions;
