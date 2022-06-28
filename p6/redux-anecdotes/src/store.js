import { createStore, combineReducers, applyMiddleware } from 'redux'
import AnecdoteReducer, { initializeAnecdotes } from './reducers/anecdoteReducer'
import NotificationReducer from './reducers/notificationReducer.js'
import FilterReducer from './reducers/filterReducer.js'
import { composeWithDevTools } from 'redux-devtools-extension'
import anecdoteService from './services/anecdoteService'
import thunk from 'redux-thunk'

const reducer = combineReducers({  
    anecdotes: AnecdoteReducer,
    filter: FilterReducer,
    notification: NotificationReducer
})

const store = createStore(
    reducer,
    composeWithDevTools(
        applyMiddleware(thunk)
    )
)

anecdoteService.getAll().then(anecdotes =>
    store.dispatch(initializeAnecdotes(anecdotes))
)

export default store