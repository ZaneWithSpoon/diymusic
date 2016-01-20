view Studio { 

  prop store
  prop speed
  prop repeating
  prop playPrecussion
  prop playingBeat


  let id = ''


  function switchToDrumpad(newID) {
    id = newID
    viewState = 'dp'
  }

  function switchToTimeline() {
    viewState = 'tl'
  }

  let liveTracks = [0,1,2]
  let squares = Math.floor(window.innerHeight/100)
  let height = squares*50+24

  let viewState = 'tl'


  <studio>
    <timeline if={viewState == 'tl'}>
      <Timeline />
    </timeline>
    <instrumentPanel>
      <InstrumentPanel{...{
        switchToDrumpad, viewState,
        switchToTimeline, store
      }} />
    </instrumentPanel>

    <DrumPad if={viewState == 'dp'}{...{
      store, id, speed, repeating, playPrecussion,
      playingBeat, switchToTimeline
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
    float: 'left',
    marginTop: -6
  }

  $DrumPad = {
    float: 'left',
    width: window.innerWidth-320
  }

}
