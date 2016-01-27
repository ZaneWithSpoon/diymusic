import { combineReducers } from 'redux'
import sugar from 'sugar'

//reducer functions
function instrumentPanel(
  state = [ 
  {instrument:'drums', loops: []}, 
  {instrument:'piano', loops: []},
  {instrument:'synth', loops: []},], 
  action) {

  switch (action.type) {
    case 'ADD_INSTRUMENT_LOOP':
      var thing = state.map(function(x) { return x.instrument })
      var index = thing.indexOf(action.instrument)

      //creating new array to replace state[index]notes
      var loops = state[index].loops
      var newLoop = { id: action.id, name: action.name }
      loops.push(newLoop)

      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          loops: loops
        }),
        ...state.slice(index + 1)
      ]
      break

    default:
      return state
  }
}

function hypermeasures(state = [], action) {

  switch (action.type) {
    case 'ADD_PREMADE_BEAT_HYPERMEASURE':
      //creating empty array of arrays (2d matrix)
      var empty = new Array
      for(i = 0; i < 16; i++){
        empty.push(new Array)
      }

      //to make a more interesting start\

      for(i = 0; i < 16; i++){
        empty[i].push('hat')
      }

      empty[0].push('kick')
      empty[3].push('kick')
      empty[7].push('kick')
      empty[11].push('kick')
      empty[14].push('kick')
      empty[4].push('snare')
      empty[12].push('snare')
      empty[1].push('tom')
      empty[9].push('tom')

      return [
        ...state,
        {
          id: action.id,
          size: 16,
          beatOrMelody: 'BEAT',
          instruments: ['kick', 'snare', 'tom', 'hat'],
          notes: empty,
          name: 'premade'
        }
      ]
      break

    case 'UPDATE_HYPERMEASURE_NAME': 
      var thing = state.map(function(x) { return x.id })
      var index = thing.indexOf(action.id)

      return [
        ...state.slice(0, index),
        Object.assign({}, state[index], {
          notes: notes
        }),
        ...state.slice(index + 1)
      ]
      break

    case 'ADD_BEAT_HYPERMEASURE':

      //creating empty array of arrays (2d matrix)
      var empty = new Array
      for(i = 0; i < 16; i++){
        empty.push(new Array)
      }

      return [
        ...state,
        {
          id: action.id,
          size: 16,
          beatOrMelody: 'BEAT',
          instruments: ['kick', 'snare', 'tom', 'hat'],
          notes: empty,
          name: 'unnamed'
        }
      ]
      break

    case 'ADD_BEAT_NOTE':
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

    case 'REMOVE_BEAT_NOTE':
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
  instrumentPanel,
  hypermeasures
})
