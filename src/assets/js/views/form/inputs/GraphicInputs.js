'use strict'

import React from 'react';
import {Row, Col, ControlLabel, Button, Glyphicon} from 'react-bootstrap/lib';
import Select from 'react-select';
import Utils from '../../../utils/Utils';
import ColorPicker from 'rc-color-picker';

function LineTypeInputImage(props) {
  return (
    <div>
      <img width='60px' height='20px' src={'assets/images/' + props.value + '.png'}/>
      <nbsp/>
      {props.label}
    </div>)
}

function LineTypeInput(props) {
  const options = [
  { value: 'dashline', label: 'Dash line' },
  { value: 'longdash', label: 'Long dash' },
  { value: 'mixeddash', label: 'Mixed dash'},
  { value: 'plainline', label: 'Plain line'},
  { value: 'dots', label: 'Dots'},
  { value: 'plusline', label: 'Plus signs'}
];

  const onEditGraphicInput = (value) => props.onEditGraphicInput(props.optionsId, 'lineType', value);

  return (
    <div>
      <ControlLabel>Line type</ControlLabel>
      <Select
        name="form-field-name"
        value={props.lineType}
        onChange={onEditGraphicInput}
        optionRenderer={LineTypeInputImage}
        valueRenderer={LineTypeInputImage}
        options={options}
        />
    </div>
  )
}

function LineColorInput(props) {
  const onEditGraphicInput = (colors) => props.onEditGraphicInput(props.optionsId, 'color', {hex: colors.color, alpha:colors.alpha});
  return (
    <div>
      <ControlLabel>Line color</ControlLabel>
      <div>
        <ColorPicker
        animation="slide-up"
        color={props.color}
        alpha={props.alpha}
        onChange = {onEditGraphicInput}
        />
      </div>
    </div>
  )
}

function GraphicInput(props) {
  const {inputType, inputFamily, options, id} = props;
  return (
    <div>
      <Col md={12}>
        <h3>{Utils.capitalizeFirstLetter(inputType)} {inputFamily}</h3>
      </Col>
      <Col md={6}>
        <LineTypeInput optionsId={id}
                        lineType={options.lineType}
                        onEditGraphicInput={props.onEditGraphicInput}/>
      </Col>
      <Col md={6}>
        <LineColorInput optionsId={id}
                        color={options.color.hex}
                        alpha={options.color.alpha}
                        onEditGraphicInput={props.onEditGraphicInput}/>
      </Col>
    </div>
  )
};


function GraphicInputs(props) {
  const {graphicOptions} = props;
  const onResetGraphicOptions = () => props.onResetGraphicOptions();

  return (
    <div>
      <Col md={4}>
        <Button bsStyle='warning' onClick={onResetGraphicOptions}><Glyphicon glyph='refresh'/> Default</Button>
      </Col>
      {graphicOptions.map(options => (
          <div>
            <GraphicInput inputType={options.inputType}
              inputFamily={options.inputFamily}
              options={options.options}
              id={options.id}
              onEditGraphicInput={props.onEditGraphicInput}
              />
          </div>
        ))
      }
    </div>
  )

};

export default GraphicInputs;
