import { addHypermeasure, addInstrument } from '../actions/actions'
import jquery from 'jquery'


view InstrumentPanel {

  prop store
  prop changeFocus
  prop viewState
  prop switchToTimeline
  prop isChecked
  prop toggleChecked
  prop channels

  let newInstrum = false
  let chosenInstrum = ''
  let options = []

  let channelIds = []  
  on.props(() => {
    channels.map( x => {
      channelIds.push(x.id)
    })
  })

  jquery.getJSON("../assets/instrumentList.json", function(json) {
    options = json.instruments
  })


  function addInstrumentLoop(sampleType, channelId) {
    let hm = {}
      hm = store.dispatch(addHypermeasure(channelId)) 
      changeFocus(hm.loopId)

  }

  function addChannel(){
    //console.log('Add channel')
    newInstrum = true

  }

  function chooseInstrum(instrum){
    newInstrum = false
    var back = store.dispatch(addInstrument(instrum))
  }


  <instrumentPanel>
  {/*
    <back if={viewState !== 'tl'} onClick={switchToTimeline}>
      back
    </back>
  */}
    <title>Instrument panel </title>
    <table>
      <tbody>
        <tr repeat={channels} >
          <td class={'instrumTitle'} key={_.name}> {_.name} </td>
          {_.hypermeasures.map( i =>
            <td key={i.id} >
              <Hypermeasures 
                loop={i}
                focus={() => {changeFocus(i.id)}}
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
      click here to add more instruments
    </another>

    <selecting if={newInstrum}>
      pick an instrument
      <possibilities repeat={options} onClick={() => chooseInstrum(_)}>
        {_}
      </possibilities>
    </selecting>

  </instrumentPanel>


  $back = {
    color: 'white'
  }

  //TODO: make the size of titles fixed
  //undo shitty naming in actions
  $instrumTitle = {
    width: 100,
    wordWrap: 'break-word'
  }

}
