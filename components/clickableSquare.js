view ClickableSquare {
  prop className

  //todo: use redux to change playable music state
  <block class={className}/>

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
    background: '#d81cd8'
  }

  $block = {
    margin: 0,
    height: 50,
    border: 'solid',
    borderWidth: 1,
  }
}
