import React , {useState} from 'react';
import Poke from '../../component/Poke/Poke';
import PokeControls from '../../component/Poke/PokeControls/PokeControls';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/action'

export const PokeBuilder = props => {
  // const [ingredients, setIngredients] = useState([]);
  // const [selectedIng, setSelectedIng] = useState({});
  // const [totalCalories, setTotalCalories] = useState(0);
  const [sending] = useState(false);

  const addIngredientHandler = (type) => {
    props.addSelectedIng(type);
  }

  const minusIngredientHandler = (type) => {
    props.remSelectedIng(type);
  }

  const submitPokeToFirebase = () => {
    if(!props.loggedin){
      alert('Please login before you save your recommendation.');
      return;
    }

    if(!Object.values(props.selecteding).every(obj => obj === 0) && Object.keys(props.selecteding).length > 0){
      props.history.push({
        pathname: 'nutrition'
      })
    }else{
      alert('Your bowl is empty. Please make some food in. :D')
    }
  }

  return(
    <>
      <Poke ingredients={props.ingredients} selectedIng={props.selecteding}/>
      {props.ingredients &&
        <PokeControls 
          ingredients={props.ingredients}
          addIngredient={addIngredientHandler}
          minusIngredient={minusIngredientHandler}
          submitPoke = {submitPokeToFirebase}
          sending = {sending}
          totalCalories={props.totalcalories}/>
      }
    </>
  )
}

const mapStateToProps = state => {
  return{
    ingredients: state.pokereducer.ingredients,
    selecteding: state.pokereducer.selecteding, 
    totalcalories: state.pokereducer.totalcalories,
    loggedin: state.authreducer.loggedin
  }
}

export default connect(mapStateToProps, actions)(PokeBuilder);