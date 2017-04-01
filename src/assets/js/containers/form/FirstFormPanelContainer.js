'use strict'

import FirstFormPanelView from '../../views/form/FirstFormPanelView';
import {Container} from 'flux/utils';
import Actions from '../../data/actions/Actions';
import RouteStore from '../../data/stores/RouteStore';
import RouteEditStore from '../../data/stores/RouteEditStore';
import RouteDraftStore from '../../data/stores/RouteDraftStore';

function getStores() {
  return [
    RouteStore,
    RouteEditStore,
    RouteDraftStore,
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
  }
}

export default Container.createFunctional(FirstFormPanelView, getStores, getState);
