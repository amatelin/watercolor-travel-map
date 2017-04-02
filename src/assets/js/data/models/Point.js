'use strict'

import Immutable from 'immutable';

const Point = Immutable.Record({
  id: '',
  type: '',
  coordinates: {latitude: null, longitude: null},
  title: '',
});

export default Point;
