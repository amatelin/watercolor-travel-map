'use strict'

import React from 'react';
import {Row, Col, Panel, Popover, OverlayTrigger, Glyphicon} from 'react-bootstrap/lib';
import GraphicInputsContainer from '../../containers/form/inputs/GraphicInputsContainer';

function SecondFormPanelView() {
  var popover = (
    <Popover
    id="graphic-inputs-help-popover"
    placement="right"
    positionLeft={200}
    positionTop={50}
    title="Help: setting up graphic parameters"
  >
    <p>Here you can choose the line type and color that will be used to represent each type of route or geodesic.</p>
    <p>Click on the default button to restore the default parameters</p>
  </Popover> )


  return (
    <div>
      <Panel className='form-panel'>
        <Col md={12} className='vertical-align-middle'>
            <h2 className='pull-left'>Second step: set-up graphic parameters {'\u00a0'}</h2>
            <OverlayTrigger placement="right" overlay={popover}>
              <Glyphicon glyph='question-sign'/>
            </OverlayTrigger>
        </Col>
        <Col md={12}>
          <GraphicInputsContainer />
        </Col>
      </Panel>
    </div>
  )
}

export default SecondFormPanelView;
