const Errors = {
  ERROR_GEOCODING_NO_RESULTS: {text: 'We are having trouble finding one of the addresses that you provided. Hint: please check the ',
                              getText: (text, variable) => {return text + variable + '.'}},
  ERROR_GEOCODING_SERVICE: {text: 'We are having difficulties contacting Google\'s remote services. Please try again in a few minutes.',
                              getText: (text, variable) => {return text}},
  ERROR_DIRECTION_NO_RESULTS: {text: 'We cannot find a route between two of the addresses that you provided. Hint: please check the ',
                              getText: (text, variable) => {return text + variable + '.'}},
  ERROR_DIRECTION_SERVICE: {text: 'We are having difficulties contacting Google\'s remote services. Please try again in a few minutes.',
                            getText: (text, variable) => {return text}}
}

export default Errors;
