import { combineReducers } from 'redux'
import { ADD_BEAT_HYPERMESURE, ADD_BEAT_NOTE, SET_RUN_STATE, RunStates } from '../actions/actions'
const { SHOW_ALL } = VisibilityFilters

function runState(state = STOPPED, action) {

  switch (action.type) {
    case SET_RUN_STATE:
      return action.state

    default:
      return state
  }
}

function hypermeasures(state = [], action) {

  switch (action.type) {
    case ADD_BEAT_HYPERMESURE:
      //creating empty array of arrays (2d matrix)
      var empty = new Array[16]
      for(i = 0; i < 16; i++){
        empty[i] = {}
      }

      //generating a unique ID for this Hypemeasure
      var ID = function () {
        return '_' + Math.random().toString(36).substr(2, 9);
      };

      return [
        ...state,
        {
          beatOrMelody: 'BEAT',
          instruments: ['kick', 'snare', 'tom', 'hat'],
          notes: empty
        }
      ]


    case ADD_BEAT_NOTE:
      //getting index of hypermeasure by id
      var index = state.map(function(x) {return x.id; }).indexOf(action.id)

      //creating new array to replace state[index]notes
      var notes = state[index].notes
      notes[action.beat].push(
        state[index].instruments.indexOf(action.instrument))

      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          notes: notes
        }),
        ...state.slice(index + 1)
      ]

      default:
        return state
  }
}



const diymApp = combineReducers({
  runState,
  hypermeasures
})

export default diymApp

