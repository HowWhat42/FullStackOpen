import { useState } from 'react'
import { useDispatch } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { useField } from '../hooks'
import { createBlog } from '../reducers/blogsReducer'

const BlogForm = () => {
    const dispatch = useDispatch()
    const title = useField('text')
    const author = useField('text')
    const url = useField('text')
    const [visible, setVisible] = useState(false)
    const hideWhenVisible = { display: visible ? 'none' : '' }
    const showWhenVisible = { display: visible ? '' : 'none' }
    const toggleVisibility = () => setVisible(!visible)

    const handleCreate = async (evt) => {
        evt.preventDefault()
        dispatch(createBlog(title.attributes.value, author.attributes.value, url.attributes.value))
        dispatch(setNotification(`A new blog ${title.attributes.value} by ${author.attributes.value} added`, 'success', 5))
        title.reset()
        author.reset()
        url.reset()
    }

    return (
        <div className='py-4 flex justify-center items-center'>
            <div style={hideWhenVisible}>
                <button className='bg-red-500 hover:bg-red-700 text-white font-semibold font-bold py-2 px-4 rounded' onClick={toggleVisibility}>New blog</button>
            </div>
            <div className='uppercase w-full max-w-xs py-4 px-4 border rounded' style={showWhenVisible}>
                <div className='mb-4'>
                    <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="title">title</label>
                    <input className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='title' {...title.attributes} />
                </div>
                <div className='mb-4'>
                    <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="title">author</label>
                    <input className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='author' {...author.attributes} />
                </div>
                <div className='mb-4'>
                    <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="title">url</label>
                    <input className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='url' {...url.attributes} />
                </div>
                <div className='flex justify-between'>
                    <button className='bg-red-500 hover:bg-red-700 text-white font-semibold font-bold py-2 px-4 rounded' onClick={handleCreate}>Create</button>
                    <button className='bg-transparent border border-red-500 border-2 hover:bg-red-500 text-gray-700 hover:text-white hover:border-transparent font-semibold font-bold py-2 px-4 rounded' onClick={toggleVisibility}>Cancel</button>
                </div>
            </div>
        </div>
    )
}

export default BlogForm