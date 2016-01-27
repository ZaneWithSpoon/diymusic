import { range } from 'lodash';
import { addBeatNote, removeBeatNote } from '../actions/actions'


view DrumPad {
  prop store
  prop id
  prop playPrecussion
  prop playingBeat
  prop updateName

  let currentInstruments = ['kick', 'snare', 'tom', 'hat']
  let x = 16
  let looping = range(x)
  let thing, hmi, hmData = {}
  let newName = ''
  let changingName = false

  on.props(() => {
    thing = store.getState().hypermeasures.map(({ id }) => id)
    hmi = thing.indexOf(id)
    hmData = store.getState().hypermeasures[hmi]
  })

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
    let indexArray = hmData.notes[index]

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

  <drumPad>
    <title if={!changingName} onClick={toggleNameChange}>
      {hmData.name}
    </title>
    <titleChange if={changingName}>
      <input defaultValue={hmData.name} sync={newName} onEnter={() => changeName(newName)} />
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
