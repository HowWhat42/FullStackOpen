import { useSelector, useDispatch } from 'react-redux'
import { useParams } from 'react-router-dom'
import { setNotification } from '../reducers/notificationReducer'
import { like, deleteOne, commentBlog } from '../reducers/blogsReducer'
import { useField } from '../hooks'
import Menu from './Menu'

const Blog = () => {
    const dispatch = useDispatch()
    const id = useParams().id
    const user = useSelector((state) => state.login)
    const blog = useSelector((state) => state.blogs.find(b => b.id === id))

    const comment = useField('text')

    const handleLike = () => dispatch(like(blog))

    const handleDelete = () => dispatch(deleteOne(blog))

    const handleCreate = async (evt) => {
        evt.preventDefault()
        dispatch(commentBlog(blog, comment.attributes.value))
        dispatch(setNotification(`A new comment ${comment.attributes.value} to ${blog.title} added`, 'success', 5))
        comment.reset()
    }

    return blog && (
        <div>
            <Menu />
            <div className='flex flex-col justify-center items-center'>
                <h2 className='text-2xl mb-4'>{blog.title}</h2>
                <p className='text-sm italic mb-2'>Added by {blog.user.name}</p>
                <a className='hover:text-red-500 mb-2' href={blog.url}>{blog.url}</a>
                <div className='flex items-center mb-4'>
                    <p className='blog-likes'>Likes {blog.likes}</p>
                    <button className='ml-4 bg-red-500 hover:bg-red-700 text-white font-semibold font-bold py-2 px-4 rounded' onClick={handleLike}>Like</button>
                </div>
                <h3 className='text-xl mb-2'>Comments</h3>
                <form className='mb-4 flex justify-between' onSubmit={handleCreate}>
                    <input className='shadow border rounded py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' {...comment.attributes} name='Comment' />
                    <button className='ml-4 bg-red-500 hover:bg-red-700 text-white font-semibold font-bold py-2 px-4 rounded' type='submit'>Add comment</button>
                </form>
                <ul>
                    {blog.comments.map((comment, i) => (
                        <li className='shadow border rounded mb-4 py-2 px-3 text-gray-700' key={i}>{comment}</li>))}
                </ul>
                {blog.user.username === user.username && <button className='bg-transparent border border-red-500 border-2 hover:bg-red-500 text-gray-700 hover:text-white hover:border-transparent font-semibold font-bold py-2 px-4 rounded' onClick={handleDelete}>Remove blog</button>}
            </div>
        </div>
    )
}

export default Blog