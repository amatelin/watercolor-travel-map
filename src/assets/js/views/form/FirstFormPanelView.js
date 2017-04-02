'use strict'

import React from 'react';
import {Row, Col, Button} from 'react-bootstrap/lib';
import RouteInputsContainer from '../../containers/form/inputs/RouteInputsContainer';
import GeodesicInputsContainer from '../../containers/form/inputs/GeodesicInputsContainer';
import PointInputsContainer from '../../containers/form/inputs/PointInputsContainer';
import TitleInputContainer from '../../containers/form/inputs/TitleInputContainer';

function FirstStepView(props) {
  return (
    <div>
      <Col md={12}>
        <h2>First step: set up routes</h2>
      </Col>
      <Col md={12}>
        <RouteInputsContainer {...props} />
        <GeodesicInputsContainer {...props} />
        <PointInputsContainer {...props} />
        <TitleInputContainer {...props} />
      </Col>
    </div>
  )
}

export default FirstStepView;
