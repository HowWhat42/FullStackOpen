import { useSelector, useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => {
        if (state.filter) {
            const filteredAnecdotes = [...state.anecdotes].filter(anecdote => anecdote.content.toLowerCase().includes(state.filter.toLowerCase()))
            return filteredAnecdotes
        } else {
            return state.anecdotes
        }
    })
    const sortedAnecdotes = [...anecdotes].sort((a, b) => -a.votes + b.votes)
    const dispatch = useDispatch()

    const vote = (id) => {
        const anecdoteToChange = anecdotes.find(a => a.id === id)
        dispatch(voteAnecdote(anecdoteToChange))
        dispatch(setNotification(`you voted '${anecdoteToChange.content}'`, 5))
    }

    return (
        <div>
            {sortedAnecdotes.map(anecdote =>
                <div key={anecdote.id}>
                    <div>
                        {anecdote.content}
                    </div>
                    <div>
                        has {anecdote.votes}
                        <button onClick={() => vote(anecdote.id)}>vote</button>
                    </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList