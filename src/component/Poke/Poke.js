import React, {Component} from 'react';

import css from './Poke.css'
import PokeIngredients from './PokeIngredients/PokeIngredients'

import {connect} from 'react-redux';

class Poke extends Component {

  shouldComponentUpdate(nextProps){
    if(nextProps.selecteding !== this.props.selecteding) return true;

    return false;
  }

  render(){
    const newIng = Object.keys(this.props.selecteding);  
    let finalIngredients = null;
    
    finalIngredients = newIng.filter(a => this.props.selecteding[a] > 0)
      .map((a, i) => 
        <PokeIngredients 
          className={css.PokeIngredients}
          key={i.toString()} 
          type={a}
          value={this.props.selecteding[a]}
          label={this.props.ingredients.find(obj => obj.type === a).label}/>
      );
  
    if(finalIngredients.length <= 0){
        finalIngredients = <p>Your bowl is empty :(</p>
    }
  
    return(
      <div className={css.Poke}>
        {finalIngredients}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    ingredients: state.pokereducer.ingredients,
    selecteding: state.pokereducer.selecteding, 
    totalcalories: state.pokereducer.totalcalories
  }
}

export default connect(mapStateToProps)(Poke);