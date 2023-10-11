/** @type {import('ts-jest').JestConfigWithTsJest} */
module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'node',
    testMatch:['<rootDir>/projects/background/src/app/**/*.spec.ts']
  };