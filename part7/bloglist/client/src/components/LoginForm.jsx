import { loginUser } from '../reducers/loginReducer'
import { useField } from '../hooks'
import { useDispatch } from 'react-redux'

const LoginForm = () => {
    const dispatch = useDispatch()
    const username = useField('text')
    const password = useField('password')

    const handleLogin = async (evt) => {
        evt.preventDefault()
        dispatch(loginUser(username.attributes.value, password.attributes.value))
        username.reset()
        password.reset()
    }

    return (
        <div className='uppercase max-w-xs m-auto py-4 px-4 flex flex-col justify-center items-center border rounded'>
            <h2 className='text-2xl mb-4'>Log in to application</h2>
            <form className='flex flex-col' onSubmit={handleLogin}>
                <div className='mb-4'>
                    <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="username">username</label>
                    <input className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='username' {...username.attributes} name='Username' />
                </div>
                <div className='mb-4'>
                    <label className='text-gray-700 text-sm font-bold mb-2' htmlFor="password">password</label>
                    <input className='shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline' id='password' {...password.attributes} name='Password' />
                </div>
                <button className='bg-red-500 hover:bg-red-700 text-white font-semibold font-bold py-2 px-4 rounded' id='login-button' type='submit'>Login</button>
            </form>
        </div>
    )
}

export default LoginForm