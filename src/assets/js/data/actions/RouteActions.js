import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/Dispatcher';

const RouteActions = {
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
  deleteAllRoutes() {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_ALL_ROUTES,
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
  openRouteDraft(routeType) {
    Dispatcher.dispatch({
      type: ActionTypes.OPEN_ROUTE_DRAFT,
      routeType: routeType,
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
}

export default RouteActions;
