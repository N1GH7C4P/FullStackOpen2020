import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const Anecdote = ({anecdote, handleClick}) => {
    return(
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
    )
}

const AnecdoteForm = () => {
    
    const dispatch = useDispatch()

    const state = useSelector(state => state)

    const filteredAnecdotes = state.anecdotes.filter((anecdote) => {
      return anecdote.content.includes(state.filter)
    })

    console.log('filtered: '+filteredAnecdotes)

    return(
        <ul>
        {filteredAnecdotes.map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => {
                  const notification = 'Voted for "'+anecdote.content+'"'
                  dispatch(setNotification(notification,5))
                  dispatch(vote(anecdote.id))       
                }}
            />
        )}
        </ul>
    )
}

export default AnecdoteForm
