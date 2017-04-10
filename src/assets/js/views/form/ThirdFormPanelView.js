'use strict'

import React from 'react';
import {Row, Col, Button, Panel, FormGroup, Checkbox} from 'react-bootstrap/lib';
import Loader from './components/Loader'
import Map from '../../utils/Map';

function ThirdFormPanelView(props) {
  const {mapOptions, onToggleLoader} = props;
  const downloadImage = () => Map.downloadImage(mapOptions, onToggleLoader);
  const onToggleMagicOption = (event) => props.onToggleMagicOption();

  return (
    <div>
      <Panel className='form-panel'>
        <Col md={12} sm={12}>
          <h2>Get your map</h2>
        </Col>
        <Col md={12} sm={12}>
          <Col md={6} sm={6}>
            <Button id='test' onClick={downloadImage} className='btn-block btn-success'>Download file</Button>
              <FormGroup>
                <Checkbox checked={mapOptions.magicOptionChecked} onChange={onToggleMagicOption}>
                  It is illegal to check this option (my lawers told me so).
                </Checkbox>
              </FormGroup>
          </Col>
          <Col md={6} sm={6}>
            {mapOptions.loaderOn &&
              <Loader/>
            }
          </Col>
        </Col>
      </Panel>
    </div>
  )
}

export default ThirdFormPanelView;
