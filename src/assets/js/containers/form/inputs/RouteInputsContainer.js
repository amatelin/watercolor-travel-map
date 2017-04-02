'use strict'

import RouteInputs from '../../../views/form/inputs/RouteInputs';
import {Container} from 'flux/utils';

import RouteActions from '../../../data/actions/RouteActions';
import RouteStore from '../../../data/stores/RouteStore';
import RouteEditStore from '../../../data/stores/RouteEditStore';
import RouteDraftStore from '../../../data/stores/RouteDraftStore';

import WaypointActions from '../../../data/actions/WaypointActions';
import WaypointStore from '../../../data/stores/WaypointStore';
import WaypointEditStore from '../../../data/stores/WaypointEditStore';
import WaypointDraftStore from '../../../data/stores/WaypointDraftStore';


function getStores() {
  return [
    RouteStore,
    RouteEditStore,
    RouteDraftStore,

    WaypointStore,
    WaypointEditStore,
    WaypointDraftStore
  ];
}

function getState() {
  return {
    routes: RouteStore.getState(),
    routeEdited: RouteEditStore.getState(),
    routeDraft: RouteDraftStore.getState(),

    onAddRoute: RouteActions.addRoute,
    onDeleteRoute: RouteActions.deleteRoute,
    onSaveRoute: RouteActions.saveRoute,
    onStartEditRoute: RouteActions.startEditRoute,
    onEditRoute: RouteActions.editRoute,
    onOpenRouteDraft: RouteActions.openRouteDraft,
    onCloseRouteDraft: RouteActions.closeRouteDraft,
    onUpdateRouteDraft: RouteActions.updateRouteDraft,

    waypoints: WaypointStore.getState(),
    waypointEdited: WaypointEditStore.getState(),
    waypointDraft: WaypointDraftStore.getState(),

    onAddWaypoint: WaypointActions.addWaypoint,
    onDeleteWaypoint: WaypointActions.deleteWaypoint,
    onSaveWaypoint: WaypointActions.saveWaypoint,
    onStartEditWaypoint: WaypointActions.startEditWaypoint,
    onEditWaypoint: WaypointActions.editWaypoint,
    onOpenWaypointDraft: WaypointActions.openWaypointDraft,
    onCloseWaypointDraft: WaypointActions.closeWaypointDraft,
    onUpdateWaypointDraft: WaypointActions.updateWaypointDraft,
  }
}

export default Container.createFunctional(RouteInputs, getStores, getState);
