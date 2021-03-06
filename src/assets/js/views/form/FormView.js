'use strict'

import React from 'react';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap/lib';
import FirstFormPanelView from './FirstFormPanelView';
import SecondFormPanelView from './SecondFormPanelView';
import ThirdFormPanelContainer from '../../containers/form/ThirdFormPanelContainer';
import GenerateMapButtonContainer from '../../containers/form/GenerateMapButtonContainer';

function FormView(props) {
  var panel;
  switch(props.formIndex) {
    case 0:
      panel = <FirstFormPanelView {...props} />;
      break;
    case 1:
      panel = (<SecondFormPanelView {...props} />);
      break;
    case 2:
      panel = (<ThirdFormPanelContainer />);
      break;
    default:
      panel = (<div></div>)
      break;
  }


  return (
    <div>
      {panel}
      <NavButtonBlock {...props} />
    </div>
  )
}

function NavButtonBlock(props) {
  var buttons = [null, null];
  switch(props.formIndex){
    case 0:
      buttons = [
        null,
        <NextStepButton className='pull-right view-block' {...props}/>
      ]
      break;
    case 1:
      buttons = [
        <PreviousStepButton {...props}/>,
        <GenerateMapButtonContainer {...props}/>
      ]

      break;
    case 2:
      buttons = [
        <PreviousStepButton {...props}/>,
        null
      ]
      break;
    default:
      break;
  }

  return(
    <Col md={12} className='text-center'>
      {buttons[0]}
      {buttons[1]}
    </Col>
  )
}

function NextStepButton(props) {
  return (
    <Col className={props.className} md={6} sm={6} xs={6} id='next-step-button'>
      <Button className='btn-block' onClick={props.onNextStep}>Next step <Glyphicon glyph="chevron-right" /></Button>
    </Col>
  )
}

function PreviousStepButton(props) {
  return (
    <Col md={6} sm={6} xs={6} className='view-block' id='previous-step-button'>
      <Button className='btn-block' onClick={props.onPreviousStep}><Glyphicon glyph="chevron-left" /> Previous step</Button>
    </Col>
  )
}

export default FormView;
