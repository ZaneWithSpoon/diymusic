import { range } from 'lodash'

view LiveTrack {

  let rows = Math.floor(window.innerHeight/100)
  let looping = range(40)


  <table>
    <thead>
      <tr>
        <th>
          <TimelineTicker />
        </th>
      </tr>
    </thead>
    <tbody>
      <tr repeat={rows} >
        {looping.map(i =>
          <td key = {i}>
            <TimelineSquares row={_} index={i}/>
          </td>
        )}
      </tr>
    </tbody>
  </table>


  $table = {
    borderSpacing: 0
  }

  $td = {
    padding: 0
  }

}

view TimelineTicker {

  <tick>
    tock
  </tick>

}