import { useState, useEffect } from 'react'
import { useApolloClient, useSubscription } from '@apollo/client'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Notify from './components/Notify'
import LoginForm from './components/LoginForm'
import Recommend from './components/Recommend'
import { ALL_BOOKS, BOOK_ADDED } from './queries'
import { updateCache } from './cache'

const App = () => {
    const [page, setPage] = useState('authors')
    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)
    const client = useApolloClient()

    useSubscription(BOOK_ADDED, {
        onSubscriptionData: ({ client, subscriptionData }) => {
            const addedBook = subscriptionData.data.bookAdded
            window.alert(`${addedBook.title} added`)

            updateCache(client.cache, { query: ALL_BOOKS }, addedBook)
        },
    })

    useEffect(() => {
        if (!token) setToken(localStorage.getItem('library-user-token'))
    }, [token])

    const logout = () => {
        setPage('authors')
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    return (
        <div>
            <div>
                <button onClick={() => setPage('authors')}>authors</button>
                <button onClick={() => setPage('books')}>books</button>
                {token && (
                    <>
                        <button onClick={() => setPage('add')}>add book</button>
                        <button onClick={() => setPage('recommend')}>recommend</button>
                    </>
                )}
                {!token ? <button onClick={() => setPage('login')}>login</button> : <button onClick={logout}>logout</button>}
            </div>
            <Notify errorMessage={errorMessage} />
            <LoginForm show={page === 'login'} setPage={setPage} setToken={setToken} setError={setErrorMessage} />
            <Authors token={token} show={page === 'authors'} />

            <Books show={page === 'books'} />

            <NewBook show={page === 'add'} setError={setErrorMessage} />
            <Recommend show={page === 'recommend'} />
        </div>
    )
}

export default App
