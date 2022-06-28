import anecdoteService from "../services/anecdoteService"

export const filterAnecdotes = (filter) => {
  return({
    type: 'FILTER_ANECDOTES',
    data: filter,
  })
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch ({
      type: 'NEW_ANECDOTE',
      data: newAnecdote,
    })
  }
}

export const vote = (id) => {
  console.log('vote', id)
  return async dispatch => {
    const anecdotes = await anecdoteService.vote(id) 
    dispatch({
      type: 'VOTE',
      data: anecdotes,
    })
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
      dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes,
    })
  }
}

const AnecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'VOTE' : {
      const id = action.data.id
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : action.data
      )
    }
    case 'NEW_ANECDOTE': {
      return state.concat(action.data)
    }
    case 'INIT_ANECDOTES': {
      return action.data
    }
    default : return state
  }
}

export default AnecdoteReducer