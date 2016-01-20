view Studio { 

  prop instrumentPanelData
  prop switchToDrumpad

  let liveTracks = [0,1,2]
  let squares = Math.floor(window.innerHeight/100)
  let height = squares*50+24


  <total>
    <title>Studio</title>
    <timeline>
      <LiveTrack />
    </timeline>
    <instrumentPanel>
      <InstrumentPanel{...{
        instrumentPanelData, switchToDrumpad
      }} />
    </instrumentPanel>
  </total>

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
    height: height,
    width: 320,
    overflow: 'auto'
  }

}

view InstrumentPanel {

  prop instrumentPanelData
  prop switchToDrumpad

  let currentInstruments = []
  instrumentPanelData.map( x =>
    currentInstruments.push(x.instrument)
  )


  <instrumentPanel>

    <title>instrument panel </title>

    <table>
      <thead>
        <tr>
          <td repeat = {currentInstruments}>
            {_}
          </td>
        </tr>
      </thead>
      <tbody>
        <tr repeat={[0,1,2,3,4,5]} >
          {instrumentPanelData.map(i =>
            <td key={i.instrument}>
              <Hypermeasures 
                loops={i.loops} 
                yIndex={_} 
                switchToDrumpad={switchToDrumpad}/>
            </td>
          )}
        </tr>
      </tbody>
    </table>

  </instrumentPanel>


}

view Hypermeasures {

  prop loops
  prop yIndex
  prop switchToDrumpad

  function selectedDrum() {
    switchToDrumpad(loops[yIndex])
  }

  <loops>

    <occupiedSlot 
      draggable='true' 
      if={loops[yIndex] != undefined}
      onClick={selectedDrum}>
      {loops[yIndex]}
    </occupiedSlot>

    <addButton  if={loops[yIndex] == undefined}>
      <img src="../assets/basic-ui/png/add.png" draggable='false' height='30' width='30'/>
    </addButton>

  </loops>


  $occupiedSlot = {
    draggable: 'true',
    background: '#1CCAD8',
    border: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    width: 100
  }

  $addButton = {
    background: 'lightgrey',
    border: 'dashed',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    width: 100
  }

  $img = {
    draggable: 'false',
    display: 'block',
    margin: 'auto',
    marginTop: 10,
    verticalAlign:'middle'
  }

}
