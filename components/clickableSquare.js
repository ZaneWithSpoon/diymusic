import { addBeatNote, removeBeatNote } from '../actions/actions'

function getClass(index) {
  const odd = Math.floor(index / 4) % 2 == 0
  return odd ? 'odd' : 'even'
}

view ClickableSquare {
  prop id
  prop index
  prop instrument
  prop store
  let active = false

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

  $block = {
    margin: 0,
    height: 25,
    border: 'solid',
    borderWidth: 1,
  }
}
