import { expect } from 'chai'

import { createStore } from '../src/index.jsx'

describe('create store', () => {
  const reducer = (state, action) => { return state }
  const initialState = {}
  const store = createStore(reducer, initialState)

  it('should accept reducer of type function as first arg', () => {
    expect(createStore.bind(this, 'string', initialState)).to.throw(Error)
  })

  it('should accept initialState of type object as second arg', () => {
    expect(createStore.bind(this, () => {}, 'string')).to.throw(Error)
  })


  it('returns object with dispatch function', () => {
    expect(store).to.include.keys('dispatch')
    expect(store.dispatch).to.be.a('function')
  })

  it('should return an object with getState function', () => {
    expect(store).to.include.keys('getState')
    expect(store.getState).to.be.a('function')
  })

  describe('dispatch function', () => {
    it('should accept a plain object', () => {
      expect(store.dispatch.bind(this, 'string')).to.throw(Error)
    })
    it('should change the state tree', () => {
      const action = {
        type: 'INCREMENT',
      }

      const reducer = (state, action) => {
        switch(action.type) {
          case 'INCREMENT':
            return {
              ...state,
              counter: (state.counter + 1),
            }
        }
      }
      const initialState = { counter: 0 }

      const store = createStore(reducer, initialState)
      expect(store.getState()).to.eql(initialState)

      store.dispatch(action)

      expect(store.getState()).to.eql({ counter: 1 })

    })
  })

  describe('getState function', () => {
    const curState = store.getState()

    it('should return a state object', () => {
      expect(curState).to.be.an('object')
    })

    it('should return the state', () => {
      expect(curState).to.eql(initialState)
    })
  })
})
