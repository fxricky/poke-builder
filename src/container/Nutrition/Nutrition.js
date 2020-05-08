import React from 'react';
import css from './Nutrition.css';
import Poke from '../../component/Poke/Poke';
import {Route, Redirect} from 'react-router-dom';
import Recommender from './Recommender/Recommender';
import {connect} from 'react-redux';

const Nutrition = props => {
  const nutritionCanceled = () => {
    props.history.goBack();
  }

  const nutritionContinue = () => {
    props.history.replace('/nutrition/recommender')
  }

  let summary = <Redirect to='/' />
  if(props.selecteding){
    summary = (
      <>
        <Poke/>
        <div className={css.ButtonDiv}>
          <button onClick={nutritionCanceled} className={css.Danger}>Cancel</button>
          <button onClick={nutritionContinue} className={css.Success}>Continue</button>
        </div>
      </>
    )
  }

  return(
    <div className={css.Nutrition}>
      <div>Your nutrition value:</div>
      <div >
        {summary}
        <Route path={`${props.match.path}/recommender`} 
          component={Recommender}/>
      </div>
    </div>
  )
};

const mapStateToProps = state => {
  return{
    ingredients: state.pokereducer.ingredients,
    selecteding: state.pokereducer.selecteding, 
    totalcalories: state.pokereducer.totalcalories
  }
}

export default connect(mapStateToProps)(Nutrition);