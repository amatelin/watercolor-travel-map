'use strict'

import React from 'react';
import {Row, Col, Panel} from 'react-bootstrap/lib';
import GraphicInputsContainer from '../../containers/form/inputs/GraphicInputsContainer';

function SecondFormPanelView() {
  return (
    <div>
      <Panel className='form-panel'>
        <Col md={12}>
          <h2>Second step: set up graphic parameters</h2>
        </Col>
        <Col md={12}>
          <GraphicInputsContainer />
        </Col>
      </Panel>
    </div>
  )
}

export default SecondFormPanelView;
