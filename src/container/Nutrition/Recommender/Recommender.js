import React , {useState} from 'react';
import css from './Recommender.css';
import * as firebase from 'firebase';
import * as moment from 'moment/moment.js';
import Input from '../../../component/Layout/UI/Input/Input';
import Button from '@material-ui/core/Button'
import FormControl from '@material-ui/core/FormControl';

import {connect} from 'react-redux';
import * as actions from '../../../store/actions/action'

const Recommmender = props => {
  const [form, setForm] = useState({
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
  });

  const [sending, setSending] = useState(false);

  const recommendHandler = (event) => {
    event.preventDefault();
    // setState({sending: true})
    setSending(true);
    let recommender = {};

    for (let key in form){
      recommender = {
        ...recommender,
        [key]: form[key].value
      }
    }

    var db = firebase.firestore();
    db.collection('poke').doc(moment().format('YYYYMMDDHHmmss')).set({
      pokeContent: {...props.selecteding},
      totalCalories: props.totalcalories,
      recommender: recommender
    })
    .then(() => {
      // setState({sending: false});
      setSending(false);
      props.resetSelectedIng();
      props.history.push('/');
    })
    .catch(err => {
      alert(err);
      setSending(false);
    })
  }

  const inputChangedHandler = (event, id) => {
    const{value} = event.target

    setForm({
      ...form,
      [id] :{
        ...form[id],
        value: value
      }
    })
  }

    let formElementArray = [];
    for (let key in form){
      formElementArray.push({
        id: key,
        config: form[key]
      })
    }

  return(
    <div className={css.Recommender}>
      <h4>Let others know who recommend it!</h4>
      <FormControl variant='outlined' className={css.Form}>
        {formElementArray.map(obj => (
          <Input 
            key={obj.id} 
            elementType={obj.config.elementType} 
            elementConfig={obj.config.elementConfig}
            value={obj.config.value}
            changed={(event) => inputChangedHandler(event, obj.id)}
          />
        ))}
        <Button disabled={sending} onClick={recommendHandler}>Recommend</Button>
      </FormControl>
    </div>
  )
}

const mapStateToProps = state => {
  return{
    ingredients: state.pokereducer.ingredients,
    selecteding: state.pokereducer.selecteding, 
    totalcalories: state.pokereducer.totalcalories
  }
}

export default connect(mapStateToProps, actions)(Recommmender);