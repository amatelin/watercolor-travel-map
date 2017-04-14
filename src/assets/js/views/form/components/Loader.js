'use strict'

import React from 'react';
import {Col} from 'react-bootstrap/lib';

function Loader(props) {

  return (
    <div id='loader-container'>
      <Col md={12}>
        <h4 className='text-center'>Download will begin shortly...</h4>
      </Col>
      <Col md={12}>
        <div className="showbox">
          <div classNam="loader">
            <svg className="circular" viewBox="25 25 50 50">
              <circle className="path" cx="50" cy="50" r="20" fill="none" stroke-width="2" stroke-miterlimit="10"/>
            </svg>
          </div>
        </div>
      </Col>
    </div>
  )
}

export default Loader;
