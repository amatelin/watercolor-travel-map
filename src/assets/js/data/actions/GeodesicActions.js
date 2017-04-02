import ActionTypes from '../constants/ActionTypes';
import Dispatcher from '../dispatcher/Dispatcher';

const GeodesicActions = {
  addGeodesic(type, data) {
    Dispatcher.dispatch({
      type: ActionTypes.ADD_GEODESIC,
      geodesicType: type,
      data: data
    });
  },
  deleteGeodesic(id) {
    Dispatcher.dispatch({
      type: ActionTypes.DELETE_GEODESIC,
      id: id
    });
  },
  startEditGeodesic(id) {
    Dispatcher.dispatch({
      type: ActionTypes.START_EDIT_GEODESIC,
      id: id
    })
  },
  editGeodesic(id, data) {
    Dispatcher.dispatch({
      type: ActionTypes.EDIT_GEODESIC,
      id: id,
      data: data,
    });
  },
  saveGeodesic(id) {
    Dispatcher.dispatch({
      type: ActionTypes.SAVE_GEODESIC,
      id: id
    })
  },
  openGeodesicDraft(geodesicType) {
    Dispatcher.dispatch({
      type: ActionTypes.OPEN_GEODESIC_DRAFT,
      geodesicType: geodesicType,
    });
  },
  closeGeodesicDraft() {
    Dispatcher.dispatch({
      type: ActionTypes.CLOSE_GEODESIC_DRAFT
    })
  },
  updateGeodesicDraft(data) {
    Dispatcher.dispatch({
      type: ActionTypes.UPDATE_GEODESIC_DRAFT,
      data: data
    })
  },
}

export default GeodesicActions;
