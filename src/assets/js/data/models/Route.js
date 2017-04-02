'use strict'

import Immutable from 'immutable';

const Route = Immutable.Record({
  id: '',
  type: '',
  departureAddress: '',
  arrivalAddress: '',
});

export default Route;
