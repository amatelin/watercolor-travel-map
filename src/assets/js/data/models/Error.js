'use strict'

import Immutable from 'immutable';

const Error = Immutable.Record({
  id: '',
  type: '',
  data: {},
});

export default Error;
