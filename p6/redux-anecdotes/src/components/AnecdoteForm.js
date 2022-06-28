import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = (props) => {

    const addAnecdote = async (event) => {
        
        event.preventDefault()
        props.setNotification('New anecdote added!',5)
        const content = event.target.anecdote.value
        event.target.anecdote.value = ''
        props.createAnecdote(content)
        
    }
    return(
        <form onSubmit={addAnecdote}>
            <input name="anecdote" />
            <button type="submit">add</button>
        </form>
    )
}

const mapDispatchToProps = {
    setNotification, createAnecdote
}


export default connect(null,mapDispatchToProps)(AnecdoteForm)