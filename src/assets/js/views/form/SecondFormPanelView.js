'use strict'

import React from 'react';
import {Row, Col} from 'react-bootstrap/lib';
import GraphicInputsContainer from '../../containers/form/inputs/GraphicInputsContainer';

function SecondStepView() {
  return (
    <div>
      <Col md={12}>
        <h2>Second step: set up graphic parameters</h2>
      </Col>
      <Col md={12}>
        <GraphicInputsContainer />
      </Col>
    </div>
  )
}

export default SecondStepView;
