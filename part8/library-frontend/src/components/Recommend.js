import { useEffect, useState } from 'react'
import { useLazyQuery, useQuery } from '@apollo/client'
import { ALL_BOOKS, ME } from '../queries'

const Recommend = ({ show }) => {
    const [genre, setGenre] = useState(null)
    const [books, setBooks] = useState([])
    const [getBooks, result] = useLazyQuery(ALL_BOOKS, {
        fetchPolicy: 'no-cache',
    })

    const meResult = useQuery(ME)
    useEffect(() => {
        if (meResult.data && meResult.data.me) {
            setGenre(meResult.data.me.favoriteGenre)
            getBooks({
                variables: {
                    genre,
                },
            })
        }
    }, [meResult, getBooks, genre])

    useEffect(() => {
        if (result.data) {
            setBooks(result.data.allBooks)
        }
    }, [result])

    if (!show) {
        return null
    }

    return (
        <div>
            <h2>books</h2>
            <p>
                in genre <strong>{genre}</strong>
            </p>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {books.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default Recommend
