view Main {

  let bpm = 120
  let speed = 60000/bpm
  let repeating = false
  let playing = false
  let ts = {top: 4,
            bottom: 4}

  let matrix = []

  let measures = 4;
  let octaves = 1;
  let xSquares = ts.top * measures
  let ySquares = (octaves * 12) + 1


  for (var b = 0; b < xSquares; b++) {
    matrix[b] = [];
  }


//loading midi.js
// window.onload = function () {
//   MIDI.loadPlugin({
//     soundfontUrl: "./MIDI.js-master/examples/soundfont/",
//     instrument: "acoustic_grand_piano",
//     onprogress: function(state, progress) {
//       console.log(state, progress);
//     },
//     onsuccess: function() {
//       var delay = 0; // play one note every quarter second
//       var note = 50; // the MIDI note
//       var velocity = 127; // how hard the note hits
//       // play the note
//     }
//   });
// };

//play-pause-stop buttons
function playButton(){
  console.log('play')
  playing = true

  // MIDI.setVolume(0, 127);
  // MIDI.noteOn(0, 60, 127, 0);
  // MIDI.noteOff(0, 60, 0 + 0.75);
  // playing = false
}
function pauseButton(){
  console.log('pause')
  playing = false
}
function stopButton(){
  console.log('stop')
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
        speed={speed}
        repeating={repeating}
        ts={ts}
        measures={measures}
        xSquares={xSquares}
        ySquares={ySquares}/>
  </app>

  $app = {
    height: 80,
    background: 'blue'
  }
  $Header = {
    marginBottom: 15
  }
  $Browser = {
    marginRight: 150,
    width: 150,
    height: 1000,
    position: 'fixed',
    background: 'lightBlue'

  }
  $DrumPad = {
    marginLeft: 150
  }
}