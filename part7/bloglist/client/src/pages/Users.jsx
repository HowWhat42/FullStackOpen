import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import Menu from '../components/Menu'

const Users = () => {
    const users = useSelector((state) => state.users)

    return users && (
        <div>
            <Menu />
            <h2 className='text-2xl flex justify-center items-center'>Users</h2>
            <div className='w-1/6 mx-auto flex flex-col justify-center items-center'>
                <div className='flex w-full justify-between'>
                    <p className='py-4 px-4'>Users</p>
                    <p className='py-4 px-4'>Blogs created</p>
                </div>
                {users.map((user, i) => (<div className='flex w-full justify-between shadow border rounded mb-4 text-gray-700' key={i}>
                    <p className='hover:text-red-500 py-4 px-4'><Link to={`/users/${user.id}`}>{user.username}</Link></p>
                    <p className='py-4 px-4'>{user.blogs.length}</p>
                </div>))}
            </div>
        </div>
    )
}

export default Users