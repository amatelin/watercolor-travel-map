'use strict'

import React from 'react';
import {Button, Glyphicon} from 'react-bootstrap/lib';

function EditButton(props) {

  return (
    <div>
      <Button className={props.class} onClick={props.onClick}><Glyphicon glyph="pencil" /> Edit</Button>
    </div>
  )
}

export default EditButton;
