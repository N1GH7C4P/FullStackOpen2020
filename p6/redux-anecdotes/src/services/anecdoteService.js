import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'
const getId = () => (100000 * Math.random()).toFixed(0)

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const getOne = async (id) => {
  const response = await axios.get(baseUrl+'/'+id)
  return response.data
}

const createNew = async (content) => {
  const id = getId()
  const votes = 0;
  const object = {content, id, votes}
  const response = await axios.post(baseUrl,object)
  return response.data
}

const vote = async (id) => {
  const anecdote = await getOne(id)
  console.log('content: '+anecdote.content)
  const votes = anecdote.votes
  const changedAnecdote = {
    ...anecdote, votes: votes+1
  }
  
  const response = await axios.put(baseUrl+'/'+id,changedAnecdote)
  
  return response.data
}

export default { getAll, createNew, vote }