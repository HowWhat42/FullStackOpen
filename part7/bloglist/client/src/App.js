import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Home from './pages/Home'
import Users from './pages/Users'
import UserDetails from './pages/UserDetails'
import Blog from './components/Blog'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'

import './index.css'

import { initializeUser } from './reducers/loginReducer'
import { initializeUsers } from './reducers/usersReducer'
import { initializeBlogs } from './reducers/blogsReducer'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'

const App = () => {
    const dispatch = useDispatch()
    const user = useSelector((state) => state.login)

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if (loggedUserJSON) {
            dispatch(initializeUser())
        }
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeUsers())
    }, [dispatch])

    useEffect(() => {
        dispatch(initializeBlogs())
    }, [dispatch])

    return (
        <Router>
            <Notification />
            <Routes>
                <Route path='/' exact element={<Home />} />
                <Route path='/login' element={!user ? <LoginForm /> : <Navigate to='/' />} />
                <Route path='/users' element={<Users />} />
                <Route path='/users/:id' element={<UserDetails />} />
                <Route path='/blogs/:id' element={<Blog />} />
            </Routes>
        </Router>
    )
}

export default App

