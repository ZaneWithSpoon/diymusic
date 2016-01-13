//diym ( diy music ) built by Zane Witherspoon
 
import { addBeatHypermeasure, addBeatNote, setRunState, RunStates } from '../actions/actions'
import { connect } from 'react-redux'


//main.js 
view Main {

  const { dispatch, runState } = view.props
  
  let id = dispatch(addBeatHypermeasure())
  //let id = 'afs'


  let bpm = 120
  let speed = 60000/bpm
  let repeating = false
  let playing = false
  let ts = {top: 4,
            bottom: 4}


  let measures = 4;
  let octaves = 1;
  let xSquares = ts.top * measures
  let ySquares = (octaves * 12) + 1


//play-pause-stop buttons
function playButton(){
  console.log('playING')
  //store.dispatch(setRunState('PLAYING'))
  playing = true

}
function pauseButton(){
  console.log('pauseED')
  //store.dispatch(setRunState('PAUSED'))
  playing = false
}
function stopButton(){
  console.log('stopjlaflsk')
  //store.dispatch(setRunState('STOPPED'))
  playing = false
}


//change variables 
function changeBpm(newBpm) {
  console.log('changed bpm in func')
  bpm = newBpm
  speed = 60000/bpm
}
function updateTs(newTs) {
  console.log('changed ts in func')
  ts = newTs
  xSquares = ts.top * measures

}
function toggleRepeat() {
  repeating = !repeating
  console.log(repeating)
}
 
  <app>
      <Header 
        bpm={bpm} 
        speed={speed}
        ts = {ts}
        repeating={repeating}
        playing={playing}
        play={playButton}
        pause={pauseButton}
        stop={stopButton}
        changeBpm={changeBpm} 
        toggleRepeat={toggleRepeat}
        updateTs = {updateTs}/>

      <Browser />

      <DrumPad 
        id = {id}
        speed={speed}
        repeating={repeating}
        ts={ts}
        measures={measures}
        xSquares={xSquares}
        ySquares={ySquares}/>
  </app>

  $app = {
    height: 80,
    background: '#33cccc'
  }
  $Header = {
    marginBottom: 15
  }

  $Browser = {
    marginRight: 150,
    width: 150,
    height: 1000,
    position: 'fixed',
    background: '#E49595'

  }
  $DrumPad = {
    marginLeft: 150
  }
}

Main.propTypes = {
  runState: propTypes.oneOf([
    'PLAYING',
    'PAUSED',
    'STOPPED'
  ]).isRequired
}

function select(state) {
  return { runState: state.runState }
}

export default connect(select)(Main)
