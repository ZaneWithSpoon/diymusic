import { range } from 'lodash';



view PianoRoll {
  prop instrument
  prop focusedMeasure
  prop playNote
  prop playingBeat
  prop channelId
  prop toggleNote


  let currentInstruments = [ 'C7', 'C6', 'C5', 'B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4',  'E4', 'D#4', 'D4', 'C#4', 'C4', 'C3', 'C2', 'C1']
  let x = 16
  let looping = range(x)

  let thing, hmi, hmData = {}
  let newName = ''
  let changingName = false


  function toggleNameChange(){
    changingName = !changingName
  }

  function changeName(newName){
    console.log(newName)
    changingName = !changingName
    if(newName != ''){
      store.dispatch(updateHypermeasureName(focusedMeasure.id, newName))   
    }

  
  }

  function getClass(index, instrument) {
    let indexArray = focusedMeasure.notes[index]

    if(!indexArray.none(instrument)){
      return 'clicked'
    } else if(index == playingBeat){
      return 'playing'
    } else {
      const odd = Math.floor(index / 8) % 2 == 0
      return odd ? 'odd' : 'even'
    }

  }

  function toggleActive(index, instrument) {
    toggleNote(channelId, focusedMeasure.id, index, instrument)
  }

  <pianoRoll>
    <title if={!changingName} onClick={toggleNameChange}>
      {instrument}
    </title>
    <titleChange if={changingName}>
      <input defaultValue={focusedMeasure.name} sync={newName} onEnter={() => changeName(newName)} />

    </titleChange>
   <table>
     <tbody>
       <tr repeat={currentInstruments} >
         <td class='instruments' onClick={() => playNote(_, instrument) }> {_} </td>

         {looping.map(i =>
            <td key = {i} onClick={() => toggleActive( i, _ )}>
              <block class={getClass( i, _ )}/>
            </td>
          )}
       </tr>
     </tbody>
   </table>
  </pianoRoll>


  $table = {
    borderSpacing: 0,
    width: '100%'
  }


  $instruments = {
    border: 'solid',
    borderWidth: 1,
    width: 60
  }


  $td = {
    padding: 0
  }

  $tr = {
    padding: 0
  }




    $even = {
    background: 'darkGray'
  }

  $odd = {
    background: 'gray'
  }

  $clicked = {
    background: '#d81cd8'
  }

  $playing = {
    background: '#FE621D'
  }

  $block = {
    margin: 0,
    height: 50,
    border: 'solid',
    borderWidth: 1,
  }

  
}
