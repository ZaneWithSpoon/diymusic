view TimelineSquares {

  prop row
  prop index

  let active = false

  function getClass(index) {
    const odd = Math.floor(index / 4) % 2 == 0
    return odd ? 'odd' : 'even'
  }


  <junk class={active ? 'clicked' : getClass(index)}>
    {index}
  </junk>

  $junk = {
    border: 'solid',
    borderWidth: 1,
    borderColor: 'black',
    height: 50,
    width: 100
  }

    $even = {
    background: 'darkGray'
  }

  $odd = {
    background: 'gray'
  }
}