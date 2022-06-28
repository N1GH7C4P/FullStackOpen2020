import React from 'react'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

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

const AnecdoteList = (props) => {

    return(
        <ul>
        {props.anecdotes.map(anecdote =>
            <Anecdote
                key={anecdote.id}
                anecdote={anecdote}
                handleClick={() => {
                  const notification = 'Voted for "'+anecdote.content+'"'
                  props.setNotification(notification,5)
                  props.vote(anecdote.id)
                }}
            />
        )}
        </ul>
    )
}

const mapStateToProps = (state) => {
  console.log('state.anecdotes: '+state.anecdotes)
  console.log('state.filter: '+state.filter)
  return{
    anecdotes: (state.anecdotes.filter((anecdote) => {
        const filteredAnecdotes = anecdote.content.includes(state.filter)
        console.log('filtered anecdotes: '+filteredAnecdotes)
        return filteredAnecdotes
      })
    )
  }
}

const mapDispatchToProps = {  setNotification, vote }

export default connect(mapStateToProps,mapDispatchToProps)(AnecdoteList)