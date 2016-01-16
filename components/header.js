view Header {
  prop onChangeBpm
  prop onUpdateTs
  prop ts
  prop runState
  prop onPause
  prop onStop
  prop onToggleRepeat
  prop onPlay
  prop bpm

  let newBpm = 0
  let newTs = { top: ts.top, bottom: ts.bottom }

  function updateTs() {
    // + to cast string to int
    onUpdateTs({ top: +newTs.top, bottom: +newTs.bottom })
  }

  <header>
    <box>
    	<title>diym</title>
    </box>
    <box>
      <li>
        <button if={runState != 'PLAYING'} onClick={onPlay}>play</button>
        <button if={runState == 'PLAYING'} onClick={onPause}>pause</button>
        <button onClick={onStop}>stop</button>
      </li>
      <button class='checkbox' onClick={onToggleRepeat} /> Repeat
    </box>
    <box>
      <bpm>bpm: {bpm}</bpm>
    	<bpm>bpm:
    		<input placeholder={bpm} sync={newBpm} onEnter={() => onChangeBpm(+newBpm)} />
    	</bpm>
      <newBpm>New BPM: {newBpm}</newBpm>
    </box>
    <box>
      Time Signiature:
    </box>
    <box>
      <ts>{ts.top}</ts>
      <ts>{ts.bottom}</ts>
    </box>
    <box>
      <ts>
        <input placeholder={ts.top} sync={newTs.top} onEnter={updateTs} />
      </ts>
      <ts>
        <input placeholder={ts.bottom} sync={newTs.bottom} onEnter={updateTs} />
      </ts>
    </box>
    <boxNoFloat>
      New TS
      <ts>{newTs.top}</ts>
      <ts>{newTs.bottom}</ts>
    </boxNoFloat>
  </header>

  $title = { fontSize: 40 }
  $box = { float: 'left', margin: 10 }
}
