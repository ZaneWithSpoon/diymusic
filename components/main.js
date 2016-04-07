//diym ( diy music ) built by Zane Witherspoon

import Soundfont from 'soundfont-player'
import sugar from 'sugar'


const ctx = new (window.AudioContext || window.webkitAudioContext)
const soundfont = new Soundfont(ctx)


//main.js
view Main {
  view.pause()


  //Defning default variables
  let bpm = 120
  let speed = 60000/bpm/2
  let runState = 'STOPPED'

  let currentHypermeasures = []
  let checkedHypermeasures = []
  let concentratedNotes = []
  
  let playingBeat = -1
  let beatWait = []

  let songData = newSong()
  let channels = []
  channels.push(songData)
  toggleChecked(songData.hypermeasures[0].id)

  addInstrument('acoustic_grand_piano')



  function toggleNote(channelId, measureId, index, instrument){

    for(i = 0; i < channels.length; i++){
      //console.log(channels[i])
      if(channels[i].id === channelId){
        for(j = 0; j < channels[i].hypermeasures.length; j++){
          //console.log(channels[i].hypermeasures[j])
          if(channels[i].hypermeasures[j].id === measureId){
            //console.log('inner if')
            let found = -1
            for(k = 0; k < channels[i].hypermeasures[j].notes[index].length; k++){
              if(instrument === channels[i].hypermeasures[j].notes[index][k]){
                found = k
              }
            }
            if(found === -1){
              channels[i].hypermeasures[j].notes[index].push(instrument)
            } else {
              channels[i].hypermeasures[j].notes[index].splice(found, 1)
            }
          }
        }
      }
    }

    updateLater()
  }



  function newSong(){

    let channelId = Math.random().toString(36).substr(2, 9)

    let initialChannel = {  id:channelId,
                              name:'drums',
                              sampleType:'drumPad',
                              hypermeasures: [] }



      //creating empty 2d matrix to represent grid
      let empty = new Array
      for(i = 0; i < 16; i++){
        empty.push(new Array)
      }

      //to make a more interesting start\

      for(i = 0; i < 16; i++){
        empty[i].push('hat')
      }

      empty[0].push('kick')
      empty[3].push('kick')
      empty[7].push('kick')
      empty[11].push('kick')
      empty[14].push('kick')
      empty[4].push('snare')
      empty[12].push('snare')
      empty[1].push('tom')
      empty[9].push('tom')

      let hmId = Math.random().toString(36).substr(2, 9)

      initialChannel.hypermeasures.push({
          id: hmId,
          size: 16,
          instruments: ['kick', 'snare', 'tom', 'hat'],
          notes: empty,
          name: 'premade'
        })

      return initialChannel
  }

  function addHypermeasure(channelId){

    let loopId = Math.random().toString(36).substr(2, 9)
    let sampleType = ''
    let index = -1


    for(i = 0; i < channels.length; i++){
      if(channels[i].id === channelId){
        sampleType = channels[i].sampleType
        index = i
      }
    }

    //creating empty array of arrays (2d matrix)
    let empty = new Array
    for(i = 0; i < 16; i++){
      empty.push(new Array)
    }

    if(sampleType === 'drumPad'){

      channels[index].hypermeasures.push({
          id: loopId,
          size: 16,
          instruments: ['kick', 'snare', 'tom', 'hat'],
          notes: empty,
          name: 'newLoop'
      })
    } else if (sampleType === 'pianoRoll') {

      channels[index].hypermeasures.push({
          id: loopId,
          size: 16,
          notes: empty,
          name: 'newLoop'
      })
    }

    return loopId

    updateLater()

  }

  function addInstrument(instrum) {
    let channelId = Math.random().toString(36).substr(2, 9)


      var newChannel = {  id:channelId,
                              name: instrum.slice(-6,instrum.length),
                              instrument: instrum,
                              sampleType: 'pianoRoll',
                              hypermeasures: [] }


     channels.push(newChannel)                       

     updateLater()
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
    //console.log('play note')

    // console.log(note)
    // console.log(instrument)


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

    setTimeout(sourceBuffer.start(), 500)
    
  }

  function stop() {
    for(i = 0; i < beatWait.length; i++){
      clearTimeout(beatWait[i])
    }
    beatWait = []
  }

  function updateLater() { setTimeout(() => view.update(),  20) }
  
  // done because of likely bug in audio api
  // where view.set overstimulates audio
  // so temporarily turn off flint

  function renderAudio(i) {

    //console.log(i)

    concentratedNotes.map(channel => {
      if(channel.sampleType == 'drumPad'){
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
    
    for(i = 0; i < channels.length; i++){

      let empty = []
      for(j = 0; j < 16; j++){
        empty.push(new Array)
      }

      if(channels[i].sampleType === 'drumPad'){
        concentratedNotes.push({
          sampleType: channels[i].sampleType, 
          notes: empty
        })        
      } else if(channels[i].sampleType === 'pianoRoll'){
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
    if(playingBeat === 15){
      playingBeat = 0
    }else {
      playingBeat++
    }

    renderAudio(playingBeat)

    if(playingBeat >= 15){
      loadCurrentHypermeasures()
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
    speed = 60000 / bpm /2
    view.update()
  }

  function onUpdateTs(newTs) {
    console.log('new ts is', newTs)
    ts = newTs
    xSquares = ts.top * measures
    view.update()
  }



  <Header {...{
    bpm, speed, runState,
    onChangeBpm,
    onPlay, onPause, onStop
  }} />
  <Studio {...{
    speed, playPrecussion, checkedHypermeasures,
    playingBeat, playNote, channels,
    toggleChecked, toggleNote, 
    addHypermeasure, addInstrument
  }} />

  //<h1>Main</h1>


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
