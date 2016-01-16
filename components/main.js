//diym ( diy music ) built by Zane Witherspoon

import { addBeatHypermeasure, addBeatNote, removeBeatNote, setRunState, RunStates } from '../actions/actions'
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { diymApp } from '../reducers/reducers'

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  loggerMiddleware // neat middleware that logs actions
)(createStore)

const store = createStoreWithMiddleware(diymApp)


//main.js
view Main {

  on.mount(() => {

    // console.log('onMount')

    // MIDI.loadPlugin({
    //   soundfontUrl: "./soundfont/",
    //   instrument: "acoustic_grand_piano",
    //   onprogress: function(state, progress) {
    //     console.log('progress')
    //     console.log(state, progress)
    //   },
    //   onsuccess: function() {
    //     console.log('success')
    //     var delay = 0; // play one note every quarter second
    //     var note = 50; // the MIDI note
    //     var velocity = 127; // how hard the note hits
    //     // play the note
    //     MIDI.setVolume(0, 127);
    //     MIDI.noteOn(0, note, velocity, delay);
    //     MIDI.noteOff(0, note, delay + 0.75);
    //   }
    // })

  })

  let id = store.dispatch(addBeatHypermeasure())
  let bpm = 120
  let speed = 60000/bpm
  let repeating = false
  let playing = false
  let ts = { top: 4, bottom: 4 }

  let measures = 4
  let octaves = 1
  let xSquares = ts.top * measures
  let ySquares = (octaves * 12) + 1


  //play-pause-stop buttons
  function onPlay(){
    store.dispatch(setRunState('PLAYING'))
    playing = true
  }

  function onPause(){
    store.dispatch(setRunState('PAUSED'))
    playing = false
  }

  function onStop(){
    store.dispatch(setRunState('STOPPED'))
    playing = false
  }


  //change variables
  function onChangeBpm(newBpm) {
    console.log('changed bpm in func')
    bpm = newBpm
    speed = 60000 / bpm
  }

  function onUpdateTs(newTs) {
    console.log('new ts is', newTs)
    ts = newTs
    xSquares = ts.top * measures
  }

  function onToggleRepeat() {
    repeating = !repeating
  }

  <Header {...{
    store, bpm, speed, ts, repeating, playing,
    onUpdateTs, onToggleRepeat, onChangeBpm,
    onPlay, onPause, onStop
  }} />
  <Browser />
  <DrumPad {...{
    store, id, speed, repeating,
    ts, measures, xSquares, ySquares
  }} />

  $ = {
    height: 80,
    background: '#1CCAD8'
  }

  $Header = {
    marginBottom: 15
  }

  $Browser = {
    marginRight: 150,
    width: 150,
    height: 1000,
    position: 'fixed',
    background: '#E01A4F'
  }

  $DrumPad = {
    marginLeft: 150
  }
}
