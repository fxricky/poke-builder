import React, {Component} from 'react';
import PropTypes from 'prop-types'

class PokeIngredients extends Component {
  render() {  
    return <div>{this.props.value*100}g {this.props.label}</div>;
  }
}

PokeIngredients.propTypes = {
  type: PropTypes.string.isRequired
}

export default PokeIngredients;