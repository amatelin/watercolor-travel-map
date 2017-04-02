'use strict'

import Immutable from 'immutable';

const Geodesic = Immutable.Record({
  id: '',
  type: '',
  coordinates: {latitude: null, longitude: null},
});

export default Geodesic;
