import { range } from 'lodash';

view DrumPad {
  prop store
  prop id
  prop playPrecussion
  prop playingBeat

  let currentInstruments = ['kick', 'snare', 'tom', 'hat']
  let x = 16
  let looping = range(x)
  let thing, hmi, hmData = {}




  on.props(() => {
    thing = store.getState().hypermeasures.map(function(x) { return x.id })
    hmi = thing.indexOf(id)
    hmData = store.getState().hypermeasures[hmi]
  })
  

  <drumPad>
    <title>
      {hmData.name}
    </title>
   <table>
     <tbody>
       <tr repeat={currentInstruments} >
         <td class='instruments' onClick={() => playPrecussion(_) }> {_} </td>
         {looping.map(i =>
            <td key = {i}>
              <ClickableSquare playingBeat={playingBeat} store={store} data={hmData} instrument={_} index={i} id={id}/>
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
