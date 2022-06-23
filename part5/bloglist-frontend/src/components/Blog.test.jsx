import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen, fireEvent } from '@testing-library/react'
import Blog from './Blog'

const blogUser = {
    username: 'jeanmassiet',
    name: 'Jean Massiet'
}
const blog = {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5,
    user: blogUser
}

test('renders content', () => {
    const { container } = render(<Blog user={blogUser} blog={blog} />)
    const header = container.querySelector('.blog-title')
    expect(header).toHaveTextContent('Go To Statement Considered Harmful Edsger W. Dijkstra')
})

test('clicking the details button', async () => {
    const { container } = render(<Blog user={blogUser} blog={blog} />)

    const button = screen.getByText('view')
    fireEvent.click(button)

    const url = container.querySelector('.blog-url')
    const likes = container.querySelector('.blog-likes')
    expect(url).toHaveTextContent('http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html')
    expect(likes).toHaveTextContent('5')
})

test('clicking the like button adds like', async () => {
    const mockHandler = jest.fn()

    render(<Blog user={blogUser} blog={blog} likeBlog={mockHandler} />)

    const button = screen.getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})