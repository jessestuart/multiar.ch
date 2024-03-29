module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageDirectory: './test/coverage',
  moduleFileExtensions: ['ts', 'tsx', 'js'],
  moduleDirectories: ['src', 'static', 'node_modules'],
  setupFilesAfterEnv: ['<rootDir>/test/setupTests.ts'],
  reporters: ['default', 'jest-junit'],
  transform: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/test/utils/file-transformer.js',
    '^.+\\.js$': 'babel-jest',
    '.*\\.tsx?$': 'ts-jest',
    '.*\\.css$': '<rootDir>/test/__mocks__/styleMock.ts',
  },
  moduleNameMapper: {
    '.+\\.(css|styl|less|sass|scss)$': `identity-obj-proxy`,
    '.+\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$': `<rootDir>/__mocks__/file-mock.js`,
  },
  testPathIgnorePatterns: [`node_modules`, `.cache`, `public`],
  transformIgnorePatterns: [`node_modules/(?!(gatsby)/)`],
  globals: {
    __PATH_PREFIX__: ``,
  },
}
