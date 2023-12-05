module.exports = {
  testRegex: '(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$',
  transform: {
    '^.+\\.tsx?$': 'ts-jest',
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json', 'node'],
  clearMocks: false,
  collectCoverage: true,
  coverageDirectory: '../coverage',
  coverageProvider: 'v8',
  testEnvironment: 'node',
  coverageThreshold: {
    global: {
      lines: 85,
    },
  },
  rootDir: 'src',
};
