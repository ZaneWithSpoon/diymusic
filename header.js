view Header {

  let newBpm = 0
  // let newTs = {top: view.props.ts.top,
  //               bottom: view.props.ts.bottom}
  let newTsT = 0
  let newTsB = 0
  let newTs = {top: 0, bottom: 0}





  function changeBpm() {
    view.props.changeBpm(newBpm)
  }
  function updateTs() {
    if(newTsT == 0){
      newTs.top = view.props.ts.top
    } else {
      newTs.top = newTsT
    }
    if(newTsB == 0){
      newTs.bottom = view.props.ts.bottom
    } else {
      newTs.bottom = newTsB
    }

    view.props.updateTs(newTs)

  }

  <header>
    <box>
    	<title>diym</title>
    </box>
    <box>
      <li>
        <button if={!view.props.playing} onClick={view.props.play}> play </button> 
        <button if={view.props.playing} onClick={view.props.pause}> pause </button> 
        <button onClick={view.props.stop}> stop </button> 
      </li>
      <button class='checkbox' onClick={view.props.toggleRepeat} /> Repeat
    </box>
    <box>
      <bpm>bpm: {view.props.bpm}</bpm>
    	<bpm>bpm: 
    		<input 
    			placeholder={view.props.bpm} 
    			sync={newBpm}
    			onEnter={changeBpm} />
    	</bpm>
      <newBpm>New BPM: {newBpm}</newBpm>
    </box>
    <box>
      Time Signiature:
    </box>
    <box>
      <ts>{view.props.ts.top}</ts>
      <ts>{view.props.ts.bottom}</ts>
    </box>
    <box>
      <ts>
        <input 
          placeholder={view.props.ts.top} 
          sync={newTsT}
          onEnter={updateTs} />
      </ts>
      <ts>
        <input 
          placeholder={view.props.ts.bottom} 
          sync={newTsB}
          onEnter={updateTs} />
      </ts>
    </box>
    <boxNoFloat>
      New TS
      <ts>{newTsT}</ts>
      <ts>{newTsB}</ts>
    </boxNoFloat>
  </header>

  
  $title = { fontSize: 40 }
  $box = { float: 'left',
            margin: 10 }
}