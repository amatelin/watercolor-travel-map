'use strict'

import Immutable from 'immutable';

const Graphic = Immutable.Record({
  id: '',
  inputType: '',
  inputFamily: '',
  options: {lineType: '',
            color: {
              hex: '',
              alpha: ''
            }},
});

export default Graphic;
