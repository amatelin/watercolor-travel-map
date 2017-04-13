'use strict'

import GenerateMapButton from '../../views/form/components/GenerateMapButton';
import {Container} from 'flux/utils';
import GeodesicStore from '../../data/stores/GeodesicStore';
import PointStore from '../../data/stores/PointStore';
import RouteStore from '../../data/stores/RouteStore';
import TitleStore from '../../data/stores/TitleStore';
import WaypointStore from '../../data/stores/WaypointStore';
import GraphicStore from '../../data/stores/GraphicStore';
import FormStateActions from '../../data/actions/FormStateActions';
import MapActions from '../../data/actions/MapActions';

function getStores() {
  return [
    GeodesicStore,
    PointStore,
    RouteStore,
    TitleStore,
    WaypointStore,
    GraphicStore,
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

    routesWithWaypoints: RouteStore.withWaypoints,
    onNextStep: FormStateActions.toNextStep,
    onGenerateMap: MapActions.generateMap
  }
}

export default Container.createFunctional(GenerateMapButton, getStores, getState);
