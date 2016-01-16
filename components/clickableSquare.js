import { addBeatNote, removeBeatNote } from '../actions/actions'


view ClickableSquare {
  prop id
  prop index
  prop instrument
  prop store
  prop playingBeat

  let active = false


  let thing = store.getState().hypermeasures.map(function(x) { return x.id })
  let hmi = thing.indexOf(id)
  let indexArray = store.getState().hypermeasures[hmi].notes[index]
  
 // console.log(store.getState().hypermeasures[hmi].notes[index])
  if(indexArray.none(instrument)){
    active = false
  } else {
    active = true
  }


  function getClass(index) {
    if(index == playingBeat){
      return 'playing'
    } else {
      const odd = Math.floor(index / 4) % 2 == 0
      return odd ? 'odd' : 'even'
    }
  }

  //todo: use redux to change playable music state
  function toggleActive() {
    if(!active)
      store.dispatch(addBeatNote(id, instrument, index))
    else
      store.dispatch(removeBeatNote(id, instrument, index))

    active = !active
  }

  <block class={active ? 'clicked' : getClass(index)} onClick={toggleActive} />

  $even = {
    background: 'darkGray'
  }

  $odd = {
    background: 'gray'
  }

  $clicked = {
    background: 'yellow'
  }

  $playing = {
    background: '#f86624'
  }

  $block = {
    margin: 0,
    height: 25,
    border: 'solid',
    borderWidth: 1,
  }
}
