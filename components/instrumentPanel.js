import { addBeatHypermeasure } from '../actions/actions'

view InstrumentPanel {

  prop store
  prop switchToDrumpad
  prop viewState
  prop switchToTimeline
  prop isChecked
  prop toggleChecked
  prop instrumentPanelData

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
      <tbody>
        <tr repeat={instrumentPanelData} >
          <td key={_.instrument}>{_.instrument}</td>
          {_.loops.map(i =>
            <td key={i.id} >
              <Hypermeasures 
                loop={i}
                focus={() => {switchToDrumpad(i.id)}}
                options={() => {console.log('options')}}
                checked={isChecked(i.id)}
                toggleChecked={toggleChecked}/>
            </td>
          )}
          <td onClick={() => addInstrumentLoop(_.instrument)}>
            <Hypermeasures
              loop='undefined'
              instrument={_.instrument}/>
          </td>
        </tr>
      </tbody>
    </table>

  </instrumentPanel>


  $back = {
    color: 'white'
  }


}
