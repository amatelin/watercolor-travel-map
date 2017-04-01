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
  },
  addWaypoint(routeId, address) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_WAYPOINT,
      routeId: routeId,
      address: address
    });
  },
  deleteWaypoint(id) {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_WAYPOINT,
      id: id
    });
  },
  startEditWaypoint(id) {
    Dispatcher.dispatch({
      type: ActionTypes.START_EDIT_WAYPOINT,
      id: id
    })
  },
  editWaypoint(id, address) {
    Dispatcher.dispatch({
      type: ActionTypes.EDIT_WAYPOINT,
      id: id,
      data: address,
    });
  },
  saveWaypoint(id) {
    Dispatcher.dispatch({
      type: ActionTypes.SAVE_WAYPOINT,
      id: id
    })
  },
  openWaypointDraft(routeId) {
    Dispatcher.dispatch({
      type: ActionTypes.OPEN_WAYPOINT_DRAFT,
      routeId: routeId
    });
  },
  closeWaypointDraft() {
    Dispatcher.dispatch({
      type: ActionTypes.CLOSE_WAYPOINT_DRAFT
    })
  },
  updateWaypointDraft(address) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_WAYPOINT_DRAFT,
      address: address
    })
  },
}

export default Actions;
