import { useState } from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({ loginUser }) => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')

    const handleLogin = async (evt) => {
        evt.preventDefault()
        loginUser(username, password)
        setUsername('')
        setPassword('')
    }

    return (
        <div>
            <form onSubmit={handleLogin}>
                <div>
                    username
                    <input id='username' type='text' value={username} onChange={({ target }) => setUsername(target.value)} name='Username' />
                </div>
                <div>
                    password
                    <input id='password' type='password' value={password} onChange={({ target }) => setPassword(target.value)} name='Password' />
                </div>
                <button id='login-button' type='submit'>login</button>
            </form>
        </div>
    )
}

LoginForm.propTypes = {
    loginUser: PropTypes.func.isRequired
}

export default LoginForm