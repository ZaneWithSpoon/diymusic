import { addPremadeBeatHypermeasure } from '../actions/actions'

view Studio { 

  prop store
  prop speed
  prop repeating
  prop playPrecussion
  prop playNote
  prop playingBeat
  prop playHypermeasures

  //TODO: make a way to update names in instrument panel
  //when changes in drumpad and vice versa

  let id = store.dispatch(addPremadeBeatHypermeasure())
  let checkedHypermeasures = [id]

  let studioLoops = store.getState()
  console.log(studioLoops)


  function switchToDrumpad(newID) {
    id = newID
    viewState = 'dp'
  }

  function switchToPianoRoll(newID) {
    id = newID
    viewState = 'pr'
  }

  function switchToTimeline() {
    viewState = 'tl'
  }

  function toggleChecked(id) {
    let index = checkedHypermeasures.indexOf(id)
    if(index != -1) {
      checkedHypermeasures.splice(index, 1)
    } else {
      checkedHypermeasures.push(id)
    }
  }

  function isChecked(id) {
    if(checkedHypermeasures.indexOf(id) != -1){
      return true
    } else {
      return false
    }
  }

  let liveTracks = [0,1,2]
  let squares = Math.floor(window.innerHeight/100)
  let height = squares*50+24

  let viewState = 'pr'


  <studio>
    <timeline if={viewState == 'tl'}>
      <Timeline />
    </timeline>
    <instrumentPanel>
      <InstrumentPanel{...{
        isChecked, toggleChecked,
        switchToDrumpad, viewState,
        switchToTimeline, store,
        switchToPianoRoll
      }} />
    </instrumentPanel>

    <DrumPad if={viewState == 'dp'}{...{
      store, id, speed, repeating, playPrecussion,
      playingBeat
    }} />

    <PianoRoll if={viewState == 'pr'}{...{
      store, id, speed, repeating, playNote,
      playingBeat
    }} />

  </studio>

  $timeline = {
    float: 'left',
    width: window.innerWidth-320,
    overflowX: 'auto'
  }

  $instrumentPanel = {
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
