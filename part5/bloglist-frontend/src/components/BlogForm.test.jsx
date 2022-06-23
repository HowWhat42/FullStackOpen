import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import BlogForm from './BlogForm'


const newBlog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
}

test('form calling event handler', () => {
    const createBlog = jest.fn()
    const { container } = render(<BlogForm createBlog={createBlog} />)
    const inputTitle = container.querySelector('#title')
    const inputAuthor = container.querySelector('#author')
    const inputUrl = container.querySelector('#url')
    const sendButton = screen.getByText('create')

    fireEvent.change(inputTitle, { target: { value: newBlog.title } })
    fireEvent.change(inputAuthor, { target: { value: newBlog.author } })
    fireEvent.change(inputUrl, { target: { value: newBlog.url } })
    fireEvent.click(sendButton)

    expect(createBlog.mock.calls).toHaveLength(1)
    expect(createBlog.mock.calls[0][0]).toBe('Go To Statement Considered Harmful')
    expect(createBlog.mock.calls[0][1]).toBe('Edsger W. Dijkstra')
    expect(createBlog.mock.calls[0][2]).toBe('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
})