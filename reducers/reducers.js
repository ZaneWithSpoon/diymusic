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
          id: action.loopId,
          size: 16,
          instruments: ['kick', 'snare', 'tom', 'hat'],
          notes: empty,
          name: 'premade'
        })

      return [initialChannel]
      break

    case 'ADD_HYPERMEASURE':

      var idArray = state.map(function(x) { return x.id })
      var index = idArray.indexOf(action.channelId)

      var newChannel = Object.assign({}, state[index])

      if(newChannel.sampleType === 'drumpad'){
          //creating empty array of arrays (2d matrix)
          var empty = new Array
          for(i = 0; i < 16; i++){
            empty.push(new Array)
          }

        newChannel.hypermeasures.push({
            id: action.loopId,
            size: 16,
            instruments: ['kick', 'snare', 'tom', 'hat'],
            notes: empty,
            name: action.name
        })

      } else if (newChannel.sampleType === 'pianoroll') {
        //TODO: make different matrix for piano
      }

      return [
        ...state.slice(0, index),
        newChannel,
        ...state.slice(index + 1)
      ]
      break

    case 'TOGGLE_NOTE':
      var idArray = state.map(function(x) { return x.id })
      var channelIndex = idArray.indexOf(action.channelId)

      idArray = state[channelIndex].hypermeasures.map(function(x) { return x.id })
      var loopIndex = idArray.indexOf(action.loopId)

      //creating new array to replace state[index]notes
      var notes = state[channelIndex].hypermeasures[loopIndex].notes
      var noteIndex = notes[action.beat].indexOf(action.note)

      if(noteIndex === -1){
        notes[action.beat].push(action.note)
      } else {
        notes[action.beat].splice(noteIndex, 1)
      }

      return [
        ...state.slice(0, channelIndex),
        Object.assign({}, state[channelIndex], {
          notes: notes
        }),
        ...state.slice(channelIndex + 1)
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
