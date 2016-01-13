import lodash from 'lodash';


view DrumPad {


  let currentInstruments = ['kick', 'snare', 'tom', 'hat']
  let x = view.props.measures * view.props.ts.top
  let looping = _.range(x)

  function oddClick(e) {
    console.log(e)
  }
  function evenClick(e) {
    console.log(e)
  }


  <drumPad>
    <title>
      Drum pad
    </title>
   <table>
     <tbody>
       <tr repeat={currentInstruments} >
          <td class='instruments'> {_} </td>

         {looping.map(i =>
            <td key = {i}> 
              <ClickableSquare instrument={_} index={i} id={view.props.id}/>
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
