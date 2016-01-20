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

function instrumentPanel(
  state = [ 
  {instrument:'drums', loops: []}, 
  {instrument:'piano', loops: []},
  {instrument:'synth', loops: []},], 
  action) {

  switch (action.type) {
    case 'ADD_INSTRUMENT_LOOP':
      return state

    default:
      return state
  }

}

function repeat(state = false, action) {

  switch (action.type) {
    case 'TOGGLE_REPEAT':
      return !state

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

      //to make a more interesting start
      empty[0].push('kick')
      empty[1].push('hat')
      empty[2].push('snare')
      empty[3].push('hat')
      empty[4].push('kick')
      empty[5].push('hat')
      empty[6].push('snare')
      empty[6].push('tom')
      empty[8].push('kick')
      empty[9].push('hat')
      empty[10].push('snare')
      empty[11].push('hat')
      empty[12].push('kick')
      empty[13].push('hat')
      empty[14].push('snare')
      empty[14].push('tom')
      empty[15].push('hat')

      return [
        ...state,
        {
          id: action.id,
          size: 16,
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
      notes[action.beat].push(action.instrument)

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
      notes[action.beat].remove(action.instrument)

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
  instrumentPanel,
  repeat,
  hypermeasures
})
