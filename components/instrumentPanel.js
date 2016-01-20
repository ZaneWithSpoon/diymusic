import { addBeatHypermeasure } from '../actions/actions'

view InstrumentPanel {

  prop store
  prop switchToDrumpad
  prop viewState
  prop switchToTimeline

  let instrumentPanelData = store.getState().instrumentPanel


  let currentInstruments = []
  instrumentPanelData.map( x => {
      if(currentInstruments.indexOf(x.instrument) === -1){
        currentInstruments.push(x.instrument)
      }
    }
  )

  function addInstrumentLoop(instrument) {
    let hm = {}
    if(instrument === 'drums'){
      hm = store.dispatch(addBeatHypermeasure())

      let thing = instrumentPanelData.map(function(x) { return x.instrument })
      let index = thing.indexOf(instrument)
      if(hm != {}){
        instrumentPanelData[index].loops.push(hm)
      }
      switchToDrumpad(hm.id)  

    } else {
      console.log('else')
    }


  }


  <instrumentPanel>

    <back if={viewState === 'dp'} onClick={switchToTimeline}>
      back
    </back>
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
                loop={i.loops[_]}
                instrument={i.instrument}
                switchToDrumpad={switchToDrumpad}
                addInstrumentLoop={addInstrumentLoop}
                add/>
            </td>
          )}
        </tr>
      </tbody>
    </table>

  </instrumentPanel>


  $back = {
    color: 'white'
  }


}
