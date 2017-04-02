import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/Dispatcher';

const WaypointActions = {
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
      address: address,
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

export default WaypointActions;
