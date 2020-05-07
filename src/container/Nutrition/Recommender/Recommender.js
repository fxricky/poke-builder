import React , {Component} from 'react';
import css from './Recommender.css';
import * as firebase from 'firebase';
import * as moment from 'moment/moment.js';
import Input from '../../../component/Layout/UI/Input/Input';

import {connect} from 'react-redux';
import * as actions from '../../../store/actions/action'

class Recommmender extends Component {
  constructor(props){
    super(props)
    this.state ={
      form:{
        name: {
          elementType: 'input',
          elementConfig: {
            type: 'text',
            placeholder: 'Your name'
          },
          value: ''
        },
        email: {
          elementType: 'input',
          elementConfig: {
            type: 'email',
            placeholder: 'youremail@provider.com'
          },
          value: ''
        },
        youare: {
          elementType: 'select',
          elementConfig: {
            options: [
              {value: 'student', displayValue: 'Student'},
              {value: 'ftwork', displayValue: 'Full timer'},
              {value: 'notany', displayValue: 'Not any'},
            ]
          },
          value: ''
        }
      },
      sending: false
    }
  }

  recommendHandler = (event) => {
    event.preventDefault();
    this.setState({sending: true})
    let recommender = {};

    for (let key in this.state.form){
      recommender = {
        ...recommender,
        [key]: this.state.form[key].value
      }
    }

    var db = firebase.firestore();
    db.collection('poke').doc(moment().format('YYYYMMDDHHmmss')).set({
      pokeContent: {...this.props.selecteding},
      totalCalories: this.props.totalcalories,
      recommender: recommender
    })
    .then(() => {
      this.setState({sending: false});
      this.props.resetSelectedIng();
      alert('Saved Successfully.');
      this.props.history.push('/');
    })
    .catch(err => {
      alert(err)
      this.setState({sending: false})
    })
  }

  inputChangedHandler = (event, id) => {
    const{value} = event.target

    this.setState(prev => ({
      form: {
        ...prev.form,
        [id] :{
          ...prev.form[id],
          value: value
        }
      }
    }))
  }

  render(){
    let formElementArray = [];
    for (let key in this.state.form){
      formElementArray.push({
        id: key,
        config: this.state.form[key]
      })
    }

    return(
      <div className={css.Recommender}>
        <h4>Let others know who recommend it!</h4>
        <form>
          {formElementArray.map(obj => (
            <Input 
              key={obj.id} 
              elementType={obj.config.elementType} 
              elementConfig={obj.config.elementConfig}
              value={obj.config.value}
              changed={(event) => this.inputChangedHandler(event, obj.id)}
            />
          ))}
          <button disabled={this.state.sending} onClick={this.recommendHandler}>Recommend</button>
        </form>
      </div>
    )
  }
}

const mapStateToProps = state => {
  return{
    ingredients: state.pokereducer.ingredients,
    selecteding: state.pokereducer.selecteding, 
    totalcalories: state.pokereducer.totalcalories
  }
}

export default connect(mapStateToProps, actions)(Recommmender);