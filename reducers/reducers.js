import { combineReducers } from 'redux'
import sugar from 'sugar'

//reducer functions
function songData( state = { name:'title', bpm:120 }, action) {

  switch (action.type) {
    case 'UPDATE_BPM':
      return { name:state.name, bpm:action.newBpm }
      break

    case 'UPDATE_SONG_NAME':
      return { name:action.newName, bpm:state.bpm }
      break

    default:
      return state
  }
}




function channels(state = [], action) {

  switch (action.type) {
    case 'ADD_DEFAULT_HYPERMEASURE':

      var initialChannel = {  id:action.channelId,
                              name:'drums',
                              sampleType:'drumpad',
                              hypermeasures: [] }



      //creating empty 2d matrix to represent grid
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


      initialChannel.hypermeasures.push({
          id: action.hypermeasureId,
          size: 16,
          instruments: ['kick', 'snare', 'tom', 'hat'],
          notes: empty,
          name: 'premade'
        })

      return [initialChannel]
      break



    case 'UPDATE_HYPERMEASURE_NAME': 
      var thing = state.map(function(x) { return x.id })
      var index = thing.indexOf(action.id)

      return state
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
  songData,
  channels
})
