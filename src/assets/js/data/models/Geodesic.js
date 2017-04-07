'use strict'

import Immutable from 'immutable';

const Geodesic = Immutable.Record({
  id: '',
  type: '',
  departureAddress: '',
  arrivalAddress: ''
});

export default Geodesic;
