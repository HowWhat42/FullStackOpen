import { render, screen } from '@testing-library/react'
import Todo from './Todo'

describe('todo component', () => {
    beforeEach(() => {
        const testTodo = {
            id: 'testId',
            text: 'test todo',
            done: false
        }
        render(<Todo todo={testTodo} />)
    })

    test('renders correctly', async () => {
        const text = await screen.findByText('test todo')
        expect(text).toBeDefined()
    })
})