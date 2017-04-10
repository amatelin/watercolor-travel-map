'use strict'

import React from 'react';

function Footer(props) {
  return (
    <footer className='footer'>
        <div className="container text-center">
          <div className='credit'>
            <p className="text-muted">
              Map tiles by <a href="http://stamen.com">Stamen Design</a>, under <a href="http://creativecommons.org/licenses/by/3.0">CC BY 3.0</a>. Data by <a href="http://openstreetmap.org">OpenStreetMap</a>, under <a href="http://creativecommons.org/licenses/by-sa/3.0">CC BY SA</a>.
            </p>
            <p className='text-muted'>
              Icons used as markers <a href="http://www.freepik.com">designed by Freepik</a>
            </p>
          </div>
        </div>
    </footer>
  )
}




export default Footer;
