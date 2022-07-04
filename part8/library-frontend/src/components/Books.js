import { useState, useEffect } from 'react'
import { useQuery, useLazyQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = ({ show }) => {
    const [genre, setGenre] = useState(null)
    const [books, setBooks] = useState([])
    const result = useQuery(ALL_BOOKS)
    const [booksToShow, setBooksToShow] = useState(books)
    const [getBooksByGenre, resultByGenre] = useLazyQuery(ALL_BOOKS, {
        fetchPolicy: 'no-cache',
    })
    const genres = [...new Set(books.map((b) => b.genres).flat())]

    useEffect(() => {
        if (result.data) {
            setBooks(result.data.allBooks)
            getBooksByGenre({
                variables: {
                    genre,
                },
            })
        }
    }, [result, getBooksByGenre, genre])

    useEffect(() => {
        if (resultByGenre.data) {
            setBooksToShow(resultByGenre.data.allBooks)
        }
    }, [resultByGenre])

    if (!show) {
        return null
    }

    if (result.loading) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <h2>books</h2>

            <table>
                <tbody>
                    <tr>
                        <th></th>
                        <th>author</th>
                        <th>published</th>
                    </tr>
                    {booksToShow.map((a) => (
                        <tr key={a.title}>
                            <td>{a.title}</td>
                            <td>{a.author.name}</td>
                            <td>{a.published}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            {genres.map((g, i) => (
                <button key={i} onClick={() => setGenre(g)}>
                    {g}
                </button>
            ))}
            <button onClick={() => setGenre(null)}>all genres</button>
        </div>
    )
}

export default Books
