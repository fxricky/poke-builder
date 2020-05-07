import React from 'react'
import css from './PokeControls.css'

const pokeControl = (a,i,props) => (
  <div key={a+i} className={css.PokeControl}>
    <button 
      className={css.Minus} 
      onClick={() => props.minusIngredient(a.type)}>
        <i className="fa fa-minus"></i>
    </button>
    <div className={css.ControlLabel}>{a.label}</div>
    <button 
      className={css.Plus} 
      onClick={() => props.addIngredient(a.type)}>
        <i className="fa fa-plus"></i>
    </button>
  </div>
)

const pokeControls = (props) => (
  <div className={css.PokeControls}>
    <p>Total Calories : {props.totalCalories} kJ</p>
    { props.ingredients.map((a, i) =>( 
      pokeControl(a,i,props)
    ))}
    <button className={css.Submit} onClick={props.submitPoke}>Save your preference</button>
  </div>
)


export default pokeControls;