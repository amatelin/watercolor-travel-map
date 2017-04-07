'use strict'

import React from 'react';
import {Row, Col, Button, Glyphicon} from 'react-bootstrap/lib';
import FormContainer from '../containers/form/FormContainer';
import Footer from './components/Footer';
import Header from './components/Header'
import Map from '../utils/Map';


function AppView(props) {
  Map.addListener();
  return (
    <div>
      <Header />
      <div id='wrap'>
        <Row id='main' className='row-eq-height'>
          <Col md={4} sm={12} className='form-panel-container'>
            <FormContainer {...props} />
          </Col>

          <Col id='map-wrapper' md={8} sm={12}>
            <div id='map-container' className='iframe-container'></div>
          </Col>
        </Row>
      </div>
      <Footer />
    </div>
  )
}




export default AppView;
