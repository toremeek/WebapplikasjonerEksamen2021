/**
 * @jest-environment jsdom
 */
import Stepper from '../components/Stepper'
import userEvent from '@testing-library/user-event'

import { fireEvent, render, screen } from '@testing-library/react'

describe('Stepper component', () => {
  it('should render button', () => {
    render(<Stepper />)

    expect(screen.getByRole('button')).toBeInTheDocument()
  })
  it('should have correct text content on button', () => {
    render(<Stepper />)
    expect(screen.getByRole('button')).toHaveTextContent('Game')
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveTextContent('End')
  })

  it('should update step-count and button content on click', async () => {
    render(<Stepper />)

    expect(screen.getByRole('button')).toBeInTheDocument()
    await screen.findByText('Game')

    fireEvent.click(screen.getByRole('button'))
    await screen.findByText('End')
  })
  it('should remove button when step count is higher than amount of steps', async () => {
    render(<Stepper />)
    expect(screen.getByRole('button')).toBeInTheDocument()

    await screen.findByText('Game')
    fireEvent.click(screen.getByRole('button'))

    await screen.findByText('End')
    fireEvent.click(screen.getByRole('button'))

    expect(screen.queryByRole('button')).toBeNull()
  })
})
