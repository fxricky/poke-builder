import React from 'react';
import PropTypes from 'prop-types'

const PokeIngredients = props => {
  return <div>{props.value*100}g {props.label}</div>;
}

PokeIngredients.propTypes = {
  type: PropTypes.string.isRequired
}

export default PokeIngredients;