'use strict'

import React from 'react'
import {Row, Col, Button} from 'react-bootstrap/lib'
import RouteInputs from './inputs/RouteInputs'

function FirstStepView(props) {
  return (
    <div>
      <Col md={4}>I am the first view</Col>

      <Col md={12}>
        <RouteInputs {...props} />
      </Col>
    </div>
  )
}

export default FirstStepView;
