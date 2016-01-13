import { addBeatHypermeasure, addBeatNote, setRunState, RunStates } from '../actions/actions'


view ClickableSquare {

  let clicked = false
  let className = ''

  function updateClassName() {
    if(Math.floor(view.props.index / 4) % 2 == 0 ){
      if(clicked){
        className = 'clicked'
      } else {
        className = 'even'
      }
    } else {
      if(clicked){
        className = 'clicked'
      } else {
        className = 'odd'
      }
    }
  }


  //todo: use redux to change playable music state
  function toggleSelected() {
    if(clicked){
      //this.props.removeNote(this.state.x, this.state.y);
      clicked = false
    } else {
      //TODO figure out how hypermeasure gets it's id
      //store.dispatch(addBeatNote(view.props.id, view.props.instrument, view.props.index))
      clicked = true
    }
    //console.log(store.getState())
    updateClassName()
  }


  updateClassName()



  <block class={className} onClick={toggleSelected} ></block>


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
