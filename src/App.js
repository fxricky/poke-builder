import React, {useEffect, Suspense} from 'react';
import Layout from './component/Layout/Layout';
import PokeBuilder from './container/PokeBuilder/PokeBuilder';
import CircularProgress from '@material-ui/core/CircularProgress';
import css from './App.css';

import {Route, Switch} from 'react-router-dom'

import {connect} from 'react-redux'
import * as actions from './store/actions/action'

const LazyAuthout = React.lazy(() => {
  return import('./container/Auth/AuthOut')
})

const LazyAuth = React.lazy(() => {
  return import('./container/Auth/Auth')
})

const LazyNutrition = React.lazy(() => {
  return import('./container/Nutrition/Nutrition')
})

const LazyRecommending = React.lazy(() => {
  return import('./container/Recommending/Recommending')
})

const App = props => {
  useEffect(() => {
    props.dbGetIngredients();
    props.checkisLoggedin();
  }, []);

  const state = {
    ingredients : []
  }

  const fallbackDiv = 
  <div className={css.Circular}>
    <CircularProgress/>
  </div>

  return (
    <Layout>
      <Switch>
        <Suspense fallback={fallbackDiv}>
          <Route path='/' exact component={(props) => <PokeBuilder {...props} ingredients={state.ingredients}/>} />
          <Route path='/nutrition' component={LazyNutrition} />
          <Route path='/recommending' component={LazyRecommending} />
          <Route path='/authout' component={LazyAuthout} />
          <Route path='/auth' component={LazyAuth} />
        </Suspense>
      </Switch>
    </Layout>
  );
}

export default connect(null, actions)(App);
