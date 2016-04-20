view Header {
  prop onChangeBpm
  prop runState
  prop onPause
  prop onStop
  prop onToggleRepeat
  prop onPlay
  prop bpm

  let newBpm = 0

  function clicked(){
    console.log("clicked")
    view.update()
  }


  <header>
    <box>
    	<title onClick={clicked}>diym</title>
    </box>
    <box>
      <li>
        <button if={runState != 'PLAYING'} onClick={onPlay}>play</button>
        <button if={runState == 'PLAYING'} onClick={onPause}>pause</button>
        <button onClick={onStop}>stop</button>
      </li>
      {/*
        <input type='checkbox' onChange={onToggleRepeat} /> Repeat
      */}
    </box>
    <boxNoFloat>
      <bpm>bpm: {bpm}</bpm>
    	<bpm>bpm:
    		<input placeholder={bpm} sync={newBpm} onEnter={() => onChangeBpm(+newBpm)} />
    	</bpm>
      <newBpm>New BPM: {newBpm}</newBpm>
    </boxNoFloat>
  </header>

  $title = { fontSize: 40 }
  $box = { float: 'left', margin: 10 }
  $checkbox = { checked: true }
}
