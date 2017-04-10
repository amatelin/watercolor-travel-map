'use strict'

import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap/lib';

function SaveButton(props) {

  return (
    <div>
      <Button className={props.class} onClick={props.onClick}><Glyphicon glyph="ok-sign" /> Save</Button>
    </div>
  )
}

export default SaveButton;
