import React from 'react';

import css from './Poke.css'
import PokeIngredients from './PokeIngredients/PokeIngredients'

import {connect} from 'react-redux';

const Poke = props => {
  const newIng = Object.keys(props.selecteding);  
  let finalIngredients = null;
  
  finalIngredients = newIng.filter(a => props.selecteding[a] > 0)
  .map((a, i) => 
    <PokeIngredients 
      className={css.PokeIngredients}
      key={i.toString()} 
      type={a}
      value={props.selecteding[a]}
      label={props.ingredients.find(obj => obj.type === a).label}/>
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

const mapStateToProps = state => {
  return{
    ingredients: state.pokereducer.ingredients,
    selecteding: state.pokereducer.selecteding, 
    totalcalories: state.pokereducer.totalcalories
  }
}

export default React.memo(connect(mapStateToProps)(Poke), (prevProps, nextProps) => nextProps.selecteding === prevProps.selecteding);