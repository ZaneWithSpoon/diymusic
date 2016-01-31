/*
 * action creators
 */
function addHypermeasureId(channelId, loopId, name) {
  return { type: 'ADD_HYPERMEASURE', channelId, loopId, name }
}

function addPremadeBeatHypermeasureId(id) {
  return { type: 'ADD_PREMADE_BEAT_HYPERMEASURE', id }
}

function addChannel(id, name, instrument) {
  return { type: 'ADD_CHANNEL', id, name, instrument }
}

function defaultChannel(channelId, loopId){
  return { type: 'ADD_DEFAULT_HYPERMEASURE', channelId, loopId }
}



export const addDrums = () => {
  return dispatch => {
    let id = Math.random().toString(36).substr(2, 9)
    let name = 'Drums'
    let instrument = 'drums'
    dispatch(addChannel(id, name, instrument))
    return {id, name}
  }
}

export const addInstrument = (instrument) => {
  return dispatch => {
    let id = Math.random().toString(36).substr(2, 9)
    let name = instrument
    dispatch(addChannel(id, name, instrument))
    return {id, name}
  }
}

export const addHypermeasure = (channelId) => {
  return dispatch => {
    //generating a unique ID for this Hypemeasure
    let loopId = Math.random().toString(36).substr(2, 9)
    let name = 'unnamed'
    dispatch(addHypermeasureId(channelId, loopId, name))
    return {loopId, name}
  }
}

export const addPremadeBeatHypermeasure = () => {
  return dispatch => {
    //generating a unique ID for this Hypemeasure
    let channelId = Math.random().toString(36).substr(2, 9)
    let loopId = Math.random().toString(36).substr(2, 9)

    dispatch(defaultChannel( channelId, loopId ))
    return loopId
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


