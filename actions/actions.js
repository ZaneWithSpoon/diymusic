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

export function addBeatHypermeasure() {
  return { type: ADD_BEAT_HYPERMEASURE }
}

export function addBeatNote(id, instrument, beat ) {
  return { 
    type: ADD_BEAT_NOTE, 
    id: id,
    instrument: instrument,
    beat: beat
  }
}

export function setRunState(state) {
  return { type: SET_RUN_STATE, state }
}