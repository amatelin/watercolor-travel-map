'use strict'

import React from 'react';
import {Col, Button, Glyphicon} from 'react-bootstrap/lib';
import Map from '../../../utils/Map';

function GenerateMapButton(props) {
  const {points, routes, routesWithWaypoints, title, waypoints, geodesics, graphicOptions} = props;
  const onGenerateMap = () => {
    Map.generateMap({
      points: points,
      routes: routes,
      title: title,
      waypoints: waypoints,
      geodesics: geodesics,
      graphicOptions: graphicOptions,
      routesWithWaypoints: routesWithWaypoints
    });
    props.onNextStep();
  };

  return (
      <Col md={6} sm={6}>
        <Button className='btn-block' onClick={onGenerateMap}>Generate Map <Glyphicon glyph="cog" /></Button>
      </Col>
  )
}

export default GenerateMapButton;
