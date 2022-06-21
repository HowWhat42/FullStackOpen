import { useState } from 'react'

const Blog = ({ user, blog, likeBlog, removeBlog }) => {
    const [visible, setVisible] = useState(false)
    const [blogObject, setBlogObject] = useState(blog)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }

    const toggleVisibility = () => setVisible(!visible)

    const handleLike = () => {
        const likedBlog = { ...blog, likes: blog.likes + 1 }
        likeBlog(likedBlog)
        setBlogObject(likedBlog)
    }

    const handleDelete = () => {
        removeBlog(blog)
    }

    const blogStyle = {
        paddingTop: 10,
        paddingLeft: 2,
        border: 'solid',
        borderWidth: 1,
        marginBottom: 5
    }

    return (
        <div className='blog' style={blogStyle}>
            <div style={hideWhenVisible}>
                <p className='blog-title'>{blog.title} {blog.author} <button onClick={toggleVisibility}>view</button></p>
            </div>
            <div style={showWhenVisible}>
                <p>{blog.title} {blog.author} <button onClick={toggleVisibility}>hide</button></p>
                <p className='blog-url'>{blog.url}</p>
                <p className='blog-likes'>likes {blogObject.likes} <button onClick={handleLike}>like</button></p>
                <p>{blog.user.name}</p>
                {blog.user.username === user.username && <button onClick={handleDelete}>remove</button>}
            </div>
        </div>
    )
}

export default Blog