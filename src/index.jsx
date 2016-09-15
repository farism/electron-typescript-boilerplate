export const createStore = (reducer, initialState) => {

  let curState = initialState

  const listeners = []

  if (typeof reducer !== 'function') {
    throw new Error('reducer should be function')
  }
  if (typeof initialState !== 'object') {
    throw new Error('initialState should be an object')
  }

  const dispatch = (action) => {
    if (typeof action !== 'object') {
      throw new Error('action should be an object')
    }
    curState = reducer(curState, action)
    listeners.forEach((listener) => {
      listener(curState)
    })
  }

  const getState = () => curState

  const subscribe = (listener) => {
    listeners.push(listener)

    return () => {
      const listenerIndex = listeners.indexOf(listener)
      listeners.slice(listenerIndex, 1)
    }

  }

  return {
    dispatch,
    getState,
    subscribe,
  }

}
