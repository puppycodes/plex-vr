import { createStore, applyMiddleware, compose } from 'redux'
import { createLogger } from 'redux-logger'

import rootReducer from '~reducers'

const composeEnhancers = typeof window === 'object' &&
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
  : compose

const enhancer = composeEnhancers(applyMiddleware(...middleware))

const middleware = []
if (process.env.NODE_ENV !== 'production') {
  middleware.push(createLogger())
}

export const configureStore = initialState => {
  const store = createStore(rootReducer, initialState, enhancer)

  if (module.hot) {
    module.hot.accept('~reducers', () => {
      const nextRootReducer = require('~reducers')
      store.replaceReducer(nextRootReducer)
    })
  }

  return store
}