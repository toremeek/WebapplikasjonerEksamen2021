/**
 * @jest-environment jsdom
 */
import Stepper from '../components/Stepper'
import { fireEvent, render, screen } from '@testing-library/react'

describe('Stepper component', () => {
  it('should render button', () => {
    render(<Stepper />)

    expect(screen.getByRole('button')).toBeTruthy()
  })
  it('should have correct text content on button', () => {
    render(<Stepper />)
    expect(screen.getByRole('button')).toHaveTextContent('Game')
    fireEvent.click(screen.getByRole('button'))
    expect(screen.getByRole('button')).toHaveTextContent('End')
  })

  it('should update step-count and button content on click', async () => {})
  it('should remove button when step count is higher than amount of steps', async () => {})
})
