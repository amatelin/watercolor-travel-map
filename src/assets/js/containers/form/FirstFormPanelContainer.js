'use strict'

import FirstFormPanelView from '../../views/form/FirstFormPanelView';
import {Container} from 'flux/utils';
import Actions from '../../data/actions/Actions';
import RouteStore from '../../data/stores/RouteStore';
import RouteEditStore from '../../data/stores/RouteEditStore';
import RouteDraftStore from '../../data/stores/RouteDraftStore';
import WaypointStore from '../../data/stores/WaypointStore';
import WaypointEditStore from '../../data/stores/WaypointEditStore';
import WaypointDraftStore from '../../data/stores/WaypointDraftStore';

function getStores() {
  return [
    RouteStore,
    RouteEditStore,
    RouteDraftStore,

    WaypointStore,
    WaypointEditStore,
    WaypointDraftStore,
  ];
}

function getState() {
  return {
    routes: RouteStore.getState(),
    routeEdited: RouteEditStore.getState(),
    routeDraft: RouteDraftStore.getState(),

    onAddRoute: Actions.addRoute,
    onDeleteRoute: Actions.deleteRoute,
    onSaveRoute: Actions.saveRoute,
    onStartEditRoute: Actions.startEditRoute,
    onEditRoute: Actions.editRoute,
    onOpenRouteDraft: Actions.openRouteDraft,
    onCloseRouteDraft: Actions.closeRouteDraft,
    onUpdateRouteDraft: Actions.updateRouteDraft,

    waypoints: WaypointStore.getState(),
    waypointEdited: WaypointEditStore.getState(),
    waypointDraft: WaypointDraftStore.getState(),

    onAddWaypoint: Actions.addWaypoint,
    onDeleteWaypoint: Actions.deleteWaypoint,
    onSaveWaypoint: Actions.saveWaypoint,
    onStartEditWaypoint: Actions.startEditWaypoint,
    onEditWaypoint: Actions.editWaypoint,
    onOpenWaypointDraft: Actions.openWaypointDraft,
    onCloseWaypointDraft: Actions.closeWaypointDraft,
    onUpdateWaypointDraft: Actions.updateWaypointDraft
  }
}

export default Container.createFunctional(FirstFormPanelView, getStores, getState);
