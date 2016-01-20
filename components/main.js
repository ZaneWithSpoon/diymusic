//diym ( diy music ) built by Zane Witherspoon

import { addPremadeBeatHypermeasure } from '../actions/actions'
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


const ctx = new AudioContext()


const soundfont = new Soundfont(ctx)




//main.js
view Main {

  let inst = soundfont.instrument('acoustic_grand_piano')
  inst.onready(function() {
    inst.play('C4', 0)
  })


  //Defning default variables
  let tempId = store.dispatch(addPremadeBeatHypermeasure())
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

  let viewState = 'tl'
  let id = ''

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
        console.log(buffer)
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
    sourceBuffer.start()
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

    //TODO : play focused hypermeasures
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
    runState = 'PLAYING'
  }

  function onPause(){
    stop()
    runState = 'PAUSED'
  }

  function onStop(){
    stop()
    playingBeat = -1
    runState = 'STOPPED'

    playPrecussion('hat')



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


  //JSX
  <test onClick={() => {    
    //runState = 'STOPPED'
    playPrecussion('hat')}
  }> test </test>
  <Header {...{
    store, bpm, speed, ts, repeating, runState,
    onUpdateTs, onToggleRepeat, onChangeBpm,
    onPlay, onPause, onStop, repeating
  }} />
  <Studio{...{
    store, speed, repeating, playPrecussion,
    playingBeat
  }} />



  //Style

  $Header = {
    height: 80,
    background: '#1CCAD8',
    marginBottom: 0
  }

  $Studio = {
    marginTop: 0,
    float: 'left',
    width: window.innerWidth,
    height: window.innerHeight-100
  }
}
