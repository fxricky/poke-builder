import React, {Component} from 'react';
import Layout from './component/Layout/Layout'
import PokeBuilder from './container/PokeBuilder/PokeBuilder'

import {Route, Switch} from 'react-router-dom'
import asyncComponent from './component/hoc/asyncComponent'

import {connect} from 'react-redux'
import * as actions from './store/actions/action'

const lazyAuthout = asyncComponent(() => {
  return import('./container/Auth/AuthOut')
})

const lazyAuth = asyncComponent(() => {
  return import('./container/Auth/Auth')
})

const lazyNutrition = asyncComponent(() => {
  return import('./container/Nutrition/Nutrition')
})

const lazyRecommending = asyncComponent(() => {
  return import('./container/Recommending/Recommending')
})

class App extends Component {
  state = {
    ingredients: []
  }

  async componentDidMount(){
    this.props.dbGetIngredients();
    this.props.checkisLoggedin();
  }

  render(){
    return (
      <div>
        <Layout>
          <Switch>
            <Route path='/' exact component={(props) => <PokeBuilder {...props} ingredients={this.state.ingredients}/>} />
            <Route path='/nutrition' component={lazyNutrition} />
            <Route path='/recommending' component={lazyRecommending} />
            <Route path='/authout' component={lazyAuthout} />
            <Route path='/auth' component={lazyAuth} />
          </Switch>
        </Layout>
      </div>
    );
  }
}

export default connect(null, actions)(App);
