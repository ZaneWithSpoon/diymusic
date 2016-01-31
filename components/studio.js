import { addPremadeBeatHypermeasure } from '../actions/actions'

view Studio { 

  prop store
  prop speed
  prop repeating
  prop playPrecussion
  prop playNote
  prop playingBeat
  prop playHypermeasures
  prop channels

  //TODO: make a way to update names in instrument panel
  //when changes in drumpad and vice versa

  //let focusedMeasure = setFocusedMeasure(id)


  //let checkedHypermeasures = [id]
  on.props(() => {
    console.log('studio channels on prop')
    console.log(channels)
  }) 


  let id = store.dispatch(addPremadeBeatHypermeasure())


  function setFocusedMeasure(newId) {
    console.log('setFocusedMeasure')
    channels.map( x => {
      console.log( 'x' )
    })

    return 'bs'
  }

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

  let viewState = 'dp'


  <studio>
    <timeline if={viewState == 'tl'}>
      <Timeline />
    </timeline>

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
