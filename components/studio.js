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
  prop addInstrument

  //TODO: make a way to update names in instrument panel
  //when changes in drumpad and vice versa



  let focusedChannelId = channels[0].id
  let focusedId = channels[0].hypermeasures[0].id
  let focusedMeasure = channels[0].hypermeasures[0]

  //console.log(focusedChannelId)

  function setFocusedMeasure(newId) {
    let temp = {}
    channels.map( channel => {
      channel.hypermeasures.map( loop => {
        if(loop.id === newId){
          temp = loop
          focusedChannelId = channel.id
          instrument = channel.instrument

        }
      })
    })
    return temp
  }

  function changeFocus(newID) {
    //console.log('changeFocus')
    id = newID
    focusedMeasure = setFocusedMeasure(id)
    if(instrument == undefined)
      viewState = 'dp'
    else
      viewState = 'pr'
  }


  function switchToTimeline() {
    viewState = 'tl'
  }

  function isChecked(id) {
    if(checkedHypermeasures.indexOf(id) !== -1){
      return true
    } else {
      return false
    }
  }

  let liveTracks = [0,1,2]
  let squares = Math.floor(window.innerHeight/100)
  let height = squares*50+24

  let viewState = 'dp'


  <studio>
 
    <timeline if={viewState == 'tl'}>
      <Timeline />
    </timeline>
    <InstrumentPanel {...{ 
      changeFocus, switchToTimeline,
      viewState, isChecked, toggleChecked,
      channels, addHypermeasure, addInstrument
    }} />



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
