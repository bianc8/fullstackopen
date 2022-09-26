import { useSelector, useDispatch } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import anecdoteService from '../services/anecdotes'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
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

const AnecdotesList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => {
    if (state.filter === '') return state.anecdotes
    return state.anecdotes.filter(a => a.content.toLowerCase().includes(state.filter.toLowerCase()))
  })
  
  const addVote = async (id) => {
    const updatedAnecdote = await anecdoteService.addVote(id)
    dispatch(vote(updatedAnecdote))

    dispatch(setNotification(`you voted '${updatedAnecdote.content}'`, 5))
  }

  return (
    <>
      {anecdotes.map(anecdote =>
        <Anecdote 
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => addVote(anecdote.id)}
        />
      )}
    </>
  )
}
export default AnecdotesList