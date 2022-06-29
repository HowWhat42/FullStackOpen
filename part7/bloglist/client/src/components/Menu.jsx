import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { useNavigate, Link } from 'react-router-dom'
import { logout } from '../reducers/loginReducer'

const Menu = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const user = useSelector((state) => state.login)

    if (!user) {
        navigate('/login')
    }

    const handleLogout = () => {
        dispatch(logout())
        navigate('/login')
    }

    const padding = {
        paddingRight: 5
    }

    return user && (
        <div>
            <div className='flex bg-red-500 py-4 px-8 text-white justify-between uppercase text-md font-bold'>
                <Link className='hover:text-gray-300' to='/' style={padding}>blogs</Link>
                <h1>Blog List App</h1>
                <Link className='hover:text-gray-300' to='/users' style={padding}>users</Link>
            </div>
            <div className='flex items-center py-4'>
                <p>{user.name} logged in</p>
                <button className='bg-red-500 hover:bg-red-700 text-white font-semibold font-bold mx-4 py-2 px-4 rounded' onClick={() => handleLogout()}>Logout</button>
            </div>
        </div>
    )
}

export default Menu