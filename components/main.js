//diym ( diy music ) built by Zane Witherspoon

import { addBeatHypermeasure, addBeatNote, removeBeatNote, setRunState, toggleRepeat } from '../actions/actions'
import { createStore, applyMiddleware } from 'redux'
import { connect } from 'react-redux'
import thunkMiddleware from 'redux-thunk'
import createLogger from 'redux-logger'
import { diymApp } from '../reducers/reducers'
import Soundfont from 'soundfont-player'

const loggerMiddleware = createLogger()

const createStoreWithMiddleware = applyMiddleware(
//  loggerMiddleware, // neat middleware that logs actions
  thunkMiddleware // lets us dispatch() functions
)(createStore)

const store = createStoreWithMiddleware(diymApp)


let request = new XMLHttpRequest()
let ctx = new AudioContext()


let soundfont = new Soundfont(ctx)

let inst = soundfont.instrument('acoustic_grand_piano')
inst.onready(function() {
  inst.play('C4', 0)
})



//main.js
view Main {

  //Defning default variables
  let tempId = store.dispatch(addBeatHypermeasure())
  let bpm = 120
  let speed = 60000/bpm
  let repeating = false
  let runState = 'STOPPED'
  let ts = { top: 4, bottom: 4 }

  let measures = 4
  let octaves = 1
  let xSquares = ts.top * measures
  let ySquares = (octaves * 12) + 1

  let playingBeat = -1
  let beatWait = []

  let viewing = 'tl'
  let id = ''

  let instrumentPanelData = [ 
  {instrument:'drums', loops: [tempId]}, 
  {instrument:'piano', loops: []},
  {instrument:'synth', loops: []},]


  //Key command functions

  on.keydown((e) => {
    console.log(e.keyCode)
    if(e.keyCode === 32){
      e.preventDefault()

      if(runState == 'PLAYING'){
        onPause()
      } else {
        onPlay()
      }
    } else if (e.keycode <= 48 && e.keyCode >= 57){
      //instruments = store.getState().
    }
  })


  //Playing Audio Functions

  function loadAudio(object, url) {

    var request = new XMLHttpRequest();
    request.open('GET', url, true);
    request.responseType = 'arraybuffer';

    request.onload = function() {
      ctx.decodeAudioData(request.response, function(buffer) {
        object.buffer = buffer;
      });
    }
    request.send();
  }

  function playPrecussion(instrument) {
    //Create the audio buffer source Node
    let sourceBuffer = ctx.createBufferSource()

    let url = '../sounds/' + instrument + '.wav'

    loadAudio(sourceBuffer, url)
    sourceBuffer.connect(ctx.destination)
    sourceBuffer.start(0)

  }

  function stop() {
    for(i = 0; i < beatWait.length; i++){
      clearTimeout(beatWait[i])
    }
  }

  function play() {

    let i = playingBeat+1;

    renderAudio(i)
    playingBeat++
    checkForRepeat(i)
  }

  function loadBeat(i) {
    beatWait.push(waiting = setTimeout(function(){
      renderAudio(i)
      playingBeat++

      checkForRepeat(i)
    }, (speed)))
  }

  function renderAudio(i) {

    let notes = store.getState().hypermeasures[0].notes[i]
    // console.log(i)
    // console.log(notes)
    notes.map(instrument => {
      playPrecussion(instrument)
    })
  }

  function checkForRepeat(i) {
    if(i == (xSquares-1) && repeating){
      setTimeout(function(){
        playingBeat = -1
        play()
      }, speed)
    } else if(i == (xSquares-1) && !repeating){
      setTimeout(function(){
        onStop()
      }, speed)
    } else {
      loadBeat(i+1)
    }
  }


  //play-pause-stop buttons
  function onPlay(){
    play()
    store.dispatch(setRunState('PLAYING'))
    runState = 'PLAYING'
  }

  function onPause(){
    stop()
    store.dispatch(setRunState('PAUSED'))
    runState = 'PAUSED'
  }

  function onStop(){
    stop()
    store.dispatch(setRunState('STOPPED'))
    playingBeat = -1
    runState = 'STOPPED'
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
    store.dispatch(toggleRepeat())
    repeating = !repeating
  }

  function switchToDrumpad(newId) {
    console.log(newId)
    id = newId
    viewing = 'dp'
  }

  function switchToStudio() {
    viewing = 'tl'
  }


  //JSX

  <Header {...{
    store, bpm, speed, ts, repeating, runState,
    onUpdateTs, onToggleRepeat, onChangeBpm,
    onPlay, onPause, onStop, repeating
  }} />
  <Studio if={viewing == 'tl'} {...{
    instrumentPanelData, switchToDrumpad
  }} />
  <DrumPad if={viewing == 'dp'}{...{
    store, id, speed, repeating, playPrecussion,
    ts, measures, xSquares, ySquares, playingBeat,
    switchToStudio
  }} />


  //Style

  $Header = {
    height: 80,
    background: '#1CCAD8'
  }

  $Browser = {
    width: 150,
    height: window.innerHeight-100,
    position: 'fixed',
    background: '#E01A4F'
  }

  $DrumPad = {
    // background: '#0F1108',
    // color: 'white'
  }

  $Studio = {
    // background: '#0F1108',
    // color: 'white',
    float: 'left',
    width: window.innerWidth,
    height: window.innerHeight-100
  }
}
