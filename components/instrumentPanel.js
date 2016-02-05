import { addHypermeasure } from '../actions/actions'

view InstrumentPanel {

  prop store
  prop switchToDrumpad
  prop viewState
  prop switchToTimeline
  prop isChecked
  prop toggleChecked
  prop channels


  let channelIds = []  
  on.props(() => {
    channels.map( x => {
      channelIds.push(x.id)
    })
  })


  console.log(channelIds)

  function addInstrumentLoop(sampleType, channelId) {
    let hm = {}
    if(sampleType === 'drumpad'){
      //TODO: make addHypermeasure work on redux end
      hm = store.dispatch(addHypermeasure(channelId)) 
      switchToDrumpad(hm.loopId)
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
        <tr repeat={channels} >
          <td key={_.name}> {_.name} </td>
          {_.hypermeasures.map( i =>
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

    <another>
      another one
    </another>

  </instrumentPanel>


  $back = {
    color: 'white'
  }

}
