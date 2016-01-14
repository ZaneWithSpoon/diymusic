/*
 * action types
 */

export const ADD_BEAT_HYPERMEASURE = 'ADD_BEAT_HYPERMEASURE'
export const ADD_BEAT_NOTE = 'ADD_BEAT_NOTE'
export const SET_RUN_STATE = 'SET_RUN_STATE'

/*
 * other constants
 */

export const RunStates = {
  PLAYING: 'PLAYING',
  PAUSED: 'PAUSED',
  STOPPED: 'STOPPED'
}

/*
 * action creators
 */
function addBeatHypermeasureId(id) {
  console.log(id)
  return { type: ADD_BEAT_HYPERMEASURE, id }
}

export const addBeatHypermeasure = () => {
  return dispatch => {
    //generating a unique ID for this Hypemeasure
    let id = Math.random().toString(36).substr(2, 9)
    dispatch(addBeatHypermeasureId(id))
    return id
  }
}

export const addBeatNote = (id, instrument, beat) => ({
  type: ADD_BEAT_NOTE, id, instrument, beat
})

export const setRunState = state => ({
  type: SET_RUN_STATE, state
})
