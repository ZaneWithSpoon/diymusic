//import { addPremadeBeatHypermeasure, addInstrument } from '../actions/actions'

view Studio { 

  prop speed
  prop repeating
  prop playPrecussion
  prop playNote
  prop playingBeat
  prop checkedHypermeasures
  prop toggleChecked
  prop channels
  prop toggleNote

  prop addHypermeasure
  prop removeHypermeasure
  prop renameHypermeasure
  prop addInstrument


  let squares = Math.floor(window.innerHeight/100)
  let height = squares*50+24

  let viewState = ''

  //TODO: make a way to update names in instrument panel
  //when changes in drumpad and vice versa

  console.log(channels[0].hypermeasures[0])

  if(channels[0].hypermeasures[0] !== undefined){
    let focusedChannelId = channels[0].id
    let focusedMeasure = channels[0].hypermeasures[0]
    let focusedId = focusedMeasure.id

    changeFocus(focusedId)
  } else {
    //[0]viewState = ''
  }

  

  //console.log(focusedId)
  

  //console.log(focusedChannelId)

  function setFocusedMeasure(newId) {
    //console.log(newId)

    let temp = {}
    channels.map( channel => {
      channel.hypermeasures.map( loop => {
        if(loop.id === newId){

          //console.log(channel)

          temp = loop
          focusedChannelId = channel.id
          instrument = channel.instrument

        }
      })
    })
    return temp
  }

  function changeFocus(newID) {
    console.log(newID)
    id = newID
    focusedMeasure = setFocusedMeasure(id)
    focusedId = focusedMeasure.id

    //console.log(instrument)

    if(instrument == undefined)
      viewState = 'dp'
    else
      viewState = 'pr'


    //console.log(viewState)
  }


  function switchToTimeline() {
    viewState = 'tl'
  }

  function isChecked(id) {
    //console.log("is checked " + id)
    if(checkedHypermeasures.indexOf(id) !== -1){
      return true
    } else {
      return false
    }
  }

  function remove(channelId, loopId) {
    console.log("remove stuff")
    // console.log(focusedId)
    // console.log(loopId)

    if(loopId === focusedId){
      console.log(checkedHypermeasures.length)
      if(checkedHypermeasures.length <= 1){
        viewState = ''
      } else {
        if(checkedHypermeasures[0] === loopId){
          changeFocus(checkedHypermeasures[1])
        } else {
          changeFocus(checkedHypermeasures[0])
        }
        
      }
    }

    removeHypermeasure(channelId, loopId)
  }


  <studio>
     <timeline if={viewState == 'tl'}>
      <Timeline />
    </timeline>
    <InstrumentPanel {...{ 
      changeFocus, switchToTimeline,
      viewState, isChecked, toggleChecked,
      channels, addHypermeasure,  
      renameHypermeasure, addInstrument
    }} removeHypermeasure = {removeHypermeasure} />



    <DrumPad if={viewState == 'dp'} {...{
      focusedMeasure, playPrecussion,
      playingBeat, channelId: focusedChannelId,
      toggleNote
    }} />
    <PianoRoll if={viewState == 'pr'} {...{
      focusedMeasure, playNote, instrument,
      playingBeat, channelId: focusedChannelId,
      toggleNote
    }} />


  </studio>

  $timeline = {
    float: 'left',
    width: window.innerWidth-320,
    overflowX: 'auto'
  }

  $InstrumentPanel = {
    background: 'grey',
    border: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    height: window.innerHeight-80,
    width: 320,
    overflow: 'auto',
    float: 'left'
  }

  $DrumPad = {
    float: 'left',
    width: window.innerWidth-320
  }

  $PianoRoll = {
    float: 'left',
    width: window.innerWidth-320,
    height: window.innerHeight-110,
    overflow: 'auto'
  }

}
