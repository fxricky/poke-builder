import React from 'react'
import css from './PokeControls.css'
import {Card, Button, IconButton} from '@material-ui/core'

const pokeControl = (a,i,props) => (
  <div key={a+i} className={css.PokeControl}>
    <IconButton 
      className={css.Minus} 
      onClick={() => props.minusIngredient(a.type)}>
        <i className="fa fa-minus"></i>
    </IconButton>
    <div className={css.ControlLabel}>{a.label}</div>
    <IconButton 
      className={css.Plus} 
      onClick={() => props.addIngredient(a.type)}>
        <i className="fa fa-plus"></i>
    </IconButton>
  </div>
)

const pokeControls = (props) => (
  <Card className={css.PokeControls}>
    <p>Total Calories : {props.totalCalories} kJ</p>
    { props.ingredients.map((a, i) =>( 
      pokeControl(a,i,props)
    ))}
    <Button className={css.Submit} onClick={props.submitPoke}>Save your preference</Button>
  </Card>
)


export default pokeControls;