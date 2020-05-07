import React , {PureComponent} from 'react';
import Poke from '../../component/Poke/Poke';
import PokeControls from '../../component/Poke/PokeControls/PokeControls';
import {connect} from 'react-redux';
import * as actions from '../../store/actions/action'

export class PokeBuilder extends PureComponent {
  constructor(props){
    super(props)
    this.state ={
      ingredients: props.ingredients,
      selectedIng: {},
      totalCalories: 0,
      sending: true
    }
  }

  addIngredientHandler = (type) => {
    this.props.addSelectedIng(type);
  }

  minusIngredientHandler = (type) => {
    this.props.remSelectedIng(type);
  }

  submitPokeToFirebase = () => {
    if(!this.props.loggedin){
      alert('Please login before you save your recommendation.');
      return;
    }

    if(!Object.values(this.props.selecteding).every(obj => obj === 0) && Object.keys(this.props.selecteding).length > 0){
      this.props.history.push({
        pathname: 'nutrition'
      })
    }else{
      alert('Your bowl is empty. Please make some food in. :D')
    }
  }

  render(){
    return(
      <>
        <Poke ingredients={this.props.ingredients} selectedIng={this.props.selecteding}/>
        {this.props.ingredients &&
          <PokeControls 
            ingredients={this.props.ingredients}
            addIngredient={this.addIngredientHandler}
            minusIngredient={this.minusIngredientHandler}
            submitPoke = {this.submitPokeToFirebase}
            sending = {this.state.sending}
            totalCalories={this.props.totalcalories}/>
        }
      </>
    )
  }
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