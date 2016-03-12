import { range } from 'lodash';


view PianoRoll {
  prop store
  prop focusedMeasure
  prop playNote
  prop playingBeat
  prop channelId

  //TODO: reorder notes
  let currentInstruments = ['C5', 'B4', 'A#4', 'A4', 'G#4', 'G4', 'F#4', 'F4', 'E4', 'D#4', 'D4', 'C#4', 'C4' ]
  let looping = range(16)
  let thing, hmi, hmData = {}
  let newName = ''
  let changingName = false


  console.log(focusedMeasure)
  console.log(playingBeat)
  console.log(channelId)


  function toggleNameChange(){
    changingName = !changingName
  }

  function changeName(newName){
    console.log(newName)
    changingName = !changingName
    if(newName != '')
      hmData.name = newName
  
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

  // function toggleActive(index, instrument) {
  //   store.dispatch(toggleNote(channelId, focusedMeasure.id, index, instrument))
  // }

  function toggleActive(index, instrument) {

    if(getClass(index, instrument) != 'clicked') {
      console.log('noteAdd')
      store.dispatch(addBeatNote(id, instrument, index))
      hmData.notes[index].push(instrument)
    } else {
      console.log('noteRemove')
      store.dispatch(removeBeatNote(id, instrument, index))
      var instIndex = currentInstruments.indexOf(instrument)
      hmData.notes[index].splice(instIndex, 1)
    }

  }

  <pianoRoll>
   <title if={!changingName} onClick={toggleNameChange}>
      {focusedMeasure.name}
    </title>
    <titleChange if={changingName}>
      <input defaultValue={focusedMeasure.name} sync={newName} onEnter={() => changeName(newName)} />
    </titleChange>
   <table>
     <tbody>
       <tr repeat={currentInstruments} >
         <td class={setColor(_)} onClick={() => playNote(_, 'acoustic_grand_piano') }> {_} </td>
         {looping.map(i =>
            <td key = {i} onClick={() => toggleActive( i, _ )}>
              <ClickableSquare className={getClass( i, _ )}/>
            </td>
          )}
       </tr>
     </tbody>
   </table>
  </pianoRoll>

  

  function setColor(instrument) {
  if(instrument.indexOf('#') != -1){
      return 'black'
    } else {
      return 'white'
    }
  }


  $table = {
    borderSpacing: 0,
    width: '100%'
  }

  $tableWrap = {
    height: 575,
    overflow: 'auto'
  }

  $instruments = {
    border: 'solid',
    borderWidth: 1,
    width: 60
  }
  $white = {
    background: 'white',
    width: 75,
    border: 'solid'
  }
  $black = {
    background: 'black',
    color: 'white',
    width: 5,
    border: 'solid'


  }

  $td = {
    padding: 0
  }

  $tr = {
    padding: 0
  }
}