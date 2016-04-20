import jquery from 'jquery'


view InstrumentPanel {

  prop changeFocus
  prop viewState
  prop switchToTimeline
  prop isChecked
  prop toggleChecked
  prop channels

  prop addHypermeasure
  prop removeHypermeasure
  prop renameHypermeasure
  prop addInstrument

  let newInstrum = false
  let chosenInstrum = ''
  let options = []


  jquery.getJSON("../assets/instrumentList.json", function(json) {
    options = json.instruments
  })

  on.props(() => {
    console.log("instrumentPanel")
    console.log(channels)
  })


  function addInstrumentLoop(channelId) {

    let hmid = addHypermeasure(channelId)
    changeFocus(hmid)

  }

  function remove(channelId, loopId) {
    //console.log("remove " + loopId)
    // console.log(channels)
    removeHypermeasure(channelId, loopId)
  }

  function addChannel(){
    newInstrum = true
  }

  function chooseInstrum(instrum){
    newInstrum = false
    let chanId = addInstrument(instrum)
    addInstrumentLoop(chanId)
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
      {channels.map( _ =>
        <tr id={_.id} key={_.id}>
          <td class={'instrumTitle'} key={_.id}> {_.name} </td>
          {_.hypermeasures.map( i =>
            <td id={i.id} key={i.id} >
              <Hypermeasures 
                loop={i}
                focus={() => {changeFocus(i.id)}}
                dots={() => {dots(i.id)}}
                checked={isChecked(i.id)}
                renameHypermeasure = { () => {renameHypermeasure(_.id, i.id)} }
                removeHypermeasure = { () => {removeHypermeasure(_.id, i.id)} }
                toggleChecked={toggleChecked}/>
            </td>
          )}

          <td class={'addButton'} onClick={() => addInstrumentLoop(_.id)}>
            <img class={'plus'} src="../assets/used-assets/add.png" draggable='false' height='30' width='30'/>
          </td>
        </tr>
      )}
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

  $addButton = {
    background: 'lightgrey',
    border: 'dashed',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    width: 100
  }

  $plus = {
    draggable: 'false',
    display: 'block',
    margin: 'auto',
    marginTop: 10,
    verticalAlign:'middle'
  }

}
