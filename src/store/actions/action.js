
import * as firebase from 'firebase';
import * as type from './type';

export * from './authactions'

const firebaseConfig = {
  apiKey: "AIzaSyAwR5gP_WDHJJBkQ6x1_iRr92WQWyP6FRc",
  authDomain: "pokebuilder-5b183.firebaseapp.com",
  databaseURL: "https://pokebuilder-5b183.firebaseio.com",
  projectId: "pokebuilder-5b183",
  storageBucket: "pokebuilder-5b183.appspot.com",
  messagingSenderId: "139406116577",
  appId: "1:139406116577:web:7743dc7f5c4ed2904a59a0",
  measurementId: "G-MPYQL8LYP8"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

export const dbGetIngredients = (data) => (dispatch, getState) => {
  // var db = firebase.firestore();
  db.collection('ingredients').doc('main').get()
  .then(resp => {
    var finalObj = 
    Object.keys(resp.data()).map((obj, i) => {
      return {
        key: obj + i,
        type : obj,
        label: resp.data()[obj].label,
        calories: resp.data()[obj].calories
    }}).sort((a,b) => a.type < b.type ? -1 : 1);
    
    // localStorage.setItem('ingredients', JSON.stringify(finalObj));
    dispatch({type: type.GET_INGREDIENTS, payload: finalObj})
  });
}

export const addSelectedIng = (data) => (dispatch, getState) => {
  const {ingredients, selecteding, totalcalories} = getState().pokereducer;

  let payload = {
    selecteding: {
      ...selecteding, 
      [data]: (selecteding[data] || 0) + 1
    },
    totalcalories: totalcalories + ingredients.find(obj => obj.type === data).calories}

  dispatch({type: type.ADD_SELECTEDING, payload: payload})
}

export const remSelectedIng = (data) => (dispatch, getState) => {
  const {ingredients, selecteding, totalcalories} = getState().pokereducer;

  let payload = {
    selecteding: {
      ...selecteding, 
      [data]: selecteding[data] - 1
      },
      totalcalories: totalcalories - ingredients.find(obj => obj.type === data).calories
  }

  dispatch({type: type.REM_SELECTEDING, payload: payload})
}

export const resetSelectedIng = () => {
  return {type: type.RESET_SELECTEDING}
}

export const dbGetRecommending = () => (dispatch, getState) => {
  // var db = firebase.firestore();
  var tmpList = [];

  db.collection('poke').get()
  .then(resp => {   
    resp.forEach(doc=> {
      let data = doc.data();
      tmpList.push({
        id : doc.id,
        data : data
      })
    })   

    dispatch({type: type.GET_RECOMMENDING, payload: tmpList})
  })
  .catch(err => alert(err));
}