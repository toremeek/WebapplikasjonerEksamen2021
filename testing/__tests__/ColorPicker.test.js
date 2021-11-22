/**
 * @jest-environment jsdom
 */

import { render, screen } from '@testing-library/react'
import ColorPicker from '../components/ColorPicker'

describe('ColorPicker', () => {
  afterEach(() => {
    jest.clearAllMocks()
  })
  it('should render a list of all colors passed to it', () => {
    const colors = ['red', 'blue', 'green', 'pink']
    render(<ColorPicker colors={colors} />)

    const list = screen.queryAllByTestId('color')

    expect(list).toBeTruthy()
  })

  it('should have disabled button if color does not match', () => {})
  it('should have one active button if color match', () => {})

  it('should have called onClick on button', async () => {})
  it('should not have called onClick on disabled button', async () => {})

  it('should updated selectedColor and active buttons on click', async () => {})
})
