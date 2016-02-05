import { addHypermeasure } from '../actions/actions'

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
      if(currentInstruments.indexOf(x.name) === -1){
        currentInstruments.push(x.name)
      }
    }
  )

  console.log(instrumentPanelData)

  function addInstrumentLoop(sampleType, id) {
    let hm = {}
    if(sampleType === 'drumpad'){
      //TODO: make addHypermeasure work on redux end
      hm = store.dispatch(addHypermeasure(id)) 

      console.log(hm)

      switchToDrumpad(hm.id)
    } else {
      console.log(instrument)
    }
  }


  <instrumentPanel>

    <back if={viewState !== 'tl'} onClick={switchToTimeline}>
      back
    </back>
    <title>instrument panel </title>
    <table>
      <tbody>
        <tr repeat={instrumentPanelData} >
          <td key={_.name}>{_.name}</td>
          {_.hypermeasures.map(i =>
            <td key={i.id} >
              <Hypermeasures 
                loop={i}
                focus={() => {switchToDrumpad(i.id)}}
                options={() => {console.log('options')}}
                checked={isChecked(i.id)}
                toggleChecked={toggleChecked}/>
            </td>
          )}
          <td onClick={() => addInstrumentLoop(_.sampleType, _.id)}>
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
