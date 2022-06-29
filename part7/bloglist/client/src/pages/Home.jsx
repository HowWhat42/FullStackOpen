import { useSelector } from 'react-redux'
import BlogForm from '../components/BlogForm'
import Menu from '../components/Menu'

import { Link } from 'react-router-dom'

const Home = () => {    
    const blogs = useSelector((state) => state.blogs)
    const sortedBlogs = [...blogs].sort((a, b) => -a.likes + b.likes)

    return (
        <div>
            <Menu />
            <h2 className='text-2xl flex justify-center items-center'>Blogs</h2>
            <BlogForm />
            <div className='flex flex-col justify-center items-center'>
                {sortedBlogs.map((blog, i) => (
                    <Link className='hover:text-red-500 shadow border rounded mb-4 w-1/2 py-2 px-3 text-gray-700' key={i} to={`/blogs/${blog.id}`}>{blog.title} {blog.author}</Link>
                ))}
            </div>
        </div>
    )
}

export default Home