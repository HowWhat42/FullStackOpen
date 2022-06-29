import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import Menu from '../components/Menu'

const UserDetails = () => {
    const id = useParams().id
    const user = useSelector((state) => state.users.find(u => u.id === id))

    if (!user) {
        return null
    }

    return user && (
        <div>
            <Menu />
            <h2 className='text-2xl mb-4 flex justify-center items-center'>{user.name}</h2>
            <h3 className='text-xl mb-2 flex justify-center items-center'>Added blogs</h3>
            <ul className='text-l flex flex-col justify-center items-center'>
                {user.blogs.map((b, i) => (
                    <li key={i}>{b.title}</li>))}
            </ul>
        </div>
    )
}

export default UserDetails