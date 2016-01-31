//diym ( diy music ) built by Zane Witherspoon

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

const ctx = new (window.AudioContext || window.webkitAudioContext)
const soundfont = new Soundfont(ctx)




//main.js
view Main {
  //view.pause()

  //defining initial state variables
  let song = store.getState()
  let channels = song.channels


  //Defning default variables
  let bpm = 120
  let speed = 60000/bpm/2
  let repeating = true
  let runState = 'STOPPED'
  let xSquares = 16


  let playingBeat = -1
  let beatWait = []

  store.subscribe(updateSong)

  function updateSong(){
    song = store.getState()
    channels = song.channels

    console.log('song - Store updated')
    console.log(song)

    view.update()
  }


  //Key command functions
  on.keydown((e) => {
    console.log(e.keyCode)
    if(e.keyCode === 32){
      e.preventDefault()

      if(runState == 'PLAYING'){
        onStop()
      } else {
        onPlay()
      }
    } else if (e.keycode <= 48 && e.keyCode >= 57){
      //instruments = store.getState().
    }
  })

  //Playing Audio Functions
  function loadAudio(sourceBuffer, url) {

    let request = new XMLHttpRequest()
    request.open('GET', url, true)
    request.responseType = 'arraybuffer'

    request.onload = function() {
      ctx.decodeAudioData(request.response, function(buffer) {
        //console.log(buffer)
        sourceBuffer.buffer = buffer
      })
    }
    request.send()
  }

  function playNote(note, instrument) {
    let inst = soundfont.instrument(instrument)
    inst.onready(function() {
      inst.play(note, 0)
    })
  }

  function playPrecussion(instrument) {
    //Create the audio buffer source Node
    let sourceBuffer = ctx.createBufferSource()

    let url = '../sounds/' + instrument + '.wav'

    loadAudio(sourceBuffer, url)
    sourceBuffer.connect(ctx.destination)
    sourceBuffer.loop = false

    //console.log(sourceBuffer)
    setTimeout(() => {
      sourceBuffer.start()  
    })

    // view.update()
    
  }

  function stop() {
    for(i = 0; i < beatWait.length; i++){
      clearTimeout(beatWait[i])
    }
    beatWait = []
  }

  function updateLater() { setTimeout(() => view.update(),  10) }
  function play() {

    let i = playingBeat+1;
    incrementPlayingBeat(i)
    checkForRepeat(i)
    updateLater()
  }
  // done because of likely bug in audio api
  // where view.set overstimulates audio
  // so temporarily turn off flint
  function incrementPlayingBeat(i) {
    renderAudio(i)
    playingBeat++
    updateLater()
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

  function loadBeat(i) {
    beatWait.push(waiting = setTimeout(() => {
      incrementPlayingBeat(i)

      checkForRepeat(i)
    }, speed))
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
    updateLater()
  }


  //play-pause-stop buttons
  function onPlay(){
    play()
    runState = 'PLAYING'
    updateLater()
  }

  function onPause(){
    stop()
    runState = 'PAUSED'
    view.update()
  }

  function onStop(){
    // stop()
    // playingBeat = -1
    // runState = 'STOPPED'

    //playPrecussion('hat')
    console.log('onStop')
    console.log(channels)

    view.update()
    
  }


  //change variables
  function onChangeBpm(newBpm) {
    console.log('changed bpm in func')
    bpm = newBpm
    speed = 60000 / bpm /Z
    view.update()
  }

  function onUpdateTs(newTs) {
    console.log('new ts is', newTs)
    ts = newTs
    xSquares = ts.top * measures
    view.update()
  }

  function onToggleRepeat() {
    repeating = !repeating
    view.update()
  }


  <Header {...{
    store, bpm, speed, repeating, runState,
    onToggleRepeat, onChangeBpm,
    onPlay, onPause, onStop, repeating
  }} />
  <Studio {...{
    store, speed, repeating, playPrecussion,
    playingBeat, playNote, channels
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
