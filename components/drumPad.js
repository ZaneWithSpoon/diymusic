import { range } from 'lodash';

view DrumPad {
  prop store
  prop measures
  prop ts
  prop id
  prop playPrecussion
  prop playingBeat
  prop switchToStudio

  let currentInstruments = ['kick', 'snare', 'tom', 'hat']
  let x = measures * ts.top
  let looping = range(x)

  <drumPad>
    <title>
      Name
    </title>
    <back  onClick={switchToStudio}>
      back
    </back>
   <table>
     <tbody>
       <tr repeat={currentInstruments} >
         <td class='instruments' onClick={() => playPrecussion(_) }> {_} </td>
         {looping.map(i =>
            <td key = {i}>
              <ClickableSquare playingBeat={playingBeat} store={store} instrument={_} index={i} id={id}/>
            </td>
          )}
       </tr>
     </tbody>
   </table>
  </drumPad>


  $table = {
    borderSpacing: 0,
    marginLeft: 10,
    width: '98%'
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
