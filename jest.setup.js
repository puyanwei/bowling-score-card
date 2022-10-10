import '@testing-library/jest-dom/extend-expect'

// mock next/router
jest.mock('next/router', () => require('next-router-mock'))

// next head
jest.mock('next/head', () => require('./__mocks__/next-head'))

// mock match media
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // Deprecated
    removeListener: jest.fn(), // Deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})
