/**
 * @jest-environment jsdom
 */
import Stepper from '../components/Stepper'
import userEvent from '@testing-library/user-event'

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

  it('should update step-count and button content on click', async () => {
    render(<Stepper />)
    //step sin initial value og sjekker om den er 0
    let step = 0
    expect(step).toBe(0)
    //Sjekker om knappen eksisterer
    expect(screen.getByRole('button')).toBeTruthy()
    console.log(step)

    //Finner knappen med teksten 'Game'
    await screen.findByText('Game')
    //Klikker på knappen og øker step med 1
    fireEvent.click(screen.getByRole('button'))
    step += 1
    //Sjekker om step = 1
    expect(step).toBe(1)
    console.log(step)

    //Venter og ser om knappen har endret seh fra 'Game' til 'End'
    await screen.findByText('End')
    fireEvent.click(screen.getByRole('button'))
    console.log(step)
    step += 1
    expect(step).toBe(2)
    console.log(step)
  })
  it('should remove button when step count is higher than amount of steps', async () => {})
})
