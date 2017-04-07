'use strict'

import ThirdFormPanelView from '../../views/form/ThirdFormPanelView';
import {Container} from 'flux/utils';
import GeodesicStore from '../../data/stores/GeodesicStore';
import PointStore from '../../data/stores/PointStore';
import RouteStore from '../../data/stores/RouteStore';
import TitleStore from '../../data/stores/TitleStore';
import WaypointStore from '../../data/stores/WaypointStore';
import GraphicStore from '../../data/stores/GeodesicStore';


function getStores() {
  return [
    GeodesicStore,
    PointStore,
    RouteStore,
    TitleStore,
    WaypointStore,
    GraphicStore
  ];
}

function getState() {
  return {
    geodesics: GeodesicStore.getState(),
    points: PointStore.getState(),
    routes: RouteStore.getState(),
    title: TitleStore.getState(),
    waypoints: WaypointStore.getState(),
    graphicOptions: GraphicStore.getState(),
  }
}

export default Container.createFunctional(ThirdFormPanelView, getStores, getState);
