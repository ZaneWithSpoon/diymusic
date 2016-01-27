view Hypermeasures {

  prop loop
  prop focus
  prop toggleChecked
  prop options
  prop checked

  <loops>

    <occupiedSlot 
      draggable='true' 
      if={loop != 'undefined'}>

      <selectDiv onClick={focus}>
        {loop.name}
      </selectDiv>
      <optionsDiv>
        <checkDiv onClick={toggleChecked}>
          <img src="../assets/basic-ui/png/basic14.png" draggable='false' height='75%' width='75%'/>
        </checkDiv>
        <menuDiv onClick={options}>
          ......
        </menuDiv>
      </optionsDiv>

    </occupiedSlot>

    <addButton  if={loop == 'undefined'}>
      <img class='plus' src="../assets/basic-ui/png/add.png" draggable='false' height='30' width='30'/>
    </addButton>

  </loops>

  $selectDiv = {
    height: '100%',
    width: '70%',
    float: 'left'
  }

  $checkDiv = {
    height: '50%',
    borderBottom: 'solid',
    borderWidth: 1
  }

  $optionsDiv = {
    borderLeft: 'solid',
    borderWidth: 1,
    width: '30%',
    height: 50,
    float: 'left'
  }


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

  $plus = {
    draggable: 'false',
    display: 'block',
    margin: 'auto',
    marginTop: 10,
    verticalAlign:'middle'
  }

}
