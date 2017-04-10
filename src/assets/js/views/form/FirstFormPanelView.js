'use strict'

import React from 'react';
import {Row, Col, Button, Panel} from 'react-bootstrap/lib';
import RouteInputsContainer from '../../containers/form/inputs/RouteInputsContainer';
import GeodesicInputsContainer from '../../containers/form/inputs/GeodesicInputsContainer';
import PointInputsContainer from '../../containers/form/inputs/PointInputsContainer';
import TitleInputContainer from '../../containers/form/inputs/TitleInputContainer';

function FirstFormPanelView(props) {
  return (
    <div>
      <Panel className='form-panel'>
        <h2>First step: add components to the map</h2>
        <RouteInputsContainer {...props} />
        <GeodesicInputsContainer {...props} />
        <PointInputsContainer {...props} />
        <TitleInputContainer {...props} />
      </Panel>
    </div>
  )
}

export default FirstFormPanelView;
