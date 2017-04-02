'use strict'

import React from 'react';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap/lib';
import FirstFormPanelView from './form/FirstFormPanelView';
import SecondFormPanelView from './form/SecondFormPanelView';
import ThirdFormPanelView from './form/ThirdFormPanelView';


function AppView(props) {
  console.log("Load!")
  return (
    <Row>
      <Col md={4}>
        <FormPanel {...props} />
        <NavButtonBlock {...props} />
      </Col>

      <Col md={8}>
        <h1>I am a map</h1>
      </Col>
    </Row>
  )
}

function FormPanel(props) {
  switch(props.formIndex) {
    case 0:
      return (<FirstFormPanelView {...props} />);
    case 1:
      return (<SecondFormPanelView {...props} />);
    case 2:
      return (<ThirdFormPanelView {...props} />);
    default:
      return (<div></div>)
  }
}

function NavButtonBlock(props) {
  return(
    <Col md={12} className='text-center'>
      {props.formIndex > 0 &&
        <Col md={6}>
          <Button className='btn-block' onClick={props.onPreviousStep}>Previous step</Button>
        </Col>
      }
      {
        props.formIndex < 2 &&
          <Col md={6}>
            <Button className='btn-block' onClick={props.onNextStep}><Glyphicon glyph="star" />Next step</Button>
          </Col>
      }
    </Col>
  )
}

export default AppView;
