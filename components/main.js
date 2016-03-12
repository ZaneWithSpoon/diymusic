//diym ( diy music ) built by Zane Witherspoon

import { createStore, applyMiddleware } from 'redux'
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
  view.pause()

  //defining initial state variables
  let song = store.getState()
  let channels = song.channels


  //Defning default variables
  let bpm = 120
  let speed = 60000/bpm/2
  let runState = 'STOPPED'

  let currentHypermeasures = []
  let checkedHypermeasures = []
  let concentratedNotes = []
  
  let playingBeat = -1
  let beatWait = []

  store.subscribe(updateSong)

  function updateSong(){
    song = store.getState()
    channels = song.channels

    //console.log(channels)

    view.update()
  }

  function toggleChecked(id){
    let index = checkedHypermeasures.indexOf(id)
    if(index === -1){
      checkedHypermeasures.push(id)
    } else {
      checkedHypermeasures.splice(index, 1)
    }

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

    sourceBuffer.start()  

    
  }

  function stop() {
    for(i = 0; i < beatWait.length; i++){
      clearTimeout(beatWait[i])
    }
    beatWait = []
  }

  function updateLater() { setTimeout(() => view.update(),  100) }
  
  // done because of likely bug in audio api
  // where view.set overstimulates audio
  // so temporarily turn off flint

  function renderAudio(i) {

    concentratedNotes.map(channel => {
      if(channel.sampleType == 'drumpad'){
        channel.notes[i].map( instrument =>
          playPrecussion(instrument)
        )
      } else {
        channel.notes[i].map( note =>
          playNote(note, channel.instrument)
        )
      }
    })
  }

  function loadCurrentHypermeasures() {

    concentratedNotes = []
    let empty = []
    for(i = 0; i < 16; i++){
      empty.push(new Array)
    }

    for(i = 0; i < channels.length; i++){

      if(channels[i].sampleType === 'drumpad'){
        concentratedNotes.push({
          sampleType: channels[i].sampleType, 
          notes: empty
        })        
      } else if(channels[i].sampleType === 'pianoroll'){
        concentratedNotes.push({
          sampleType: channels[i].sampleType, 
          instrument: channels[i].instrument,
          notes: empty
        }) 
      }

      channels[i].hypermeasures.map( loop => {
        checkedHypermeasures.map( id => {
          if(loop.id === id){
            for(b = 0; b < loop.notes.length; b++){
              loop.notes[b].map( note => {
                concentratedNotes[i].notes[b].push(note)
              })
            }
          }
        })
      })

    }

  }

  //play-pause-stop buttons
  function onPlay(){
    loadCurrentHypermeasures()

    runState = 'PLAYING'

    incrementPlayingBeat()

    updateLater()
    //view.update()
  }

  function incrementPlayingBeat() {
    playingBeat++

    renderAudio(playingBeat)

    if(playingBeat >= 15){
      loadCurrentHypermeasures()
      playingBeat = -1
    } 
    
    beatWait.push(setTimeout(() => incrementPlayingBeat(), speed))

    updateLater()
  }

  function onPause(){
    stop()
    runState = 'PAUSED'
    view.update()
  }

  function onStop(){
    stop()
    playingBeat = -1
    runState = 'STOPPED'

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



  <Header {...{
    store, bpm, speed, runState,
    onChangeBpm,
    onPlay, onPause, onStop
  }} />
  <Studio {...{
    store, speed, playPrecussion, checkedHypermeasures,
    playingBeat, playNote, channels,
    toggleChecked
  }} />
  // <PianoRoll {...{
  //   store, 
  //   focusedMeasure: { 
  //     name:'test', 
  //     id: 'fjwod',
  //     sampleType: 'midi',
  //     hypermeasures: []
  //   },
  //   playNote, playingBeat, channelId: 'dnfjfn'
  // }}/>



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
