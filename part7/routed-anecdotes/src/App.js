import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import About from './components/About'
import Footer from './components/Footer'
import Menu from './components/Menu'
import Form from './components/Form'
import AnecdoteList from './components/AnecdoteList'
import AnecdoteDetails from './components/AnecdoteDetails'

const initialAnecdotes = [
    {
      content: 'If it hurts, do it more often',
      author: 'Jez Humble',
      info: 'https://martinfowler.com/bliki/FrequencyReducesDifficulty.html',
      votes: 0,
      id: 1
    },
    {
      content: 'Premature optimization is the root of all evil',
      author: 'Donald Knuth',
      info: 'http://wiki.c2.com/?PrematureOptimization',
      votes: 0,
      id: 2
    }
]

const App = () => {
  const [anecdotes, setAnecdotes] = useState(initialAnecdotes)

  const [notification, setNotification] = useState('')

  const addNew = (anecdote) => {
    anecdote.id = Math.round(Math.random() * 10000)
    setAnecdotes(anecdotes.concat(anecdote))
    setNotification(`a new anecdote ${anecdote.content} created !`)
    setTimeout(() => {
        setNotification('')
    }, 5000)
  }

  const anecdoteById = (id) =>
    anecdotes.find(a => a.id === id)

  const vote = (id) => {
    const anecdote = anecdoteById(id)

    const voted = {
      ...anecdote,
      votes: anecdote.votes + 1
    }

    setAnecdotes(anecdotes.map(a => a.id === id ? voted : a))
  }

  return (
    <Router>
      <h1>Software anecdotes</h1>
      <Menu />
      {notification && <p>{notification}</p>}
      
      <Routes>
        <Route path="/" element={<AnecdoteList anecdotes={anecdotes} />} />
        <Route path="/anecdotes/:id" element={<AnecdoteDetails anecdotes={anecdotes} />} />
        <Route path="/create" element={<Form addNew={addNew} />} />
        <Route path="/about" element={<About />} />
      </Routes>

      <Footer />
    </Router>
  )
}

export default App
