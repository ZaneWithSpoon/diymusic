import { createStore, applyMiddleware, combineReducers } from 'redux'
import thunkMiddleware from 'redux-thunk'
import { Provider } from 'react-redux'
import diymApp from '../reducers/reducers'


//printDiym()
console.log(printDiym)


const createStoreWithMiddleware = applyMiddleware(
  thunkMiddleware, // lets us dispatch() functions
  //loggerMiddleware // neat middleware that logs actions
)(createStore)

const store = createStoreWithMiddleware(diymApp)

console.log(store.getState())

//Every time the state changes, log it
let unsubscribe = store.subscribe(() =>
  console.log(store.getState())
)

view Index {

  <Provider >
    <Main />
  </Provider>

}