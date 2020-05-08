import React , {useEffect, useState} from 'react';
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

const Recommending = props => {
  // const [recommending, setRecommending] = useState([]);

  // shouldComponentUpdate(nProps){
  //   if(nProps.recommending !== props.recommending) return true;

  //   return false;
  // }

  useEffect(() => {
    props.dbGetRecommending()
  }, [])

  return(
    <div className={css.Recommending}>
    {props.recommending.map((obj) => {
      return(
        <Element key={obj.id} item={obj.data} {...props}/>
      )
    })}
    </div>
  )
}

const mapStateToProps = state => {
  return{
    recommending: state.pokereducer.recommending,
    ingredients: state.pokereducer.ingredients
  }
}

export default React.memo(connect(mapStateToProps, actions)(Recommending), (prevProps, nextProps) => nextProps.recommending === prevProps.recommending);