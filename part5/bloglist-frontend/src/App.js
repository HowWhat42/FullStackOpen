import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import { getAll, create, update, setToken, deleteBlog } from './services/blogs'
import { login } from './services/login'
import LoginForm from './components/LoginForm'

import './index.css'
import BlogForm from './components/BlogForm'
import Togglable from './components/Togglable'

const App = () => {
    const [blogs, setBlogs] = useState([])
    const [user, setUser] = useState(null)
    const [message, setMessage] = useState(null)
    const [notifType, setNotifType] = useState(null)

    const blogFormRef = useRef()

    useEffect(() => {
        const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
        if(loggedUserJSON) {
            const user = JSON.parse(loggedUserJSON)
            setUser(user)
            setToken(user.token)
        }
        getAll().then(blogs =>
            setBlogs( blogs )
        )
    }, [])

    const createBlog = async (title, author, url) => {
        try {
            const newBlog = await create({ title, author, url })
            blogFormRef.current.toggleVisibility()
            setBlogs(blogs.concat(newBlog))

            setNotifType('success')
            setMessage(
                `a new blog ${newBlog.title} by ${newBlog.author} added`
            )
            setTimeout(() => {
                setNotifType(null)
                setMessage(null)
            }, 5000)
        } catch (err) {
            setNotifType('error')
            setMessage(`${err.message}: ${err.response.data.error}`)
            setTimeout(() => {
                setNotifType(null)
                setMessage(null)
            }, 5000)
        }
    }

    const loginUser = async (username, password) => {
        try {
            const user = await login({ username, password })
            window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            setToken(user.token)
            setUser(user)
        } catch (err) {
            setNotifType('error')
            setMessage('wrong username or password')
            setTimeout(() => {
                setNotifType(null)
                setMessage(null)
            }, 5000)
        }
    }

    const handleLogout = () => {
        window.localStorage.removeItem('loggedBlogappUser')
        setUser(null)
    }

    const likeBlog = async (blog) => {
        try {
            const newBlog = await update(blog)
            const filteredBlogs = blogs.filter(b => b.id !== blog.id)
            setBlogs(filteredBlogs.concat(newBlog))
        } catch (err) {
            setNotifType('error')
            setMessage(`${err.message}: ${err.response.data.error}`)
            setTimeout(() => {
                setNotifType(null)
                setMessage(null)
            }, 5000)
        }
    }

    const removeBlog = async (blog) => {
        if(window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
            try {
                await deleteBlog(blog)
                const filteredBlogs = blogs.filter(b => b.id !== blog.id)
                setBlogs(filteredBlogs)
            } catch (err) {
                setNotifType('error')
                setMessage(`${err.message}: ${err.response.data.error}`)
                setTimeout(() => {
                    setNotifType(null)
                    setMessage(null)
                }, 5000)
            }
        }
    }

    return (user ?
        <div>
            <h2>blogs</h2>
            <div className={notifType}>
                {message}
            </div>
            <p>{user.name} logged in</p>
            <button onClick={() => handleLogout()}>logout</button>
            <Togglable buttonLabel='new blog' ref={blogFormRef}>
                <BlogForm createBlog={createBlog} />
            </Togglable>

            {blogs.sort((a, b) => -a.likes + b.likes).map(blog =>
                <Blog key={blog.id} user={user} blog={blog} likeBlog={likeBlog} removeBlog={removeBlog} />
            )}
        </div>
        :
        <div>
            <h2>log in to application</h2>
            <div className={notifType}>
                {message}
            </div>
            <LoginForm loginUser={loginUser} />
        </div>
    )
}

export default App
