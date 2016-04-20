view Hypermeasures {

  //TODO: figure out why fixed width makes things dissappear forever...

  prop loop
  prop focus
  prop toggleChecked
  prop removeHypermeasure
  prop renameHypermeasure
  prop checked


  let dropdown = false
  let height = 50
  let bottomBorder = 0
  let color = '#1CCAD8'

  
  function remove() {

    color = '#1CCAD8'
    dropdown = false
    height = 50
    bottomBorder = 0

    removeHypermeasure()
  }


  function changeChecked(id) {

    if(!checked){
      color = '#1CCAD8'
    } else {
      color = '#629093'
    }

    toggleChecked(id)

  }

  function showBox() {
    if(dropdown){
      height = 50
      bottomBorder = 0
      dropdown = false
    } else {
      height = 100
      bottomBorder = 1
      dropdown = true
    }
  }

  <loops>

    <occupiedSlot draggable='true'>

      <selectDiv onClick={focus} >
        {loop.name}
      </selectDiv>
      <optionsDiv>
        <checkDiv onClick={() => {changeChecked(loop.id)}}>
          <img if={checked} src="../assets/basic-ui/png/basic14.png" draggable='false' height='75%' width='75%'/>
        </checkDiv>
        <menuDiv onClick={() => {showBox()}}>
          .....
        </menuDiv>
      </optionsDiv>

    <dropdown if={dropdown}>
      <rename onClick={() => {renameHypermeasure()}}>
        rename
      </rename>
      <remove onClick={() => {remove()}}>
        delete
      </remove>
    </dropdown>

    </occupiedSlot>



  </loops>


  $dropdown = {
    marginTop: 50,
    height: 50,
    borderTop: 'solid',
    borderWidth: 1
  }

  $rename = {
    borderBottom: 'solid',
    borderWidth: 1    
  }

  $selectDiv = {
    height: 50,
    display: 'inline',
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
    background: color,
    border: 'solid',
    borderRadius: 5,
    borderWidth: 1,
    borderColor: 'black',
    height: height
    }

}
