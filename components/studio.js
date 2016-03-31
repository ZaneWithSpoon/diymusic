import { addPremadeBeatHypermeasure, addInstrument } from '../actions/actions'

view Studio { 

  prop store
  prop speed
  prop repeating
  prop playPrecussion
  prop playNote
  prop playingBeat
  prop checkedHypermeasures
  prop toggleChecked
  prop channels

  //TODO: make a way to update names in instrument panel
  //when changes in drumpad and vice versa

  let id = store.dispatch(addPremadeBeatHypermeasure())
  let focusedMeasure = setFocusedMeasure(id)
  toggleChecked(id)
  let focusedChannelId = ''
  let instrument = ''

  store.dispatch(addInstrument('acoustic_grand_piano'))

  on.props(() => {
    focusedMeasure = setFocusedMeasure(id)
  }) 

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
    <InstrumentPanel {...{store, 
      changeFocus, switchToTimeline,
      viewState, isChecked, toggleChecked,
      channels
    }} />
    <DrumPad if={viewState == 'dp'} {...{store,
      focusedMeasure, playPrecussion,
      playingBeat, channelId: focusedChannelId
    }} />
    <PianoRoll if={viewState == 'pr'} {...{store,
      focusedMeasure, playNote, instrument,
      playingBeat, channelId: focusedChannelId
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
