import { addHypermeasure, addInstrument } from '../actions/actions'

view InstrumentPanel {

  prop store
  prop switchToDrumpad
  prop switchToPianoRoll
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


  //console.log(channelIds)

  function addInstrumentLoop(sampleType, channelId) {
    let hm = {}
    if(sampleType === 'drumpad'){
      hm = store.dispatch(addHypermeasure(channelId)) 
      switchToDrumpad(hm.loopId)
    } else {
      hm = store.dispatch(addHypermeasure(channelId))
      switchToPianoRoll(hm.loopId)
    }
  }

  function addChannel(){
    console.log('Add channel')

    //change this to allow for more instruments
    var back = store.dispatch(addInstrument('xylophone'))
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

    <another onClick={() => addChannel()}>
      click here to add piano
    </another>

  </instrumentPanel>


  $back = {
    color: 'white'
  }

}
