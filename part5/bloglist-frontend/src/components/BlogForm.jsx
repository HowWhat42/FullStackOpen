import { useState } from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({ createBlog }) => {
    const [title, setTitle] = useState('')
    const [author, setAuthor] = useState('')
    const [url, setUrl] = useState('')

    const handleCreate = async (evt) => {
        evt.preventDefault()

        createBlog(title, author, url)
        setTitle('')
        setAuthor('')
        setUrl('')
    }

    return (
        <div>
            <form onSubmit={handleCreate}>
                <div>
                    title:
                    <input id='title' type='text' value={title} onChange={({ target }) => setTitle(target.value)} name='Title' />
                </div>
                <div>
                    author:
                    <input id='author' type='text' value={author} onChange={({ target }) => setAuthor(target.value)} name='Author' />
                </div>
                <div>
                    url:
                    <input id='url' type='text' value={url} onChange={({ target }) => setUrl(target.value)} name='Url' />
                </div>
                <button type='submit'>create</button>
            </form>
        </div>
    )
}

BlogForm.propTypes = {
    createBlog: PropTypes.func.isRequired
}

export default BlogForm