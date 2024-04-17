const fs = require('fs');

const swcConfig = JSON.parse(fs.readFileSync(`${__dirname}/.swcrc`, 'utf-8'));

module.exports = {
  roots: ['<rootDir>/src'],
  collectCoverageFrom: ['src/**/*.{js,jsx,ts,tsx}', '!src/**/*.d.ts', '!src/mocks/**'],
  coveragePathIgnorePatterns: [],
  setupFilesAfterEnv: ['./config/setupTests.ts'],
  testEnvironment: 'jest-environment-jsdom',
  modulePaths: ['<rootDir>/src'],
  transform: {
    '^.+\\.(t|j)sx?$': ['@swc/jest', { ...swcConfig }],
  },
  transformIgnorePatterns: [
    '[/\\\\]node_modules[/\\\\].+\\.(js|jsx|mjs|cjs|ts|tsx)$',
    '^.+\\.module\\.(css|sass|scss)$',
  ],
  moduleNameMapper: {
    '\\.(svg|png|jpg)$': '<rootDir>/config/mocks/fileMock.ts',
    '\\.(css)$': '<rootDir>/config/mocks/styleMock.ts',
  },
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'json'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
  resetMocks: true,

  coverageDirectory: 'reports',
  coverageReporters: ['cobertura', 'html', 'lcov', 'text-summary', 'text'],
  collectCoverageFrom: [
    'src/**/*.{js,jsx,ts,tsx}',
    '!src/index.tsx',
    '!src/tests/helpers.tsx',
    '!src/**/*.styles.ts',
    '!src/**/*.config.ts',
    '!src/config/**/*.ts',
    '!src/**/*.d.ts',
  ],
  coverageThreshold: {
    global: {
      branches: 80,
      lines: 80,
      functions: 80,
      statements: 80,
    },
    'src/**/*.{js,jsx,ts,tsx}': {
      branches: 80,
      lines: 80,
      functions: 80,
      statements: 80,
    },
  },
};
