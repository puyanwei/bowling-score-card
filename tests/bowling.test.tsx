import { BowlingPage } from '@/components/BowlingPage'
import { render, screen } from '@testing-library/react'

describe('page renders', () => {
  it(`renders the page`, () => {
    render(<BowlingPage />)
    expect(screen.getByTestId(`bowling-page`)).toBeVisible()
  })
})
