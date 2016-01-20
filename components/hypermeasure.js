view Hypermeasures {

  prop loop
  prop instrument
  prop switchToDrumpad
  prop addInstrumentLoop

  <loops>

    <occupiedSlot 
      draggable='true' 
      if={loop != undefined}
      onClick={() => switchToDrumpad(loop.id)}>
      {loop.name}
    </occupiedSlot>

    <addButton  if={loop == undefined && instrument == 'drums'}
      onClick={() => addInstrumentLoop(instrument)}>
      <img src="../assets/basic-ui/png/add.png" draggable='false' height='30' width='30'/>
    </addButton>

    <addButton  if={loop == undefined && instrument != 'drums'}
      onClick={() => addInstrumentLoop(instrument)}>
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
