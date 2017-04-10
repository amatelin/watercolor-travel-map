'use strict'

import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap/lib';

function RemoveButton(props) {

  return (
    <div>
      <Button className={props.class} onClick={props.onClick}><Glyphicon glyph="minus-sign" /> Remove</Button>
    </div>
  )
}

export default RemoveButton;
