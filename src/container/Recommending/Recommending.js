import React , {Component} from 'react';
import css from './Recommending.css'
import {connect} from 'react-redux'
import * as actions from '../../store/actions/action'

const Element = ({item, ingredients}) => {
  const{pokeContent} = item
  return(
    <div className={css.miniEl}>
      {Object.keys(pokeContent).map((obj, i) =>
          <div key={i}>{`${obj} - ${pokeContent[obj]*100}g`}</div>
      )}
      <hr/>
      <div>{`Total Calories - ${item.totalCalories} kJ`}</div>
    </div>
  )
}

class Recommending extends Component{
  constructor(props){
    super(props);
    this.state = {
      recommending: []
    }
  }

  shouldComponentUpdate(nProps){
    if(nProps.recommending !== this.props.recommending) return true;

    return false;
  }

  componentDidMount(){
    this.props.dbGetRecommending()
  }

  render(){
    return(
      <div className={css.Recommending}>
      {this.props.recommending.map((obj) => {
        return(
          <Element key={obj.id} item={obj.data} {...this.props}/>
        )
      })}
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    recommending: state.pokereducer.recommending,
    ingredients: state.pokereducer.ingredients
  }
}

export default connect(mapStateToProps, actions)(Recommending);