import React, { useState } from 'react'
import { EDIT_BORN_YEAR, ALL_AUTHORS } from '../queries'
import { useMutation } from '@apollo/client'

const Authors = ({show, authors}) => {
  
  const [ setAuthorBorn ] = useMutation(EDIT_BORN_YEAR, {
    refetchQueries: [ { query: ALL_AUTHORS } ]
  })

  const [name, setName] = useState('')
  const [born, setBorn] = useState('')

  if (!show) {
    return null
  }

  const submit = async (event) => {
    event.preventDefault()
    console.log('Submit: '+name+' : '+born)
    setAuthorBorn({  variables: { name, born } })
    setBorn('')
    setName('')
  }

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <div>
        <h2>Set birthyear</h2>
        <form onSubmit={submit}>
        <label>
        Pick an author
        <select value={name} onChange={({ target }) => setName(target.value)}>
        {authors.map(a =>
            <option value={a.name} >{a.name}</option>
          )}
          </select>
          </label>
          born: <input value={born} onChange={({ target }) => setBorn(parseInt(target.value))}/>
          <button type='submit'>Submit</button>
        </form>
      </div>
    </div>
  )
}

export default Authors