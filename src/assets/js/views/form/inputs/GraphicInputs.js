'use strict'

import React from 'react';
import {Row, Col, ControlLabel} from 'react-bootstrap/lib';
import Select from 'react-select';
import Utils from '../../../utils/Utils';
import ColorPicker from 'rc-color-picker';

function LineTypeInputImage(props) {
  console.log(props)
  return (
    <div>
      <img width='60px' height='20px' src={'assets/images/' + props.value + '.png'}/>
      <nbsp/>
      {props.label}
    </div>)
}

function LineTypeInput(props) {
  var options = [
  { value: 'dashline', label: 'Dash line' },
  { value: 'longdash', label: 'Long dash' },
  { value: 'mixeddash', label: 'Mixed dash'},
  { value: 'plainline', label: 'Plain line'},
  { value: 'dots', label: 'Dots'},
  { value: 'cross', label: 'Crosses'}
];

  return (
    <div>
      <ControlLabel>Line type</ControlLabel>
      <Select
        name="form-field-name"
        optionRenderer={LineTypeInputImage}
        options={options}
        />
    </div>
  )
}

function LineColorInput(props) {
  return (
    <div>
      <ControlLabel>Line color</ControlLabel>
      <div>
        <ColorPicker
        animation="slide-up"
        color={'#36c'}
        />
      </div>
    </div>
  )
}

function GraphicInput(props) {
  const {inputType, inputFamily} = props;
  return (
    <div>
      <Col md={12}>
        <h3>{Utils.capitalizeFirstLetter(inputType)} {inputFamily}</h3>
      </Col>
      <Col md={6}>
        <LineTypeInput />
      </Col>
      <Col md={6}>
        <LineColorInput />
      </Col>
    </div>
  )
};

// function GraphicInputComponent()

function GraphicInputs(props) {
  return (
    <div>
      <Col md={12}>
        <GraphicInput inputType='cycling' inputFamily='route'/>
        <GraphicInput inputType='bus' inputFamily='route'/>
        <GraphicInput inputType='train' inputFamily='route'/>
        <GraphicInput inputType='other' inputFamily='route'/>
        <GraphicInput inputType='flight' inputFamily='geodesic'/>
        <GraphicInput inputType='ferry' inputFamily='geodesic'/>
      </Col>
    </div>
  )
};

export default GraphicInputs;
