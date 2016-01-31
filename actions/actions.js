/*
 * action creators
 */
function addHypermeasureId(id, name, instrument) {
  return { type: 'ADD_HYPERMEASURE', id, name }
}

function addPremadeBeatHypermeasureId(id) {
  return { type: 'ADD_PREMADE_BEAT_HYPERMEASURE', id }
}

// function addNoteHypermeasure(id, name) {
//   return { type: 'ADD_NOTE_HYPERMEASURE', id }
// }


// export const addNoteHypermeasure = () => {
//   return dispatch => {
//     //generating a unique ID for this Hypemeasure
//     let id = Math.random().toString(36).substr(2, 9)
//     let name = 'unnamed'
//     dispatch(addNoteHypermeasureId(id, name))
//     return {id, name}
//   }
// }

export const addHypermeasure = () => {
  return dispatch => {
    //generating a unique ID for this Hypemeasure
    let id = Math.random().toString(36).substr(2, 9)
    let name = 'unnamed'
    dispatch(addBeatHypermeasureId(id, name))
    return {id, name}
  }
}

export const addPremadeBeatHypermeasure = () => {
  return dispatch => {
    //generating a unique ID for this Hypemeasure
    let id = Math.random().toString(36).substr(2, 9)
    let name = 'premade'
    dispatch(addPremadeBeatHypermeasureId(id))
    dispatch(addInstrumentLoop(id, name, 'drums'))
    return id
  }
}

export const updateHypermeasureName = (id, name) => ({
  type: 'UPDATE_HYPERMEASURE_NAME', id, name
})

export const addBeatNote = (id, instrument, beat) => ({
  type: 'ADD_BEAT_NOTE', id, instrument, beat
})

export const removeBeatNote = (id, instrument, beat) => ({
  type: 'REMOVE_BEAT_NOTE', id, instrument, beat
})

export const updateBpm = newBpm => ({
  type: 'UPDATE_BPM', newBpm
})

export const addInstrument = (instrument) => ({
  type:'ADD_INSTRUMENT', instrument
})

export const addInstrumentLoop = (id, name, instrument) => ({
  type: 'ADD_INSTRUMENT_LOOP', id, name, instrument
})

