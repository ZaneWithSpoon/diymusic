//diym ( diy music ) built by Zane Witherspoon

import { addBeatHypermeasure, addBeatNote, setRunState, RunStates } from '../actions/actions'
import { connect } from 'react-redux'

//main.js
view Main {
  // const { dispatch, runState } = view.props

  // let id = dispatch(addBeatHypermeasure())
  //let id = 'afs'
  let id = 'afs'
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
    console.log('playING')
    //store.dispatch(setRunState('PLAYING'))
    playing = true
  }

  function onPause(){
    console.log('pauseED')
    //store.dispatch(setRunState('PAUSED'))
    playing = false
  }

  function onStop(){
    console.log('stopjlaflsk')
    //store.dispatch(setRunState('STOPPED'))
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
    bpm, speed, ts, repeating, playing,
    onUpdateTs, onToggleRepeat, onChangeBpm,
    onPlay, onPause, onStop
  }} />
  <Browser />
  <DrumPad {...{
    id, speed, repeating,
    ts, measures, xSquares, ySquares
  }} />

  $ = {
    height: 80,
    background: '#33cccc'
  }

  $Header = {
    marginBottom: 15
  }

  $Browser = {
    marginRight: 150,
    width: 150,
    height: 1000,
    position: 'fixed',
    background: '#E49595'
  }

  $DrumPad = {
    marginLeft: 150
  }
}
