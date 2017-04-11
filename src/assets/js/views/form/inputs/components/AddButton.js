'use strict'

import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap/lib';

function AddButton(props) {
  var state = (props.disabled ? true : false);

  return (
    <div>
      <Button className={props.class} disabled={state} onClick={props.onClick}><Glyphicon glyph="plus" /> {props.text}</Button>
    </div>
  )
}

export default AddButton;
