'use strict'

import React from 'react';
import {Row, Col, Button, Panel, FormGroup, Checkbox, Popover, OverlayTrigger, Glyphicon} from 'react-bootstrap/lib';
import Loader from './components/Loader'
import Map from '../../utils/Map';

function ThirdFormPanelView(props) {
  const {mapOptions, onToggleLoader} = props;
  const downloadImage = () => Map.downloadImage(mapOptions, onToggleLoader);
  const onToggleMagicOption = (event) => props.onToggleMagicOption();

  var popover = (
    <Popover
    id="download-help-popover"
    placement="right"
    positionLeft={200}
    positionTop={50}
    title="Help: download the map image"
  >
    <p>Set the map position and zoom level according to what you would like to capture on the final image.</p>
    <p>When you are ready, click the download button. Your map will be ready to download a few seconds after that (please be patient).</p>
    <p>You can always go back to the last steps and make changes to your routes or graphic parameters.</p>
  </Popover> )


  return (
    <div>
      <Panel className='form-panel'>
        <Col md={12} className='vertical-align-middle'>
            <h2 className='pull-left'>Get your map {'\u00a0'}</h2>
            <OverlayTrigger placement="right" overlay={popover}>
              <Glyphicon glyph='question-sign'/>
            </OverlayTrigger>
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