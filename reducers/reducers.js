import { combineReducers } from 'redux'
import { ADD_BEAT_HYPERMEASURE, REMOVE_BEAT_NOTE, ADD_BEAT_NOTE, SET_RUN_STATE, RunStates } from '../actions/actions'
import sugar from 'sugar'
const { STOPPED } = RunStates

//reducer functions
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
    case ADD_BEAT_HYPERMEASURE:
      //creating empty array of arrays (2d matrix)
      var empty = new Array
      for(i = 0; i < 16; i++){
        empty.push(new Array)
      }

      return [
        ...state,
        {
          id: action.id,
          beatOrMelody: 'BEAT',
          instruments: ['kick', 'snare', 'tom', 'hat'],
          notes: empty
        }
      ]
      break

    case ADD_BEAT_NOTE:
      var thing = state.map(function(x) { return x.id })
      var index = thing.indexOf(action.id)

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
      break

    case REMOVE_BEAT_NOTE:
      var thing = state.map(function(x) { return x.id })
      var index = thing.indexOf(action.id)

      //creating new array to replace state[index]notes
      var notes = state[index].notes
      notes[action.beat].remove(
        state[index].instruments.indexOf(action.instrument))

      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          notes: notes
        }),
        ...state.slice(index + 1)
      ]
      break 


    default:
      return state
  }
}

export const diymApp = combineReducers({
  runState,
  hypermeasures
})
