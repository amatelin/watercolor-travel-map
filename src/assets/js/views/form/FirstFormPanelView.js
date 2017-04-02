'use strict'

import React from 'react';
import {Row, Col, Button} from 'react-bootstrap/lib';
import RouteInputsContainer from '../../containers/form/inputs/RouteInputsContainer';
import GeodesicInputsContainer from '../../containers/form/inputs/GeodesicInputsContainer';
import PointInputsContainer from '../../containers/form/inputs/PointInputsContainer';
function FirstStepView(props) {
  return (
    <div>
      <Col md={4}>I am the first view</Col>

      <Col md={12}>
        <RouteInputsContainer {...props} />
        <GeodesicInputsContainer {...props} />
        <PointInputsContainer {...props} />
      </Col>
    </div>
  )
}

export default FirstStepView;
