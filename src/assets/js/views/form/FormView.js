'use strict'

import React from 'react';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap/lib';
import FirstFormPanelView from './FirstFormPanelView';
import SecondFormPanelView from './SecondFormPanelView';
import ThirdFormPanelContainer from '../../containers/form/ThirdFormPanelContainer';

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
        <NextStepButton className='pull-right' {...props}/>
      ]
      break;
    case 1:
      buttons = [
        <PreviousStepButton {...props}/>,
        <GenerateMapButton {...props}/>
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
    <Col className={props.className} md={6} sm={6}>
      <Button className='btn-block' onClick={props.onNextStep}>Next step <Glyphicon glyph="chevron-right" /></Button>
    </Col>
  )
}

function PreviousStepButton(props) {
  return (
    <Col md={6} sm={6}>
      <Button className='btn-block' onClick={props.onPreviousStep}><Glyphicon glyph="chevron-left" /> Previous step</Button>
    </Col>
  )
}

function GenerateMapButton(props) {
  return (
    <Col md={6} sm={6}>
      <Button className='btn-block' onClick={props.onNextStep}>Generate Map <Glyphicon glyph="cog" /></Button>
    </Col>
  )
}

export default FormView;
