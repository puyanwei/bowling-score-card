// jest.config.js
const nextJest = require(`next/jest`)
const tsconfig = require(`./tsconfig.json`)
const moduleNameMapper = require(`tsconfig-paths-jest`)(tsconfig)
const createJestConfig = nextJest({
  // Provide the path to your Next.js app to load next.config.js and .env files in your test environment
  dir: `./`,
  preset: 'ts-jest',
  testEnvironment: 'node',
  transformIgnorePatterns: ['^.+\\.js$'],
})

// Add any custom config to be passed to Jest
const customJestConfig = {
  moduleDirectories: [`node_modules`, `<rootDir>/`],
  testEnvironment: `jest-environment-jsdom`,
  setupFilesAfterEnv: [`<rootDir>/jest.setup.js`],
  moduleNameMapper,
}

module.exports = createJestConfig(customJestConfig)
