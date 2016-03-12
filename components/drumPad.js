import { range } from 'lodash';
import { toggleNote, updateHypermeasureName } from '../actions/actions'


view DrumPad {
  prop store
  prop focusedMeasure
  prop playPrecussion
  prop playingBeat
  prop channelId

  let currentInstruments = ['kick', 'snare', 'tom', 'hat']
  let x = 16
  let looping = range(x)
  let thing, hmi, hmData = {}
  let newName = ''
  let changingName = false

  //console.log("meas")
  console.log(focusedMeasure)
  //console.log("play")
  //console.log(playingBeat)
 // console.log("chan")
 // console.log(channelId) 

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
    store.dispatch(toggleNote(channelId, focusedMeasure.id, index, instrument))
  }

  <drumPad>
    <title if={!changingName} onClick={toggleNameChange}>
      {focusedMeasure.name}
    </title>
    <titleChange if={changingName}>
      <input defaultValue={focusedMeasure.name} sync={newName} onEnter={() => changeName(newName)} />
    </titleChange>
   <table>
     <tbody>
       <tr repeat={currentInstruments} >
         <td class='instruments' onClick={() => playPrecussion(_) }> {_} </td>
         {looping.map(i =>
            <td key = {i} onClick={() => toggleActive( i, _ )}>
              <ClickableSquare className={getClass( i, _ )}/>
            </td>
          )}
       </tr>
     </tbody>
   </table>
  </drumPad>

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
}
