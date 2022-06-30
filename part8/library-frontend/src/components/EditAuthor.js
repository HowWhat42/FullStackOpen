import { useState } from 'react'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'
import Select from 'react-select'

const EditAuthor = ({ authors }) => {
    const [born, setBorn] = useState('')
    const [selectedOption, setSelectedOption] = useState(null)
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    const submit = async (event) => {
        event.preventDefault()

        editAuthor({ variables: { name: selectedOption.value, setBornTo: Number(born) } })

        setSelectedOption(null)
        setBorn('')
    }

    const options = authors.map((author) => ({ value: author.name, label: author.name }))

    return (
        <div>
            <form onSubmit={submit}>
                <Select defaultValue={selectedOption} onChange={setSelectedOption} options={options} />
                <div>
                    born
                    <input type='number' value={born} onChange={({ target }) => setBorn(target.value)} />
                </div>
                <button type='submit'>update author</button>
            </form>
        </div>
    )
}

export default EditAuthor
