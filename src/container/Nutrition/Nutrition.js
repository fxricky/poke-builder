import React from 'react';
import css from './Nutrition.css';
import Poke from '../../component/Poke/Poke';
import {Route, Redirect} from 'react-router-dom';
import Recommender from './Recommender/Recommender';
import {connect} from 'react-redux';
import Button from '@material-ui/core/Button'

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
          <Button onClick={nutritionCanceled} className={css.Danger} color='secondary'>Cancel</Button>
          <Button onClick={nutritionContinue} className={css.Success} color='primary'>Continue</Button>
        </div>
      </>
    )
  }

  return(
    <div className={css.Nutrition}>
      <div>Your selection:</div>
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