'use strict'

import Immutable from 'immutable';

const Waypoint = Immutable.Record({
  id: '',
  routeId: '',
  address: '',
});

export default Waypoint;
