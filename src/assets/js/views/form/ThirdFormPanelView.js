'use strict'

import React from 'react';
import {Row, Col, Button, Panel, FormGroup, Checkbox} from 'react-bootstrap/lib';
import Loader from './components/Loader'

import Map from '../../utils/Map';

function ThirdFormPanelView(props) {
  // const {mapOptions} = props;
  // const downloadImage = () => Map.downloadImage(mapOptions);

  return (
    <div>
      <Panel className='form-panel'>
        <Col md={12}>
          <h2>Get your map</h2>
        </Col>
        <Col md={12}>
          <Col md={6}>
            <Button id='test' onClick={Map.downloadImage} className='btn-block btn-success'>Download file</Button>
              <FormGroup>
                <Checkbox>
                  It is illegal to check this option (my lawers told me so).
                </Checkbox>
              </FormGroup>
          </Col>
          <Col md={6}>
            <Loader/>
          </Col>
        </Col>
      </Panel>
    </div>
  )
}

export default ThirdFormPanelView;
