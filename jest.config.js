module.exports = {
  preset: 'ts-jest',
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  transformIgnorePatterns: ['./node_modules/'],
  modulePathIgnorePatterns: ['./__tests__/tsd'],
  testRegex: "\\.test\\.ts$"
};
