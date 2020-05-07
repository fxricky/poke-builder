import React, {Component} from 'react';
import css from './Nutrition.css';
import Poke from '../../component/Poke/Poke';
import {Route, Redirect} from 'react-router-dom';
import Recommender from './Recommender/Recommender';
import {connect} from 'react-redux';

class Nutrition extends Component {
  componentDidUpdate(prevState){ }

  componentDidMount(){ }

  nutritionCanceled = () => {
    this.props.history.goBack();
  }

  nutritionContinue = () => {
    this.props.history.replace('/nutrition/recommender')
  }

  render(){
    let summary = <Redirect to='/' />
    if(this.props.selecteding){
      summary = (
        <>
          <Poke/>
          <div className={css.ButtonDiv}>
            <button onClick={this.nutritionCanceled} className={css.Danger}>Cancel</button>
            <button onClick={this.nutritionContinue} className={css.Success}>Continue</button>
          </div>
        </>
      )
    }

    return(
      <div className={css.Nutrition}>
        <div>Your nutrition value:</div>
        <div >
          {summary}
          <Route path={`${this.props.match.path}/recommender`} 
            component={Recommender}/>
        </div>
      </div>
    )
  }
};

const mapStateToProps = state => {
  return{
    ingredients: state.pokereducer.ingredients,
    selecteding: state.pokereducer.selecteding, 
    totalcalories: state.pokereducer.totalcalories
  }
}

export default connect(mapStateToProps)(Nutrition);