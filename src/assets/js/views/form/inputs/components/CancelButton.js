'use strict'

import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap/lib';

function CancelButton(props) {

  return (
    <div>
      <Button onClick={props.onClick}><Glyphicon glyph="remove-sign" /> Cancel</Button>
    </div>
  )
}

export default CancelButton;
