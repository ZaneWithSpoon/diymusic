view DrumPad {

  require(['lodash'], function(_) {});

  let currentInstruments = ['kick', 'snare', 'tom', 'hat']
  let x = view.props.measures * view.props.ts.top



  function oddClick(e) {
    console.log(e);
  }
  function evenClick(e) {
    console.log(e);
  }


  <drumPad>
  	<title>
  		Drum pad
  	</title>
  	<table>
  		<tbody>
  			<tr repeat={currentInstruments} >
          <td> {_} </td>

          {_.range({x}).map(i =>
            <div>
              <td if={Math.floor(_index / 4) % 2 == 0} 
                class='even'
                onClick={evenClick}> 
                  {_index} 
              </td>
              <td if={Math.floor(_index / 4) % 2 == 1} 
                class='odd'
                onClick={oddClick}> 
                  {_index} 
              </td>
            </div>
          )}

  			</tr>
  		</tbody>
  	</table>
  </drumPad>


  $tr = {
    width: 600
  }

  $td = { 
    margin: 0,
    width: 40,
    height: 25,
    border: 'solid',
    borderWidth: 1,
    borderRadius: 2
  }

  $measures = {
    float: 'left'
  }

  $even = {
    background: 'darkGray'
  }

  $odd = {
    background: 'gray'
  }
}