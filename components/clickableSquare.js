import { addBeatHypermeasure, addBeatNote, setRunState, RunStates } from '../actions/actions'

function getClass(index) {
  const odd = Math.floor(index / 4) % 2 == 0
  return odd ? 'odd' : 'even'
}

view ClickableSquare {
  prop index
  let active = false

  //todo: use redux to change playable music state
  function toggleActive() {
    active = !active
    //this.props.removeNote(this.state.x, this.state.y);
    //TODO figure out how hypermeasure gets it's id
    //store.dispatch(addBeatNote(view.props.id, view.props.instrument, view.props.index))
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
