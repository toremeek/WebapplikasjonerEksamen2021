/**
 * @jest-environment jsdom
 */
import { fireEvent, render, screen, waitFor } from '@testing-library/react'

import ColorPicker from '../components/ColorPicker'

const colors = ['red', 'blue', 'green', 'pink']

describe('ColorPicker', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render a list of all colors passed to it', () => {
    render(<ColorPicker colors={colors} />)

    // Sjekker om vi har en liste <ul>
    const list = screen.getByRole('list', { class: 'ColorPicker' })

    expect(list).toBeInTheDocument()

    // Henter alle liste elementene <li>
    const listElements = screen.queryAllByTestId('color')

    // Sjekker om vi har like mange elementer som i colors listen
    expect(listElements.length).toBe(colors.length)

    // Henter alle knappene
    const colorButtons = screen.getAllByRole('button')

    // Sjekkker om hver farge finnes som bakgrunsfage til en knapp
    colors.every((color) =>
      colorButtons.filter((button) => button.style.backgroundColor === color)
    )
  })

  it('should have disabled button if color does not match', () => {
    render(<ColorPicker colors={colors} selectedColor="green" />)

    // Henter alle kanppene, og filtrerer vekk den som er grønn
    const disabledButtons = screen
      .getAllByRole('button')
      .filter((button) => button.style.backgroundColor !== 'green')

    // Sjekker om alle knappene som er igjen i listen er disabled
    disabledButtons.every((button) => expect(button).toBeDisabled())

    // const greenButton = screen.getByRole('button', { backgroundColor: 'green' })
  })

  it('should have one active button if color match', () => {
    render(<ColorPicker colors={colors} selectedColor="green" />)

    // Henter alle kanppene, og filtrerer vekk de som ikke er grønn
    const greenButton = screen
      .getAllByRole('button')
      .filter((button) => button.style.backgroundColor === 'green')

    // Testen sier at vi kun skal ha "en" aktiv knapp - men hva om listen inneholdre to "green"?
    // Denne logikken er ikke implementert i komponentet, og vil da kunne brekke denne testen
    expect(greenButton.length).toBe(1)

    // Sjekker om den ene knappen i listen er aktiv.
    expect(greenButton[0]).toBeEnabled()
  })

  it('should have called onClick on button', async () => {
    // Mock funksjon
    const handleSelectedColor = jest.fn()

    // Rendrer komponent med fargen grønn og mockfunksjon
    render(
      <ColorPicker
        colors={colors}
        selectedColor="green"
        handleSelectedColor={handleSelectedColor}
      />
    )

    // Henter knappen
    const greenButton = screen
      .getAllByRole('button')
      .filter((button) => button.style.backgroundColor === 'green')[0]

    // Trykker på knappen
    fireEvent.click(greenButton)
    // Sjekker at mockfunksjonen har blitt trykket på en gang
    await waitFor(() => expect(handleSelectedColor).toHaveBeenCalledTimes(1))
  })

  it('should not have called onClick on disabled button', async () => {
    // Mock funksjon
    const handleSelectedColor = jest.fn()

    // Rendrer komponent med fargen grønn og mockfunksjon
    render(
      <ColorPicker
        colors={colors}
        selectedColor="green"
        handleSelectedColor={handleSelectedColor}
      />
    )

    // Henter alle kanppene, og filtrerer vekk den som er grønn
    const disabledButtons = screen
      .getAllByRole('button')
      .filter((button) => button.style.backgroundColor !== 'green')

    // Trykker på alle knappene som er disabled
    disabledButtons.every((button) => fireEvent.click(button))

    // Sjekker at mockfunksjonen aldri har blitt trigget
    await waitFor(() => expect(handleSelectedColor).toHaveBeenCalledTimes(0))
  })

  it('should updated selectedColor and active buttons on click', async () => {
    // HandleSelectedColor og selectColor er implementert i en "parent" komponent
    // går ut ifra at selectdColor er en state, og handleSelectedColor oppdaterer staten
    let selectedColor = ''

    // Mocker funksjonen
    const handleSelectedColor = jest.fn((color) => {
      selectedColor = color
    })

    // Rendrer komponent med selectedColor til '' og mockfunksjon
    const { rerender } = render(
      <ColorPicker
        colors={colors}
        selectedColor={selectedColor}
        handleSelectedColor={handleSelectedColor}
      />
    )

    const allButtons = screen.getAllByRole('button')
    const firstButton = allButtons[0]

    // Trykker på første knappen i listen
    fireEvent.click(firstButton)
    // Sjekker om knappen har blitt trykket på og at verdien er lik det som er fra colors-array
    await waitFor(() => expect(handleSelectedColor).toHaveBeenCalledTimes(1))
    await waitFor(() =>
      expect(handleSelectedColor).toHaveBeenCalledWith(colors[0])
    )
    // Sjekker at handler oppdaterer selectedColor
    await waitFor(() => expect(selectedColor).toBe(colors[0]))

    // trigger rerender manuelt med ny selectedColor verdi
    rerender(
      <ColorPicker
        colors={colors}
        selectedColor={selectedColor}
        handleSelectedColor={handleSelectedColor}
      />
    )

    // Henter alle knappene på nytt
    const reRenderButtons = screen.getAllByRole('button')
    // Henter alle knapper som ikke har farge lik colors[0]
    const disabledButtons = reRenderButtons.filter(
      (button) => button.style.backgroundColor !== colors[0]
    )

    // Sjekker om alle knappene som er igjen i listen er disabled
    disabledButtons.every((button) => expect(button).toBeDisabled())
  })
})
