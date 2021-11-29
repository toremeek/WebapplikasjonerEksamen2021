/**
 * @jest-environment jsdom
 */

import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import Stepper from '../components/Stepper'

describe('Stepper component', () => {
  it('should render button', () => {
    render(<Stepper />)
    // Sjekker om knappen finnes
    expect(screen.getByRole('button')).toBeInTheDocument()
  })
  it('should have correct text content on button', () => {
    render(<Stepper />)

    // Henter knappen fra komponenten
    const button = screen.getByRole('button')

    // Sjekker at knappen har tekst lik game
    expect(button).toHaveTextContent('Game')
  })

  it('should update step-count and button content on click', async () => {
    render(<Stepper />)

    // Henter knappen fra komponenten
    const button = screen.getByRole('button')

    // Sjekker at tekst er lik game (initial)
    expect(button).toHaveTextContent('Game')

    // Klikker på knappen og øker step med 1
    fireEvent.click(button)

    // Sjekker at tekst på knappen oppdaterer seg
    await waitFor(() => expect(button).toHaveTextContent('End'))
  })

  it('should remove button when step count is higher than amount of steps', async () => {
    render(<Stepper />)

    // Henter knappen fra komponenten
    const button = screen.getByRole('button')

    // Trykker på knappen to ganger
    fireEvent.click(button)
    fireEvent.click(button)

    await waitFor(() => expect(button).not.toBeInTheDocument())
  })
})
